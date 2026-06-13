import XLSX from "xlsx";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "lot4.xlsx");

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets["Lot4"];

    if (!sheet) {
      return res.status(500).json({ error: "Sheet Lot4 not found" });
    }

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

      const status = String(raw).trim();

      if (status === "Done") Done++;
      else if (status === "Completed") Completed++;
      else if (status === "Inprogress") Inprogress++;
      else if (status === "Blocked") Blocked++;
      else if (status === "To Do" || status === "Todo") ToDo++;
      else Unknown++;
    });

    res.status(200).json({
      summary: {
        total,
        Done,
        Completed,
        Inprogress,
        Blocked,
        ToDo,
        Unknown
      },
      pass: Completed + Done
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
