const axios = require("axios");
const XLSX = require("xlsx");

export default async function handler(req, res) {
  try {
    const url =
      "https://cpallgroup.sharepoint.com/_layouts/15/download.aspx?SourceUrl=https://cpallgroup.sharepoint.com/sites/SM_QualityControlandTestingUnit/Shared%20Documents/NSS%20CS%20Lot4%20and%20Insurance.xlsx";

    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const workbook = XLSX.read(response.data, { type: "buffer" });

    const sheetName = "Lot4";
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
      return res.status(500).json({
        error: `Sheet '${sheetName}' not found`,
      });
    }

    const data = XLSX.utils.sheet_to_json(sheet);

    const result = {
      total: data.length,
      completed: data.filter(x => x.L4_Status === "Completed").length,
      done: data.filter(x => x.L4_Status === "Done").length,
      inprogress: data.filter(x => x.L4_Status === "Inprogress").length,
      blocked: data.filter(x => x.L4_Status === "Blocked").length,
    };

    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
