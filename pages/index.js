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

  const getColor = () => {
    if (passPercent >= 80) return "green";
    if (passPercent >= 50) return "orange";
    return "red";
  };

  return (
    <div style={{ fontFamily: "Arial", padding: 30 }}>

      <h1>Lot4 QC Dashboard</h1>

      {/* KPI */}
      <h2 style={{ color: getColor() }}>
        {passPercent}% PASS
      </h2>

      {/* Progress Bar */}
      <div style={{
        width: "100%",
        height: 25,
        background: "#eee",
        borderRadius: 10
      }}>
        <div style={{
          width: `${passPercent}%`,
          height: "100%",
          background: getColor(),
          borderRadius: 10
        }}></div>
      </div>

      {/* Cards */}
      <div style={{ marginTop: 30 }}>
        <p>Total: {summary.total}</p>
        <p>✅ Pass: {summary.pass}</p>
        <p>❌ Fail: {summary.fail}</p>
        <p>🚧 In Progress: {summary.inprogress}</p>
        <p>⛔ Blocked: {summary.blocked}</p>
        <p>⚠️ Unknown: {summary.unknown}</p>
      </div>

    </div>
  );
}
``
