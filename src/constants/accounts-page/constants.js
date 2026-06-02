export const ACCOUNTS_PAGE_CONFIG = {
  icon:{
    iconName: "loader",
    size:"l",
    ariaLabel: "loading",
  },
  modal:{
    variant: "page",
  },
  infoCard:{
    iconName: "info",
  }
}

export const STATES = {
  ERROR_TYPES: {
    BLOCKED: 'BLOCKED',
    INACTIVE: 'INACTIVE',
    NO_BALANCE: 'NO_BALANCE',
    NO_ACCOUNTS: 'NO_ACCOUNTS',
    ALL_NO_BALANCE: 'ALL_NO_BALANCE'
  },
  SUCCESS: {
    ACTIVE: 'ACTIVE'
  }
};

export const VALIDATIONS_ERROR = [
  {
    condition: acc => acc.status === STATES.ERROR_TYPES.BLOCKED,
    error: STATES.ERROR_TYPES.BLOCKED
  },
  {
    condition: acc => acc.status === STATES.ERROR_TYPES.INACTIVE,
    error: STATES.ERROR_TYPES.INACTIVE
  },
  {
    condition: acc => acc.amount === 0 || acc.availableBalance === 0,
    error: STATES.ERROR_TYPES.NO_BALANCE
  },
]