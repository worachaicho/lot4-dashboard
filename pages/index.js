const XLSX = require("xlsx");
const path = require("path");

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "lot4.xlsx");

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets["Lot4"];

    if (!sheet) {
      return res.status(500).json({ error: "Sheet Lot4 not found" });
    }

    const data = XLSX.utils.sheet_to_json(sheet);

    const result = {
      total: data.length,
      completed: data.filter(x => x.L4_Status === "Completed").length,
      done: data.filter(x => x.L4_Status === "Done").length,
      inprogress: data.filter(x => x.L4_Status === "Inprogress").length,
      blocked: data.filter(x => x.L4_Status === "Blocked").length
    };

    res.json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
