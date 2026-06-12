const XLSX = require("xlsx");
const path = require("path");

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "lot4.xlsx");

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets["Lot4"];

    const data = XLSX.utils.sheet_to_json(sheet);

    // ✅ เปลี่ยนตรงนี้
    const qcField = "QC Status";

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

      if (status.includes("pass") || status.includes("complete")) pass++;
      else if (status.includes("fail")) fail++;
      else if (status.includes("progress")) inprogress++;
      else if (status.includes("block")) blocked++;
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
