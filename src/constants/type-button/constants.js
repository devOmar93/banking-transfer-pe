export const BUTTON_CONFIG = {
  variant: {
    allowed: ["default", "secondary", "ghost"],
    default: "default",
  },
  iconPosition: {
    allowed: ["left", "right"],
    default: "right",
  },
  type: {
    allowed: ["button", "submit", "reset"],
    default: "button",
  },
  text: {
    default: "Default Text",
  },
  disabled: {
    default: false,
  },
  iconName: {
    default: "",
  },
  ariaLabel: {
    default: "",
  },
};

export const BUTTON_VARIANTS = BUTTON_CONFIG.variant.allowed;
export const BUTTON_ICON_POSITIONS = BUTTON_CONFIG.iconPosition.allowed;
export const BUTTON_TYPES = BUTTON_CONFIG.type.allowed;
