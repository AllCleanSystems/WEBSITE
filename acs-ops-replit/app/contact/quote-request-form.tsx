"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  smsConsent: boolean;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  serviceType: "Commercial Cleaning",
  message: "",
  smsConsent: false,
};

export function QuoteRequestForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState("Ready.");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (busy) return;
    setBusy(true);
    setStatus("Submitting request...");
    try {
      const res = await fetch("/api/website/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          sourcePage: "/contact",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.success) {
        setStatus(`Failed: ${json?.error || `Request failed (${res.status})`}`);
        setBusy(false);
        return;
      }
      setForm(initialState);
      setStatus("Success. Your request is in our app and sent to Zoho CRM.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="serviceCard">
      <h3>Request a Quote</h3>
      <p className="muted" style={{ marginTop: 0 }}>
        By submitting a quote request, you agree that All Clean Solutions may contact you about your request by phone or email. SMS text messages are only sent when you check the SMS consent box below.
      </p>
      <div className="row" style={{ flexDirection: "column", gap: 8 }}>
        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <select
          value={form.serviceType}
          onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
        >
          <option>Commercial Cleaning</option>
          <option>Restaurant Hood Cleaning</option>
          <option>Carpet Cleaning</option>
          <option>Pressure Washing</option>
          <option>Snow Removal</option>
          <option>Other</option>
        </select>
        <textarea
          placeholder="Tell us about your request"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={4}
        />

        <label style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <input
            type="checkbox"
            checked={form.smsConsent}
            onChange={(e) => setForm({ ...form, smsConsent: e.target.checked })}
            style={{ marginTop: 3 }}
            required
          />
          <span className="muted" style={{ fontSize: 14, lineHeight: 1.5 }}>
            I agree to receive SMS from All Clean Solutions about quotes, scheduling, service updates, reminders, and support. Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help.
          </span>
        </label>
        <p className="muted" style={{ margin: 0, fontSize: 13 }}>
          We only text customers who contact us, request a quote, book service, or give permission. We do not sell SMS consent or phone numbers.
        </p>

        <button className="btn primary" type="button" disabled={busy} onClick={submit}>
          {busy ? "Submitting..." : "Submit Quote Request"}
        </button>
        <p className="muted" style={{ margin: 0 }}>{status}</p>
      </div>
    </article>
  );
}
