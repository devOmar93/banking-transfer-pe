import jsPDF from "jspdf";

export const generateTransferSummaryPdf = (amount, data) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.setFont(undefined, "bold");
  doc.text("Comprobante de Transferencia", 105, 20, { align: "center" });
  doc.line(15, 25, 195, 25);
  let y = 35;
  doc.setFont(undefined, "bold");
  doc.text(`Monto: ${amount}`, 15, y);
  y += 10;
  doc.setFont(undefined, "normal");
  data.forEach((item) => {
    doc.text(`${item.label}:`, 15, y);
    doc.text(`${item.value}`, 195, y, { align: "right" });
    y += 8;
  });
  y += 5;
  doc.line(15, y, 195, y);
  y += 10;
  doc.setFontSize(10);
  doc.text(
    "Este documento es un comprobante de la operación realizada.",
    105,
    y,
    { align: "center" },
  );
  doc.save("comprobante-transferencia.pdf");
};
