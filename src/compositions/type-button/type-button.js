import { html, LitElement, nothing } from "lit";
import { createRef, ref } from "lit/directives/ref.js";
import styles from "./type-button.css";
import "@/components/type-text/type-text.js";
import "@/components/type-icon/type-icon.js";
import { ifDefined } from "lit/directives/if-defined.js";
import {
  validateAllowedProp,
  validateRequiredProp,
} from "@/utils/utils.js";

const ALLOWED_VARIANTS = ["default", "secondary", "ghost"];
const ALLOWED_POSITIONS = ["left", "right"];
const ALLOWED_TYPES = ["button", "submit", "reset"];

export class TypeButton extends LitElement {
  buttonRef = createRef();
  
  static properties = {
    /**
     * Icon name to display inside the button.
     * If not provided, no icon is rendered.
     * @type {String}
     */
    iconName: { type: String, attribute: "icon-name" },

    /**
     * Button text content.
     * When provided, it becomes the accessible label.
     * @type {String}
     */
    text: { type: String },

    /**
     * Button visual variant.
     * @type {String}
     * @default ""
     */
    variant: { type: String, reflect: true },

    /**
     * Native button type attribute.
     * @type {String}
     * @default ""
     */
    type: { type: String },

    /**
     * Position of the icon relative to the text.
     * @type {String}
     * @default ""
     */
    iconPosition: { type: String, attribute: "icon-position", reflect: true },

    /**
     * Accessible label for screen readers.
     * Required when the button has no visible text.
     * @type {String}
     */
    ariaLabel: { type: String, attribute: "aria-label" },

    /**
     * Whether the button is disabled.
     * @type {Boolean}
     * @default false
     */
    disabled: { type: Boolean },
  };

  constructor() {
    super();
    this.iconName = "";
    this.text = "";
    this.variant = "";
    this.type = "";
    this.iconPosition = "";
    this.ariaLabel = "";
    this.disabled = false;
  }

  willUpdate(changedProperties) {
    if (changedProperties.has("text")) {
      validateRequiredProp("text", this.text);
    }
    if (changedProperties.has("variant")) {
      validateAllowedProp("variant", this.variant, ALLOWED_VARIANTS);
    }
    if (changedProperties.has("type")) {
      validateAllowedProp("type", this.type, ALLOWED_TYPES);
    }
    if (changedProperties.has("iconPosition")) {
      validateAllowedProp("iconPosition", this.iconPosition, ALLOWED_POSITIONS);
    }
  }

  static styles = styles;

  _renderContent() {
    const hasIcon = Boolean(this.iconName);
    const hasText = Boolean(this.text?.trim());

    const icon = hasIcon
      ? html`
          <type-icon
            icon-name=${this.iconName}
            size="m"
            variant="secondary"
          ></type-icon>
        `
      : nothing;

    const text = hasText
      ? html`<type-text
          text=${this.text}
          tag="p"
          .weight=${"medium"}
        ></type-text>`
      : nothing;

    return html`${text}${icon}`;
  }

  focus() {
    this.buttonRef.value?.focus();
  }

  render() {
    return html`
      <button
        ${ref(this.buttonRef)}
        type=${this.type}
        class="btn"
        ?disabled=${this.disabled}
        aria-label=${ifDefined(this.ariaLabel || undefined)}
      >
        ${this._renderContent()}
      </button>
    `;
  }
}

customElements.define("type-button", TypeButton);
