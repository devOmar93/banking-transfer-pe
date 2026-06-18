export const TYPOGRAPHY_CONFIG = {
  tag: { 
    allowed: ["span", "p", "h1", "h2", "h3", "h4", "h5", "h6"], 
    default: "p" 
  },
  size: { 
    allowed: ["xs", "s", "m", "ml", "sl", "l", "xl"], 
    default: "s" 
  },
  align: { 
    allowed: ["left", "center", "right"], 
    default: "left" 
  },
  weight: { 
    allowed: ["regular", "medium", "semibold", "bold"], 
    default: "regular" 
  }
};

export const validateText = (value, config) => {
  return config.allowed.includes(value) ? value : config.default;
};