import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/lot4")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <h2>Loading...</h2>;

  const { summary, passPercent } = data;

  const chartData = {
    labels: ["Pass", "Fail", "In Progress", "Blocked"],
    datasets: [
      {
        data: [
          summary.pass,
          summary.fail,
          summary.inprogress,
          summary.blocked
        ],
        backgroundColor: ["#2ecc71", "#e74c3c", "#f39c12", "#7f8c8d"]
      }
    ]
  };

  return (
    <div style={{ fontFamily: "Arial", padding: 30 }}>
      <h1>Lot4 QC Dashboard</h1>

      {/* KPI */}
      <h2>{passPercent}% PASS</h2>

      {/* Progress */}
      <div style={{
        width: "100%",
        height: 30,
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

      {/* Pie Chart */}
      <div style={{ width: 400, marginTop: 30 }}>
        <Pie data={chartData} />
      </div>

      {/* Summary */}
      <div style={{ marginTop: 30 }}>
        <p>Total: {summary.total}</p>
        <p>✅ Pass: {summary.pass}</p>
        <p>❌ Fail: {summary.fail}</p>
        <p>🚧 In Progress: {summary.inprogress}</p>
        <p>⛔ Blocked: {summary.blocked}</p>
      </div>

      {/* Export Button */}
      <button
        onClick={() => window.open("/api/export")}
        style={{
          marginTop: 30,
          padding: "10px 20px",
          fontSize: 16,
          background: "#3498db",
          color: "#fff",
          border: "none",
          borderRadius: 5
        }}
      >
        📤 Export PPT
      </button>

    </div>
  );
}
