import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/lot4")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <h2>Loading...</h2>;

  const { summary, passPercent } = data;

  return (
    <div style={{ fontFamily: "Arial", padding: 30 }}>
      <h1>Lot4 QC Dashboard</h1>

      {/* ✅ KPI */}
      <h2>✅ Pass Rate: {passPercent}%</h2>

      {/* ✅ Progress bar */}
      <div style={{
        width: "100%",
        height: 25,
        background: "#eee",
        borderRadius: 10
      }}>
        <div style={{
          width: `${passPercent}%`,
          height: "100%",
          background: passPercent > 80 ? "green" : passPercent > 50 ? "orange" : "red",
          borderRadius: 10
        }}></div>
      </div>

      {/* ✅ Summary Cards */}
      <div style={{ marginTop: 20 }}>
        <p>Total: {summary.total}</p>
        <p>✅ Pass: {summary.pass}</p>
        <p>❌ Fail: {summary.fail}</p>
        <p>🚧 In Progress: {summary.inprogress}</p>
        <p>⛔ Blocked: {summary.blocked}</p>
      </div>
    </div>
  );
}
