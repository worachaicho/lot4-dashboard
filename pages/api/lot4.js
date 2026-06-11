const XLSX = require("xlsx");
const path = require("path");

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "lot4.xlsx");

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets["Lot4"];

    const data = XLSX.utils.sheet_to_json(sheet);

    // ✅ ใช้ column QC Status (Linux&Win10)
    const qcField = "QC Status (Linux&Win10)";

    const summary = {
      total: data.length,
      pass: data.filter(x => x[qcField] === "Pass").length,
      fail: data.filter(x => x[qcField] === "Fail").length,
      inprogress: data.filter(x => x[qcField] === "Inprogress").length,
      blocked: data.filter(x => x[qcField] === "Blocked").length
    };

    const percent = summary.total > 0
      ? ((summary.pass / summary.total) * 100).toFixed(1)
      : 0;

    res.json({
      summary,
      passPercent: percent
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
