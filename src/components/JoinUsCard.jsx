import { useState } from "react";
import { Card } from "./ui.jsx";
import Toast from "./Toast.jsx"; // same Toast you already use

export default function JoinUsCard() {
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Basic guard
    if (!data.name || !data.email) {
      setStatus({ state: "error", msg: "Please enter your name and a valid email." });
      return;
    }

    try {
      setStatus({ state: "loading", msg: "Submitting…" });

      // TODO: replace with your deployed Apps Script Web App URL
      const ENDPOINT = "/api/gsheets-join"
      
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          country: data.country || "",
          message: data.message || "",
          consent: data.consent === "on",
          source: "website",
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.status !== "ok") {
        throw new Error(json.error || `Request failed (${res.status})`);
      }

      setStatus({ state: "success", msg: "Thanks! We’ll get back to you shortly." });
      form.reset();
    } catch (err) {
      setStatus({ state: "error", msg: err.message || "Something went wrong." });
    }
  }

  return (
    <>
      <Card className="mt-8 p-6">
        <h5 className="font-semibold text-white">Join Us</h5>
        <p className="mt-1 text-sm text-white/70">
          Have a skill — design, video, web, or more? Join our team and use it for the cause of justice and freedom.
        </p>

        <form
          className="mt-4 grid gap-3 sm:grid-cols-2"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Name */}
          <div className="sm:col-span-1">
            <label htmlFor="ju-name" className="sr-only">Name</label>
            <input
              id="ju-name"
              name="name"
              type="text"
              placeholder="Your name"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/40 focus:outline-none"
              required
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div className="sm:col-span-1">
            <label htmlFor="ju-email" className="sr-only">Email</label>
            <input
              id="ju-email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/40 focus:outline-none"
              required
              autoComplete="email"
            />
          </div>

          {/* Country */}
          <div className="sm:col-span-1">
            <label htmlFor="ju-country" className="sr-only">Country</label>
            <input
              id="ju-country"
              name="country"
              type="text"
              placeholder="Country"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/40 focus:outline-none"
              autoComplete="country-name"
              list="country-list"
            />
            {/* (Optional) datalist for quick picks */}
            <datalist id="country-list">
              <option>United Kingdom</option>
              <option>Pakistan</option>
              <option>India</option>
              <option>United States</option>
              <option>Canada</option>
              <option>U.A.E.</option>
            </datalist>
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <label htmlFor="ju-message" className="sr-only">Message</label>
            <textarea
              id="ju-message"
              name="message"
              rows={4}
              placeholder="Tell us how you can contribute in this campaign…"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>

          {/* Consent */}
          <label className="sm:col-span-2 flex items-start gap-2 text-xs text-white/70">
            <input type="checkbox" name="consent" className="mt-0.5" />
            I agree to be contacted about volunteering for this campaign.
          </label>

          {/* Submit */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              aria-busy={status.state === "loading"}
              disabled={status.state === "loading"}
              className="rounded-xl bg-white px-4 py-2 font-semibold text-black disabled:opacity-60"
            >
              {status.state === "loading" ? "Submitting…" : "Join the Team"}
            </button>
          </div>
        </form>
      </Card>

      {/* Toast */}
      <Toast
        message={status.msg}
        type={
          status.state === "success" ? "success" :
          status.state === "error"   ? "error"   : "info"
        }
        onClose={() => setStatus({ state: "idle", msg: "" })}
      />
    </>
  );
}
