export const createSuccessfulTransferMock = (transferData) => {
  const now = new Date();

  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  return {
    currency: transferData.sourceAccount.currency,
    amount: transferData.sourceAccount.amount,
    transactionNumber: `TRX-${Math.floor(100000000 + Math.random() * 900000000)}`,
    date: now.toLocaleDateString('es-ES', options),
    time: now.toTimeString().split(" ")[0],
    originAccount: transferData.sourceAccount.accountName || "Cuenta Origen",
    originAccountNumber: `**** ${transferData.sourceAccount.accountNumber.slice(-4)}`,
    beneficiaryName: transferData.destinationAccount.firstName || "Beneficiario",
    beneficiaryLastName: transferData.destinationAccount.lastName || "",
    status: "Completado",
  };
};
