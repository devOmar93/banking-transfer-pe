export const createSuccessfulTransferMock = (transferData) => {
  const now = new Date();

  return {
    currency: transferData.sourceAccount.currency,
    amount: transferData.sourceAccount.amount,
    transactionNumber: `TRX-${Math.floor(100000000 + Math.random() * 900000000)}`,
    date: now.toISOString().split("T")[0],
    time: now.toTimeString().split(" ")[0],
    originAccount: transferData.sourceAccount.accountName || "Cuenta Origen",
    originAccountNumber: `**** ${transferData.sourceAccount.accountNumber.slice(-4)}`,
    beneficiaryName: transferData.destinationAccount.firstName || "Beneficiario",
    beneficiaryLastName: transferData.destinationAccount.lastName || "",
    concept: transferData.concept || "Transferencia realizada",
    status: "Completado",
  };
};
