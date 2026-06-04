export const MODAL_TYPES = {
  error: {
    iconName: "triangle-alert",
    iconVariant: "secondary",
    primaryButtonText: "Reintentar",
    secondaryButtonText: "Salir",
  },
  information: {
    iconName: "info",
    iconVariant: "secondary",
    primaryButtonText: "Entendido",
    secondaryButtonText: "Salir",
  },
  confirmation: {
    iconName: "check-circle",
    iconVariant: "secondary",
    primaryButtonText: "Confirmar",
    secondaryButtonText: "Cancelar",
  },
};
export const ACTION_MODALS = {
  insufficientBalance: {
    modalType: "error",
    title: "SALDO INSUFICIENTE",
    message:
      "La cuenta no cuenta con saldo suficiente para realizar la operación.",
    showPrimaryButton: false,
    showSecondaryButton: true,
  },
  blockedAccount: {
    modalType: "error",
    title: "CUENTA BLOQUEADA O INACTIVA",
    message:
      "La cuenta se encuentra bloqueada o inactiva y no permite realizar operaciones.",
    showPrimaryButton: false,
    showSecondaryButton: true,
  },
  noAccountsAvailable: {
    modalType: "error",
    title: "NO TIENE CUENTAS DISPONIBLES",
    message:
      "No se encontraron cuentas asociadas para realizar transferencias.",
    showPrimaryButton: false,
    showSecondaryButton: true,
  },
  loadAccountsError: {
    modalType: "error",
    title: "ERROR AL CARGAR CUENTAS",
    message: "Ocurrió un problema al obtener sus cuentas. Intente nuevamente.",
    showPrimaryButton: true,
    showSecondaryButton: true,
  },
  finalError: {
    modalType: "error",
    title: "NO SE PUDO COMPLETAR LA OPERACIÓN",
    message: "Inténtelo más tarde.",
    showPrimaryButton: false,
    showSecondaryButton: true,
  },
  accountsLimitInformation: {
    modalType: "information",
    title: "INFORMACIÓN",
    message:
      "Se mostrarán como máximo 5 cuentas disponibles para realizar la transferencia.",
    showPrimaryButton: true,
    showSecondaryButton: false,
  },
  singleValidAccountInformation: {
    modalType: "information",
    iconName: "circle-check-big",
    title: "CUENTA DISPONIBLE",
    message:
      "Se encontró una cuenta disponible para continuar con la transferencia.",
    showPrimaryButton: true,
    showSecondaryButton: false,
  },
};
