import { useState } from "react";
import { Section, Card, Button } from "../components/ui.jsx";
import campaigns from "../data/campaigns.js";
import Toast from "../components/Toast.jsx";

export default function GetInvolved() {
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value.trim();
    const consent = form.consent.checked;

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({ state: "error", msg: "Please enter a valid email." });
      return;
    }
    if (!consent) {
      setStatus({ state: "error", msg: "Please agree to email updates." });
      return;
    }

    setStatus({ state: "loading", msg: "Subscribing…" });

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setStatus({ state: "success", msg: data.message || "Check your inbox to confirm!" });
      form.reset();
    } catch (err) {
      setStatus({ state: "error", msg: err.message || "Something went wrong." });
    }
  }

  return (
    <Section title="Get Involved" kicker="Action">
      <div className="grid lg:grid-cols-3 gap-6">
        {campaigns.map((c) => (
          <Card key={c.id} className="flex flex-col p-6">
            <div className="text-xs text-white/60">Campaign</div>
            <h4 className="mt-2 text-lg font-semibold text-white">{c.title}</h4>
            <p className="mt-2 flex-1 text-sm text-white/80">{c.desc}</p>
            <div className="mt-4">
              <Button href={c.href}>{c.cta}</Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8 p-6">
        <h5 className="font-semibold text-white">Join the newsletter</h5>
        <p className="mt-1 text-sm text-white/70">Get verified updates, action alerts, and new resources.</p>

        <form className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/40 focus:outline-none"
            required
          />
          <button
            disabled={status.state === "loading"}
            className="rounded-xl bg-white px-4 py-2 font-semibold text-black disabled:opacity-60"
          >
            {status.state === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
          <label className="sm:col-span-2 flex items-start gap-2 text-xs text-white/70">
            <input type="checkbox" name="consent" className="mt-0.5" />
            I agree to receive email updates and understand I can unsubscribe at any time.
          </label>
        </form>
      </Card>

      {/* Toast notification */}
      <Toast
        message={status.msg}
        type={
          status.state === "success"
            ? "success"
            : status.state === "error"
            ? "error"
            : "info"
        }
        onClose={() => setStatus({ state: "idle", msg: "" })}
      />
    </Section>
  );
}
