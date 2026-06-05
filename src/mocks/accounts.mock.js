
/* Base Case: Multiple accounts with mixed 
statuses (ACTIVE, BLOCKED, INACTIVE) 
and different balances, including a scenario 
exceeding the display limit */
export const ACCOUNTS_BASE_CASE = {
  accounts: [
    {
      id: 1,
      accountNumber: "12341234",
      accountName: "Cuenta Corriente",
      accountType: "Corriente",
      availableBalance: 5250.00,
      currency: "USD",
      status: "ACTIVE"
    },
    {
      id: 2,
      accountNumber: "56785678",
      accountName: "Cuenta de Ahorros",
      accountType: "Ahorros",
      availableBalance: 12800.50,
      currency: "USD",
      status: "BLOCKED"
    },
    {
      id: 3,
      accountNumber: "90129012",
      accountName: "Cuenta Nómina",
      accountType: "Nómina",
      availableBalance: 3420.75,
      currency: "PEN",
      status: "INACTIVE"
    },
    { 
      id: 4, 
      accountNumber: "11112222", 
      accountName: "Cuenta Corriente", 
      accountType: "Corriente", 
      availableBalance: 4000, 
      currency: "USD", 
      status: "ACTIVE" 
    },
    { 
      id: 5, 
      accountNumber: "33334444", 
      accountName: "Cuenta de Ahorros", 
      accountType: "Ahorros", 
      availableBalance: 5000, 
      currency: "USD", 
      status: "INACTIVE" 
    },
    { 
      id: 6, 
      accountNumber: "55556666", 
      accountName: "Cuenta Corriente", 
      accountType: "Corriente", 
      availableBalance: 0, 
      currency: "USD", 
      status: "ACTIVE" 
    },
    { 
      id: 7, 
      accountNumber: "55556666", 
      accountName: "Cuenta Corriente", 
      accountType: "Corriente", 
      availableBalance: 6000, 
      currency: "USD", 
      status: "BLOCKED" 
    }
  ]
};

/* Case 1: Single account with no available balance (balance = 0) */
export const ACCOUNTS_CASE_1 = {
  accounts: [
    {
      id: 1,
      accountNumber: "12341234",
      accountName: "Cuenta Corriente",
      accountType: "Corriente",
      availableBalance: 0,
      currency: "USD",
      status: "ACTIVE"
    }
  ]
};

/* Case 2: Single account with sufficient available balance */
export const ACCOUNTS_CASE_2 = {
  accounts: [
    {
      id: 1,
      accountNumber: "12341234",
      accountName: "Cuenta Corriente",
      accountType: "Corriente",
      availableBalance: 5250.00,
      currency: "USD",
      status: "ACTIVE"
    }
  ]
};

/* Case 3: Single account that is blocked */
export const ACCOUNTS_CASE_3 = {
  accounts: [
    {
      id: 1,
      accountNumber: "12341234",
      accountName: "Cuenta Corriente",
      accountType: "Corriente",
      availableBalance: 5250.00,
      currency: "USD",
      status: "BLOCKED"
    }
  ]
};

/* Case 4: No accounts available for the user */
export const ACCOUNTS_CASE_4 = {
  accounts: []
};

/* Case 5: Multiple accounts where all have zero 
available balance (no valid account to operate)*/
export const ACCOUNTS_CASE_5 = {
  accounts: [
    {
      id: 1,
      accountNumber: "12341234",
      accountName: "Cuenta Corriente",
      accountType: "Corriente",
      availableBalance: 0,
      currency: "USD",
      status: "ACTIVE"
    },
    {
      id: 2,
      accountNumber: "56785678",
      accountName: "Cuenta Ahorros",
      accountType: "Ahorros",
      availableBalance: 0,
      currency: "USD",
      status: "ACTIVE"
    }
  ]
};

/* Case 6: Single account that is inactive */
export const ACCOUNTS_CASE_6 = {
  accounts: [
    {
      id: 1,
      accountNumber: "12341234",
      accountName: "Cuenta Corriente",
      accountType: "Corriente",
      availableBalance: 5250.00,
      currency: "USD",
      status: "INACTIVE"
    }
  ]
};

