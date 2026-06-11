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

    const qcField = "QC Status (Linux&Win10)";

    let total = data.length;
    let pass = 0;
    let fail = 0;
    let inprogress = 0;
    let blocked = 0;
    let unknown = 0;

    data.forEach(row => {
      let raw = row[qcField];

      if (!raw) {
        unknown++;
        return;
      }

