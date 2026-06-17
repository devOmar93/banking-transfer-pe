import { TRANSFER_FORM_FIELDS } from "./configTransferForm.js";

export const updateField = ({
  field,
  formFieldStates,
  configFormFields,
  context,
}) => {
  const { name, isValid, value, businessValidation } = field;
  if (!formFieldStates[name]) return;

  let newFieldState = {
    ...formFieldStates[name],
    value,
    isValid,
    errorMessage: isValid ? "" : configFormFields[name].errorMessages.default,
  };

  if (!newFieldState.isValid) return newFieldState;

  if (configFormFields[name].businessValidation) {
    newFieldState = businessValidators[name]?.(
      newFieldState,
      configFormFields,
      context,
    );
  }

  return newFieldState;
};

const businessValidators = {
  [TRANSFER_FORM_FIELDS.amount.name]: (
    newFieldState,
    configFormFields,
    context,
  ) => amountBusinessValidation(newFieldState, configFormFields, context),
  [TRANSFER_FORM_FIELDS.destinationAccount.name]: (
    newFieldState,
    configFormFields,
    context,
  ) =>
    destinationAccountBusinessValidation(
      newFieldState,
      configFormFields,
      context,
    ),
};

export const amountBusinessValidation = (
  newFieldState,
  configFormFields,
  context,
) => {
  const amount = newFieldState.value;
  const remainingBalance = context.availableBalance - amount;

  if (amount <= 0) {
    return {
      ...newFieldState,
      isValid: false,
      errorMessage: configFormFields.amount.errorMessages.amountNotAllowed,
    };
  }

  if (remainingBalance < 0) {
    return {
      ...newFieldState,
      isValid: false,
      errorMessage: configFormFields.amount.errorMessages.insufficientBalance,
    };
  }

  return newFieldState;
};

export const destinationAccountBusinessValidation = (
  newFieldState,
  configFormFields,
  context,
) => {
  const isOnlyNumbers = /^[0-9]+$/.test(newFieldState.value);
  if (!isOnlyNumbers) {
    return {
      ...newFieldState,
      isValid: false,
      errorMessage:
        configFormFields.destinationAccount.errorMessages.nonNumericaAccount,
    };
  }

  if (newFieldState.value.length < 14) {
    return {
      ...newFieldState,
      isValid: false,
      errorMessage: configFormFields.destinationAccount.errorMessages.minLength,
    };
  }

  if (newFieldState.value.length > 20) {
    return {
      ...newFieldState,
      isValid: false,
      errorMessage: configFormFields.destinationAccount.errorMessages.maxLength,
    };
  }

  return newFieldState;
};

export const createInitialFormStates = (formFields) =>
  Object.values(formFields).reduce((initialFormStates, { name }) => {
    initialFormStates[name] = {
      value: "",
      isValid: true,
      errorMessage: "",
    };
    return initialFormStates;
  }, {});

export const getFormValues = (formFieldStates) =>
  Object.fromEntries(
    Object.entries(formFieldStates).map(([key, { value }]) => [key, value]),
  );
