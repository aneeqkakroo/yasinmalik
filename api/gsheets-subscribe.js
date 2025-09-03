export default async function handler(req, res) {
  // Only POST allowed
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    // Handle both parsed and raw bodies
    let body = req.body;
    if (!body || typeof body === "string") {
      try { body = JSON.parse(body || "{}"); } catch { body = {}; }
    }

    const email = (body.email || "").trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ ok: false, error: "Invalid email" });
    }

    const url = process.env.SHEET_WEBAPP_URL;
    if (!url) {
      return res.status(500).json({ ok: false, error: "Missing SHEET_WEBAPP_URL env var" });
    }

    // Forward to your Apps Script web app
    const upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    // Apps Script sometimes returns text or empty body; normalize to JSON
    const text = await upstream.text();
    let json = {};
    try { json = JSON.parse(text); } catch { /* ignore non-JSON */ }

    if (!upstream.ok) {
      // Pass through upstream error detail if any
      return res.status(upstream.status).json({
        ok: false,
        error: json.error || text || "Upstream error",
      });
    }

    // Success — always return JSON
    return res.status(200).json({
      ok: true,
      message: json.message || "Saved",
    });
  } catch (err) {
    console.error("gsheets-subscribe error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}
