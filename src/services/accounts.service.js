export async function getAccounts(mock) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mock);
    }, 3000);
  });
}

