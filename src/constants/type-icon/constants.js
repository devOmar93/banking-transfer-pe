export const ICON_CONFIG = {
  size: {
    allowed: ["s", "m", "l", "xl"],
    default: "m",
  },

  variant: {
    allowed: ["default", "secondary"],
    default: "default",
  },

  iconName: {
    default: "check-circle",
  },
};

export const ICON_SIZES = ICON_CONFIG.size.allowed;
export const ICON_VARIANTS = ICON_CONFIG.variant.allowed;