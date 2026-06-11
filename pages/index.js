import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/lot4")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div style={{ fontFamily: "Arial", padding: 40 }}>
      <h1>Lot4 Dashboard</h1>

      <h2>Total: {data.total}</h2>

      <p>Completed: {data.completed}</p>
      <p>Done: {data.done}</p>
      <p>Inprogress: {data.inprogress}</p>
      <p>Blocked: {data.blocked}</p>
    </div>
  );
}
