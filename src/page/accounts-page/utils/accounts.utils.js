export const filterPriorityAccounts = (account, activeStatus) => {
  const isActive = account.status === activeStatus;
  const hasBalance = account.availableBalance > 0;
  return (isActive ? 0 : 2) + (hasBalance ? 0 : 1) + 1;
};

export const filterTopAccounts = (accounts, limit, activeStatus) => {
  return [...accounts]
    .sort((a, b) => filterPriorityAccounts(a, activeStatus) - filterPriorityAccounts(b, activeStatus))
    .slice(0, limit);
};

export const getStatusError = (account, activeStatus, errorTypes) => {
  return account.status !== activeStatus
    ? errorTypes[account.status]
    : null;
};

export const getBalanceError = (account, errorTypes) => {
  return account.availableBalance === 0
    ? errorTypes.NO_BALANCE
    : null;
};

export const validateAccount = (account, activeStatus, errorTypes) => {
  return (
    getStatusError(account, activeStatus, errorTypes) ??
    getBalanceError(account, errorTypes)
  );
};

export const processAccounts = (accounts, rules) => {
  const rule = rules.find(r => r.condition(accounts));

  return rule
    ? (typeof rule.result === "function"
        ? rule.result(accounts)
        : rule.result)
    : { accounts };
};
