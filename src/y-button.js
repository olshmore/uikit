class ZeroButton extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'loading', 'disabled', 'variant', 'size'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        button {
          all: unset;
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5em;
          padding: 0.5em 1em;
          font-weight: 600;
          border: 2px solid transparent;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        button.primary {
          background: #074033;
          color: white;
        }
        button.primary:hover {
          background: #00261e;
        }
        button.secondary {
          background: #b5f23c;
          color: #074033;
        }
        button.secondary:hover {
          background: #94c043;
        }
        button.outline {
          background: transparent;
          border-color: #074033;
          color: #074033;
        }
        button.outline:hover {
          background: #074033;
          color: #f3fae7;
        }
        button.small {
          font-size: 12px;
          padding: 4px 8px;
        }
        button.medium {
          font-size: 14px;
          padding: 6px 12px;
        }
        button.large {
          font-size: 16px;
          padding: 10px 16px;
        }
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid #ccc;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-left: 0.5em;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <button>
        <slot name="icon-left"></slot>
        <span class="label"></span>
        <slot name="icon-right"></slot>
        <span class="spinner" hidden></span>
      </button>
    `;
  }

  connectedCallback() {
    this.button = this.shadowRoot.querySelector('button');
    this.labelEl = this.shadowRoot.querySelector('.label');
    this.spinnerEl = this.shadowRoot.querySelector('.spinner');

    this.button.addEventListener('click', (e) => {
      if (!this.disabled && !this.loading) {
        this.dispatchEvent(new Event('click'));
      }
    });

    this.updateAttributes();
  }

  attributeChangedCallback() {
    this.updateAttributes();
  }

  updateAttributes() {
    const label = this.getAttribute('label') || '';
    const variant = this.getAttribute('variant') || 'primary';
    const size = this.getAttribute('size') || '';
    this.loading = this.hasAttribute('loading');
    this.disabled = this.hasAttribute('disabled');

    this.labelEl.textContent = label;
    this.button.className = `${variant} ${size}`.trim();
    this.button.disabled = this.disabled || this.loading;
    this.spinnerEl.hidden = !this.loading;
  }
}

customElements.define('zero-button', ZeroButton);
