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
    if (passPercent >= 80) return "#2ecc71"; // green
    if (passPercent >= 50) return "#f39c12"; // orange
    return "#e74c3c"; // red
  };

  return (
    <div style={{ fontFamily: "Arial", padding: 30 }}>
      
      <h1>Lot4 QC Dashboard</h1>

      {/* ✅ KPI ใหญ่ */}
      <div style={{
        fontSize: 40,
        fontWeight: "bold",
        color: getColor()
      }}>
        {passPercent}% PASS
      </div>

      {/* ✅ Progress Bar */}
      <div style={{
        width: "100%",
        height: 30,
        background: "#eee",
        borderRadius: 10,
        marginTop: 10
      }}>
        <div style={{
          width: `${passPercent}%`,
          height: "100%",
          background: getColor(),
          borderRadius: 10
        }}></div>
      </div>

      {/* ✅ KPI Cards */}
      <div style={{
        display: "flex",
        gap: 20,
        marginTop: 30
      }}>
        <Card title="Total" value={summary.total} />
        <Card title="Pass" value={summary.pass} color="#2ecc71" />
        <Card title="Fail" value={summary.fail} color="#e74c3c" />
        <Card title="In Progress" value={summary.inprogress} color="#f39c12" />
        <Card title="Blocked" value={summary.blocked} color="#7f8c8d" />
      </div>

    </div>
  );
}

function Card({ title, value, color = "#3498db" }) {
  return (
    <div style={{
      padding: 20,
      background: "#fff",
      borderRadius: 10,
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      minWidth: 120
    }}>
      <div style={{ color, fontSize: 14 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: "bold" }}>{value}</div>
    </div>
  );
}
