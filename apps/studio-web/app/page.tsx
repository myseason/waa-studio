"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    fetch(`${apiBase}/health`).then(r => r.json()).then(setHealth).catch(e => setHealth({ ok: false, error: String(e) }));
  }, [apiBase]);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>WAA Studio v1 (Scaffold)</h1>
      <p style={{ opacity: 0.8, marginTop: 8 }}>
        Next step: Dashboard → Wizard → Page Studio happy path.
      </p>

      <section style={{ marginTop: 16, padding: 12, border: "1px solid #e5e7eb", borderRadius: 12 }}>
        <div style={{ fontWeight: 600 }}>API Health</div>
        <pre style={{ marginTop: 8, fontSize: 12, overflowX: "auto" }}>{JSON.stringify(health, null, 2)}</pre>
      </section>
    </main>
  );
}
