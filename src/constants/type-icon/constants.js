export const ICON_CONFIG = {
  size: {
    allowed: ["xs", "s", "m", "l", "xl"],
    default: "m",
  },

  variant: {
    allowed: ["default", "secondary"],
    default: "default",
  },

  iconName: {
    default: "check-circle",
  },

  ariaLabel: {
    default: null,
  },
};

export const ICON_SIZES = ICON_CONFIG.size.allowed;
export const ICON_VARIANTS = ICON_CONFIG.variant.allowed;
