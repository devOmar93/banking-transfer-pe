export const TYPOGRAPHY_CONFIG = {
  tag: { 
    allowed: ["span", "p", "h1", "h2", "h3"], 
    default: "span" 
  },
  size: { 
    allowed: ["xs", "s", "m", "ml", "l", "xl"], 
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
