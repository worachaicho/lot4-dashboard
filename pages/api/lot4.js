import XLSX from "xlsx";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "lot4.xlsx");

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets["Lot4"];

    const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const qcField = "QCStatus";

    let total = 0;
    let Done = 0;
    let Completed = 0;
    let Inprogress = 0;
    let Blocked = 0;
    let ToDo = 0;
    let Unknown = 0;

    data.forEach((row) => {
      total++;

      const raw = row[qcField];

      if (!raw) {
        Unknown++;
        return;
      }

      // ✅ FIX CORE IMPORTANT
      const status = String(raw).trim().toLowerCase();

      if (status === "done") Done++;
      else if (status === "completed") Completed++;
      else if (status === "inprogress") Inprogress++;
      else if (status === "blocked") Blocked++;
      else if (status === "to do" || status === "todo") ToDo++;
      else Unknown++;
    });

    const pass = Done + Completed;

    res.status(200).json({
      summary: {
        total,
        Done,
        Completed,
        Inprogress,
        Blocked,
        ToDo,
        Unknown,
      },
      pass,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
