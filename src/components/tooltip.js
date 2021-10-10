export class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = "툴팁입니다";
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
    <style>
      div {
        background-color: #00f;
        color: #fff;
        position: absolute;
        z-index: 100;
      }
    </style>

    <slot> Some Default </slot>
    <span>툴팁</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
    const tooltipMessage = this.shadowRoot.querySelector("span");
    tooltipMessage.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipMessage.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipMessage);
    this.style.position = "relative";
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("custom-tooltip", Tooltip);
