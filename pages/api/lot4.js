const XLSX = require("xlsx");
const path = require("path");

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "lot4.xlsx");

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets["Lot4"];

    if (!sheet) {
      return res.status(500).json({ error: "Sheet 'Lot4' not found" });
    }

    // ✅ VERY IMPORTANT: กันค่า undefined
    const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const qcField = "QCStatus";

    let total = 0;
    let pass = 0;
    let fail = 0;
    let inprogress = 0;
    let blocked = 0;
    let todo = 0;
    let unknown = 0;

    data.forEach((row) => {
      total++;

      const raw = row[qcField];

      if (!raw) {
        unknown++;
        return;
      }

      const status = String(raw).trim().toLowerCase();

      if (status.includes("completed") || status.includes("done")) {
        pass++;
      } else if (status.includes("fail")) {
        fail++;
      } else if (status.includes("progress")) {
        inprogress++;
      } else if (status.includes("block")) {
        blocked++;
      } else if (status.includes("to do") || status.includes("todo")) {
        todo++;
      } else {
        unknown++;
      }
    });

    const passPercent =
      total > 0 ? ((pass / total) * 100).toFixed(1) : "0.0";

    res.status(200).json({
      summary: {
        total,
        pass,
        fail,
        inprogress,
        blocked,
        todo,
        unknown,
      },
      passPercent,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
