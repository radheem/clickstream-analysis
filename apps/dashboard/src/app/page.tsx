import { SITE_IDS } from "@clickstream/schema";

export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: "4rem auto", padding: "0 1rem" }}>
      <h1>Clickstream Analytics</h1>
      <p>Dashboard scaffold. Wiring queries against ClickHouse comes in the build-out phases.</p>
      <h2>Tracked properties</h2>
      <ul>
        {SITE_IDS.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
      <p style={{ color: "#666" }}>See docs/architecture.md for the full design.</p>
    </main>
  );
}
