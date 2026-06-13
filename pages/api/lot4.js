const XLSX = require("xlsx");
const path = require("path");

export default function handler(req, res) {
  try {
    // ✅ path ของไฟล์
    const filePath = path.join(process.cwd(), "data", "lot4.xlsx");

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets["Lot4"];

    if (!sheet) {
      return res.status(500).json({ error: "Sheet 'Lot4' not found" });
    }

    const data = XLSX.utils.sheet_to_json(sheet);

    // ✅ ใช้ column BU ตาม requirement
    const qcField = "QCStatus";

    // ✅ initialize counters
    let total = data.length;
    let pass = 0;
    let fail = 0;
    let inprogress = 0;
    let blocked = 0;
    let todo = 0;
    let unknown = 0;

    data.forEach(row => {
      const raw = row[qcField];

      if (!raw) {
        unknown++;
        return;
      }

      // ✅ normalize กัน case / space / format เพี้ยน
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

