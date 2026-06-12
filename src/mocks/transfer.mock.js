export const createSuccessfulTransferMock = (transferData) => {
  const now = new Date();

  return {
    current: transferData.sourceAccount.current,
    amount: transferData.amount,
    transactionNumber: `TRX-${Math.floor(100000000 + Math.random() * 900000000)}`,
    date: now.toISOString().split("T")[0],
    time: now.toTimeString().split(" ")[0],
    originAccount: transferData.sourceAccount.accountName || "Cuenta Origen",
    originAccountNumber: `**** ${transferData.sourceAccount.accountNumber.slice(-4)}`,
    beneficiaryName: transferData.beneficiary.name || "Beneficiario",
    beneficiaryLastName: transferData.beneficiary.lastName || "",
    concept: transferData.concept || "Transferencia realizada",
    status: "Completado",
  };
};
