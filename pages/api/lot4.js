const XLSX = require("xlsx");
const path = require("path");

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "lot4.xlsx");

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets["Lot4"];

    const data = XLSX.utils.sheet_to_json(sheet);

    // ✅ เปลี่ยนตรงนี้
    const qcField = "QCStatus";

    let total = data.length;
    let pass = 0;
    let fail = 0;
    let inprogress = 0;
    let blocked = 0;
    let unknown = 0;

    data.forEach(row => {
      const raw = row[qcField];

      if (!raw) {
        unknown++;
        return;
      }

      const status = String(raw).trim().toLowerCase();

      if (status.includes("Completed") || status.includes("Completed")) Completed++;
      else if (status.includes("Done")) Done++;
      else if (status.includes("Inprogress")) Inprogress++;
      else if (status.includes("Blocked")) Blocked++;
      else if (status.includes("To Do")) To Do++;
      else unknown++;
    });

    const passPercent =
      total > 0 ? ((pass / total) * 100).toFixed(1) : 0;

    res.json({
      summary: { total, pass, fail, inprogress, blocked, unknown },
      passPercent
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
