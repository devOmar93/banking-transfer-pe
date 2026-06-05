export const SuccessfulTransferMock = () => {
  return {
    amount: "$1,234.00",
    details: [
      { label: "Número de transacción", value: "TRF177932287994" },
      { label: "Fecha", value: "20 de mayo de 2026" },
      { label: "Hora", value: "07:38 p.m." },
      { label: "Cuenta origen", value: "Cuenta de Ahorros ****5678" },
      { label: "Beneficiario", value: "Juan Pérez" },
      { label: "Concepto", value: "Pago servicios" },
      { label: "Estado", value: "Completada" },
    ],
    message:
      "Guarde este comprobante para sus registros. El dinero será reflejado en la cuenta del beneficiario en un plazo de 24 horas.",
  };
};
