import jsPDF from "jspdf";

const buildPdfDocument = (amount, data) => {
  const doc = new jsPDF();

  doc.setFontSize(16).setFont(undefined, "bold");
  doc.text("Comprobante de Transferencia", 105, 20, { align: "center" });
  doc.line(15, 25, 195, 25);

  let y = 35;
  doc.text(`Monto: ${amount}`, 15, y);

  doc.setFont(undefined, "normal");
  data.forEach(({ label, value }) => {
    y += 10;
    doc.text(`${label || ""}:`, 15, y);
    doc.text(`${value || ""}`, 195, y, { align: "right" });
  });

  y += 15;
  doc.line(15, y, 195, y);
  doc
    .setFontSize(10)
    .text(
      "Este documento es un comprobante de la operación realizada.",
      105,
      y + 10,
      { align: "center" },
    );

  doc.save("comprobante-transferencia.pdf");
};

export const generateTransferSummaryPdf = (amount, data) => {
  if (!Array.isArray(data)) {
    throw new TypeError("El parámetro 'data' debe ser un array.");
  }

  if (!amount) {
    throw new Error("El parámetro 'amount' es requerido.");
  }

  buildPdfDocument(amount, data);
};
