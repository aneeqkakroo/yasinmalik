// api/gsheets-join.js
export default async function handler(req, res) {
  const ORIGIN = req.headers.origin || "*";
  res.setHeader("Access-Control-Allow-Origin", ORIGIN);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ status: "error", error: "Method not allowed" });

  try {
    const GAS_ENDPOINT = process.env.GAS_JOIN_ENDPOINT; // <-- set this in Vercel env
    if (!GAS_ENDPOINT) return res.status(500).json({ status: "error", error: "Missing GAS_JOIN_ENDPOINT" });

    // accept both JSON body and stringified
    const body = typeof req.body === "object" ? req.body : JSON.parse(req.body || "{}");

    const forward = await fetch(GAS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // your GAS can also accept urlencoded if you prefer
      body: JSON.stringify(body),
    });

    const text = await forward.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { status: forward.ok ? "ok" : "error", raw: text }; }

    return res.status(forward.ok ? 200 : forward.status).json(data);
  } catch (err) {
    return res.status(500).json({ status: "error", error: String(err) });
  }
}
