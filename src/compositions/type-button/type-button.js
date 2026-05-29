import { html, LitElement, nothing } from "lit";
import styles from "./type-button.css";
import "../../components/type-text/type-text.js";
import "../../components/type-icon/type-icon.js";
import {
  BUTTON_CONFIG,
  BUTTON_ICON_POSITIONS,
  BUTTON_TYPES,
  BUTTON_VARIANTS,
} from "../../constants/type-button/constants.js";
import { ifDefined } from "lit/directives/if-defined.js";

export class TypeButton extends LitElement {
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
     * Allowed values: default, secondary, ghost.
     * @type {String}
     * @default "default"
     */
    variant: { type: String },

    /**
     * Native button type attribute.
     * Allowed values: button, submit, reset.
     * @type {String}
     * @default "button"
     */
    type: { type: String },

    /**
     * Position of the icon relative to the text.
     * Allowed values: left, right.
     * @type {String}
     * @default "left"
     */
    iconPosition: { type: String, attribute: "icon-position" },

    /**
     * Whether the button is disabled.
     * @type {Boolean}
     * @default false
     */
    disabled: { type: Boolean },

    /**
     * Accessible label for screen readers.
     * Required when the button has no visible text.
     * @type {String}
     */
    ariaLabel: { type: String, attribute: "aria-label" },
  };

  constructor() {
    super();
    this.iconName = BUTTON_CONFIG.iconName.default;
    this.text = BUTTON_CONFIG.text.default;
    this.variant = BUTTON_CONFIG.variant.default;
    this.type = BUTTON_CONFIG.type.default;
    this.iconPosition = BUTTON_CONFIG.iconPosition.default;
    this.disabled = BUTTON_CONFIG.disabled.default;
    this.ariaLabel = BUTTON_CONFIG.ariaLabel.default;
  }

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
      ? html`<type-text text=${this.text} tag="p"></type-text>`
      : nothing;

    return this.iconPosition === "right"
      ? html`${text}${icon}`
      : html`${icon}${text}`;
  }

  _validateProp(changedProps, propName, allowedValues, defaultValue) {
    if (changedProps.has(propName) && !allowedValues.includes(this[propName])) {
      this[propName] = defaultValue;
    }
  }

  willUpdate(changedProps) {
    this._validateProp(
      changedProps,
      "variant",
      BUTTON_VARIANTS,
      BUTTON_CONFIG.variant.default,
    );

    this._validateProp(
      changedProps,
      "iconPosition",
      BUTTON_ICON_POSITIONS,
      BUTTON_CONFIG.iconPosition.default,
    );

    this._validateProp(
      changedProps,
      "type",
      BUTTON_TYPES,
      BUTTON_CONFIG.type.default,
    );
  }

  get accessibleLabel() {
    if (this.text?.trim()) return undefined;
    return this.ariaLabel || this.iconName || "button";
  }

  static styles = styles;

  render() {
    return html`
      <button
        type=${this.type}
        class="btn btn-${this.variant}"
        ?disabled=${this.disabled}
        aria-label=${ifDefined(this.accessibleLabel)}
      >
        ${this._renderContent()}
      </button>
    `;
  }
}

customElements.define("type-button", TypeButton);
