const axios = require("axios");
const XLSX = require("xlsx");

export default async function handler(req, res) {
  try {
    const url =
      "https://cpallgroup.sharepoint.com/sites/SM_QualityControlandTestingUnit/_layouts/15/download.aspx?SourceUrl=https://cpallgroup.sharepoint.com/sites/SM_QualityControlandTestingUnit/Shared%20Documents/NSS%20CS%20Lot4%20and%20Insurance.xlsx";

    const file = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const wb = XLSX.read(file.data, { type: "buffer" });
    const sheet = wb.Sheets["Lot4"];

    if (!sheet) {
      return res.json({ error: "Sheet Lot4 not found" });
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
