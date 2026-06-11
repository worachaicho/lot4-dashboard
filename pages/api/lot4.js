const axios = require("axios");
const XLSX = require("xlsx");

export default async function handler(req, res) {
  try {
    res.status(200).json({ message: "API OK v2" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
