const PPTX = require("pptxgenjs");

export default async function handler(req, res) {
  const pptx = new PPTX();

  const slide = pptx.addSlide();

  slide.addText("Lot4 QC Dashboard", {
    x: 1,
    y: 1,
    fontSize: 28,
    bold: true
  });

  slide.addText("Real-time Status Summary", {
    x: 1,
    y: 2,
    fontSize: 18
  });

  const file = await pptx.write("nodebuffer");

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=Lot4_Dashboard.pptx"
  );

  res.send(file);
}
