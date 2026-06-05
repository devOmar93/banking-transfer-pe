export const getAccountApi = (accountNumber) => {
  return new Promise((resolve, reject) => {
    const operationSuccessful = true;
    setTimeout(() => {
      if (operationSuccessful) {
        resolve({
          success: true,
          data: {
            accountNumber: "1234567890",
            accountHolderName: "JUAN PEREZ LOPEZ",
            currency: "PEN",
            isActive: true,
          },
        });
        return;
      }
      reject({
        success: false,
        error: {
          code: "ACCOUNT_NOT_FOUND",
          message: "El número de cuenta no existe",
          description: "Lo sentimos. El número de cuenta a transferir no existe, por favor ingrese una cuenta existente."
        },
      });
      return;
    }, 2500);
  });
};
