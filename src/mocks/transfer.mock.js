import { getCurrencySymbol } from "@/utils/format";

export const createSuccessfulTransferMock = (transferData) => {
  const now = new Date();

  const dateOptions = { day: "numeric", month: "long", year: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

  const { sourceAccount, destinationAccount } = transferData;

  return {
    transactionNumber: `TRF${Math.floor(100000000 + Math.random() * 900000000)}`,
    amount: sourceAccount.amount,
    currency: getCurrencySymbol(sourceAccount.currency),
    date: now.toLocaleDateString("es-ES", dateOptions),
    time: now.toLocaleTimeString("en-US", timeOptions).toLowerCase(),
    status: "Completada",
    originAccount: sourceAccount.accountName || "Cuenta Origen",
    originAccountNumber: `**** ${sourceAccount.accountNumber.slice(-4)}`,
    beneficiaryName: destinationAccount.firstName || "Beneficiario",
    beneficiaryLastName: destinationAccount.lastName || "",
  };
};
