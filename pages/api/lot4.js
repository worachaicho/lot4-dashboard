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

    // ✅ VERY IMPORTANT: กัน undefined
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

