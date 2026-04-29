"use client";

import { useState } from "react";
import { SiteShell } from "./site-shell";

type ChatMsg = { role: "user" | "assistant"; text: string };

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      text: "Hi! I'm the All Clean Solutions AI assistant. How can I help with your cleaning request today?",
    },
  ]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user" as const, text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const transcript = next.map((m) => `${m.role === "assistant" ? "ACS AI" : "You"}: ${m.text}`).join("\n");
      const res = await fetch("/.netlify/functions/website-chat-handoff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          chatSessionId: `web_${Date.now()}`,
          knownIntake: {},
          intakeAlreadySubmitted: false,
          chatTranscript: transcript,
        }),
      });
      const data = await res.json().catch(() => ({}));
      const reply = !res.ok || !data?.ok ? (data?.error || "AI is temporarily unavailable.") : (data.reply || "Thanks. How else can I help?");
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "I'm having trouble connecting right now. Please call (701) 587-1158 and we can help immediately.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteShell>
      <main style={{ minHeight: "100vh", background: "#0b1f3a", color: "#fff" }}>
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 20px" }}>
        <h1 style={{ fontSize: 44, marginBottom: 16 }}>All Clean Solutions</h1>
        <p style={{ fontSize: 20, maxWidth: 700, opacity: 0.92, lineHeight: 1.5 }}>
          Commercial and residential cleaning services in Bismarck and surrounding areas. Fast quotes, reliable service, and 24/7 emergency response.
        </p>
        <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="tel:7015871158" style={{ background: "#e8387a", color: "#fff", padding: "12px 18px", borderRadius: 8, textDecoration: "none", fontWeight: 700 }}>
            Call (701) 587-1158
          </a>
          <button onClick={() => setOpen(true)} style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.45)", padding: "12px 18px", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>
            Open AI Assistant
          </button>
        </div>
        </section>

        <section style={{ background: "#f8fafc", color: "#0f172a", padding: "48px 20px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {[
              "Hood & Exhaust Cleaning",
              "Commercial Cleaning",
              "Pressure Washing",
              "Carpet & Window Cleaning",
              "Snow Removal",
              "Lawn Care",
            ].map((service) => (
              <article key={service} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: 16 }}>
                <h3 style={{ margin: 0, fontSize: 18 }}>{service}</h3>
                <p style={{ margin: "8px 0 0", color: "#475569" }}>
                  Reliable, professional service with fast communication and clear scheduling.
                </p>
              </article>
            ))}
          </div>
        </section>

        {open && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "grid", placeItems: "center", zIndex: 60 }}>
          <div style={{ width: "min(680px, 95vw)", background: "#fff", color: "#111827", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "#0b1f3a", color: "#fff" }}>
              <strong>AI Assistant</strong>
              <button onClick={() => setOpen(false)} style={{ background: "transparent", color: "#fff", border: 0, fontSize: 20, cursor: "pointer" }}>x</button>
            </div>
            <div style={{ maxHeight: 360, overflowY: "auto", padding: 14, background: "#f8fafc" }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }}>
                  <div style={{ maxWidth: "78%", background: m.role === "user" ? "#e8387a" : "#fff", color: m.role === "user" ? "#fff" : "#111827", border: m.role === "user" ? "none" : "1px solid #e2e8f0", padding: "10px 12px", borderRadius: 10, lineHeight: 1.45 }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && <div style={{ fontSize: 13, opacity: 0.8 }}>AI is typing...</div>}
            </div>
            <div style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid #e2e8f0" }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask about services, pricing, or scheduling"
                style={{ flex: 1, border: "1px solid #cbd5e1", borderRadius: 8, padding: "10px 12px" }}
              />
              <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ background: "#e8387a", color: "#fff", border: 0, borderRadius: 8, padding: "10px 14px", cursor: "pointer", fontWeight: 700 }}>
                Send
              </button>
            </div>
          </div>
        </div>
        )}
      </main>
    </SiteShell>
  );
}
