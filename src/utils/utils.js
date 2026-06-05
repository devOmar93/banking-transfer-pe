export function validateAllowedProp(property, value, alloweds) {
  if (!alloweds.includes(value)) {
    fireError(
      `[Validate Error]: El atributo '${property}="${value}"' no es válido. `,
      `Valores permitidos: ${alloweds.join(", ")}`,
    );
  }
}

export function validateRequiredProp(property, value) {
  if (value === undefined || value === null || String(value).trim() === "") {
    fireError(
      `[Validate Error]: El atributo '${property}' es obligatorio y no puede estar vacío.`,
    );
  }
}

export function fireError(title, message = "") {
  throw new Error(title + message);
}

export function fireEvent(
  element,
  event,
  detail,
  bubbles = true,
  composed = true,
) {
  element.dispatchEvent(
    new CustomEvent(event, {
      detail: detail,
      bubbles: bubbles,
      composed: composed,
    }),
  );
}
