export const CURRENCY_SYMBOLS = {
  USD: "$",
  PEN: "S/",
};
 
export function getCurrencySymbol(currency) {
  if (!currency) return "";
  return CURRENCY_SYMBOLS[currency] ?? currency;
}
 
export function formatAmount(amount, currency) {
  if (amount === null || amount === undefined || amount === "") return "";
  const number = Number(amount);
  if (Number.isNaN(number)) return "";
 
  const symbol = getCurrencySymbol(currency);
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
  return `${symbol}${formatted}`;
}
 
export function maskAccountNumber(accountNumber) {
  if (!accountNumber) return "";
  const value = String(accountNumber);
  if (value.length <= 4) return value;
  return `****${value.slice(-4)}`;
}

export function getAccessibleAmount(amount, currency) {
  const names = {
    PEN: "soles",
    USD: "dólares",  
    "S/": "soles",
    "$": "dólares",
  };
  
  const currencyName = names[currency] || "";
  return `${amount} ${currencyName}`.trim();
}

export function getLastFourDigits(accountNumber) {
  if (!accountNumber) return "";
  return String(accountNumber).slice(-4);
}

