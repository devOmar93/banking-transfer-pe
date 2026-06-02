export async function getAccounts(mock) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mock);
    }, 3000);
  });
}

export async function getAccountsError() {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Error técnico')), 3000);
  });
}

