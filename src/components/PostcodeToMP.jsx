import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";

function normConstituency(s = "") {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}
function normalizePostcode(input = "") {
  const pc = input.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (pc.length < 5) return input.toUpperCase().trim();
  return `${pc.slice(0, pc.length - 3)} ${pc.slice(pc.length - 3)}`.trim();
}
function looksLikeUKPostcode(input = "") {
  const s = input.trim().toUpperCase();
  return /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/.test(s.replace(/\s+/, ""));
}

// --- Prefilled email template (edit text here if you want) ---
const SUBJECT_TEMPLATE = "Constituent enquiry — {{CONSTITUENCY}}";
const BODY_TEMPLATE = `Dear {{MP_NAME}},

I am a constituent in {{CONSTITUENCY}} (postcode: {{POSTCODE}}). I would like to raise the following concern:

[Write your concern here.]

I would appreciate your response and any action you can take.

Kind regards,
[Your name]
[Your full postcode]`;

function fillTemplate(str, vars) {
  return str
    .replaceAll("{{MP_NAME}}", vars.MP_NAME || "")
    .replaceAll("{{CONSTITUENCY}}", vars.CONSTITUENCY || "")
    .replaceAll("{{POSTCODE}}", vars.POSTCODE || "");
}
function buildMailto(email, subject, body) {
  // Use CRLF for best compatibility with email clients
  const bodyCrLf = body.replace(/\r?\n/g, "\r\n");
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyCrLf)}`;
}

export default function PostcodeToMP() {
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [csvError, setCsvError] = useState("");
  const [apiError, setApiError] = useState("");
  const [constituency, setConstituency] = useState("");
  const [mp, setMp] = useState(null);
  const [mpIndex, setMpIndex] = useState({});
  const [mailtoHref, setMailtoHref] = useState("#");

  // Load CSV once
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setCsvError("");
        const res = await fetch("/data/mps.csv", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch mps.csv (HTTP ${res.status})`);
        const text = await res.text();
        const { data } = Papa.parse(text, { header: true, skipEmptyLines: true });
        const rows = (data || []).filter(r => r.Constituency && r.Name);
        const index = {};
        rows.forEach(r => { index[normConstituency(r.Constituency)] = r; });
        if (!cancelled) setMpIndex(index);
      } catch (e) {
        if (!cancelled) setCsvError(e.message || "Failed to load MPs CSV.");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const canSearch = useMemo(() => postcode.trim().length >= 5, [postcode]);

  async function handleLookup(e) {
    e?.preventDefault();
    setApiError("");
    setMp(null);
    setConstituency("");
    setMailtoHref("#");

    const pc = normalizePostcode(postcode);
    if (!looksLikeUKPostcode(pc)) {
      setApiError("Please enter a valid UK postcode (e.g., CB1 3LS).");
      return;
    }

    setLoading(true);
    try {
      const url = `https://api.postcodes.io/postcodes/${encodeURIComponent(pc)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.status !== 200 || data.status !== 200 || !data.result) {
        throw new Error(data?.error || "Postcode not found. Please check and try again.");
      }

      const c24 = data.result.parliamentary_constituency_2024
        || data.result.parliamentary_constituency;
      if (!c24) throw new Error("Could not determine parliamentary constituency for this postcode.");

      setConstituency(c24);

      const row = mpIndex[normConstituency(c24)];
      if (!row) {
        setApiError(`Constituency found: "${c24}", but no matching entry was found in your CSV.`);
      } else {
        setMp(row);

        // Build mailto link immediately (no template UI shown)
        const subject = fillTemplate(SUBJECT_TEMPLATE, {
          MP_NAME: row.Name,
          CONSTITUENCY: c24,
          POSTCODE: pc,
        });
        const body = fillTemplate(BODY_TEMPLATE, {
          MP_NAME: row.Name,
          CONSTITUENCY: c24,
          POSTCODE: pc,
        });
        setMailtoHref(buildMailto(row.Email, subject, body));
      }
    } catch (err) {
      setApiError(err.message || "Lookup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="rounded-2xl border border-gray-200 shadow-sm p-4 bg-black">
        <h2 className="text-xl font-semibold mb-3">Find your MP by Postcode</h2>

        <form onSubmit={handleLookup} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Enter UK postcode (e.g., CB1 3LS)"
            className="flex-1 rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            onBlur={() => setPostcode((p) => normalizePostcode(p))}
          />
          <button
            type="submit"
            disabled={!canSearch || loading}
            className="rounded-xl px-4 py-2 bg-black text-white disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {csvError && <div className="mt-3 text-sm text-red-600">CSV error: {csvError}</div>}
        {apiError && <div className="mt-3 text-sm text-red-600">{apiError}</div>}

        {constituency && (
          <div className="mt-4 text-sm text-gray-700">
            Constituency: <span className="font-medium">{constituency}</span>
          </div>
        )}

        {mp && (
          <div className="mt-4 p-4 rounded-xl border border-gray-200 bg-black-50">
            <div className="text-lg font-semibold mb-1">{mp.Name}</div>
            {mp.Party && <div className="text-sm text-gray-600 mb-3">{mp.Party}</div>}

            <div className="text-sm">
              <span className="font-medium">Email: </span>
              <a
                href={mailtoHref}
                className="underline break-all"
                title="Click to open your email app with a prefilled message"
              >
                {mp.Email}
              </a>
            </div>
          </div>
        )}

        <div className="mt-4 text-xs text-gray-500">
          Click the email to open your mail app with subject & body prefilled.
        </div>
      </div>
    </div>
  );
}
