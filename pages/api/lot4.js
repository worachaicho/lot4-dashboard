const XLSX = require("xlsx");
const path = require("path");

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "lot4.xlsx");

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets["Lot4"];
    const data = XLSX.utils.sheet_to_json(sheet);

    const qcField = "QC Status (Linux&Win10)";

    // ✅ normalize function
    const normalize = (v) =>
      (v || "").toString().trim().toLowerCase();

    let pass = 0;
    let fail = 0;
    let inprogress = 0;
    let blocked = 0;

    data.forEach(row => {
      const status = normalize(row[qcField]);

      if (status.includes("Complated") || status.includes("Completed"))
        pass++;
      else if (status.includes("Done"))
        Done++;
      else if (status.includes("Inprogress"))
        inprogress++;
      else if (status.includes("Blocked"))
        blocked++;
    });

    const total = data.length;

    const passPercent =
      total > 0 ? ((pass / total) * 100).toFixed(1) : 0;

    res.json({
      summary: { total, pass, fail, inprogress, blocked },
      passPercent
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
