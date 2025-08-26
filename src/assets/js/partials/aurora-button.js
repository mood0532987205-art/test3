/**
 * Aurora Glow Button Component
 * A custom button component with aurora glow effects and mouse tracking
 */
class AuroraButton extends HTMLElement {
  constructor() {
    super();
    this.isLoading = false;
    this.originalText = '';
  }

  static get observedAttributes() {
    return ['product-id', 'product-status', 'product-type', 'loading', 'disabled'];
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'loading') {
      this.toggleLoading(newValue === 'true');
    }
    if (name === 'disabled') {
      this.toggleDisabled(newValue === 'true');
    }
  }

  get productId() {
    return this.getAttribute('product-id');
  }

  get productStatus() {
    return this.getAttribute('product-status');
  }

  get productType() {
    return this.getAttribute('product-type');
  }

  get buttonText() {
    return this.textContent.trim() || this.getDefaultText();
  }

  getDefaultText() {
    if (this.productStatus === 'sale' && this.productType === 'booking') {
      return salla.lang.get('pages.cart.book_now');
    }
    if (this.productStatus === 'sale') {
      return salla.lang.get('pages.cart.add_to_cart');
    }
    if (this.productType !== 'donating') {
      return salla.lang.get('pages.products.out_of_stock');
    }
    return salla.lang.get('pages.products.donation_exceed');
  }

  getIcon() {
    if (this.productStatus === 'sale') {
      return this.productType === 'booking' ? 'sicon-calendar-time' : 'sicon-shopping-bag';
    }
    return '';
  }

  render() {
    this.originalText = this.buttonText;
    const icon = this.getIcon();
    
    this.innerHTML = `
      <button class="aurora-button" type="button">
        <div class="aurora-button-content">
          ${icon ? `<i class="${icon} text-base"></i>` : ''}
          <span class="aurora-button-text">${this.originalText}</span>
          <div class="aurora-loader" style="display: none;"></div>
        </div>
      </button>
    `;

    this.button = this.querySelector('.aurora-button');
    this.textElement = this.querySelector('.aurora-button-text');
    this.loader = this.querySelector('.aurora-loader');
  }

  attachEventListeners() {
    // Mouse tracking for aurora effect
    this.button.addEventListener('mousemove', (e) => {
      const rect = this.button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      this.button.style.setProperty('--x', `${x}px`);
      this.button.style.setProperty('--y', `${y}px`);
    });

    // Click handler for add to cart functionality
    this.button.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleAddToCart();
    });
  }

  async handleAddToCart() {
    if (this.isLoading || this.hasAttribute('disabled')) {
      return;
    }

    if (this.productStatus !== 'sale') {
      return;
    }

    try {
      this.toggleLoading(true);
      
      // Get the product form if it exists (for product page)
      const form = this.closest('form') || document.querySelector('.product-form');
      
      if (form) {
        // Product page - use form data
        const formData = new FormData(form);
        formData.append('product_id', this.productId);
        
        await salla.cart.addItem(formData);
      } else {
        // Product card - simple add to cart
        await salla.cart.addItem({
          id: this.productId,
          quantity: 1
        });
      }

      // Show success feedback
      this.showSuccess();
      
    } catch (error) {
      console.error('Add to cart error:', error);
      this.showError();
    } finally {
      this.toggleLoading(false);
    }
  }

  toggleLoading(loading) {
    this.isLoading = loading;
    
    if (loading) {
      this.button.classList.add('loading');
      this.textElement.style.display = 'none';
      this.loader.style.display = 'inline-block';
      this.setAttribute('loading', 'true');
    } else {
      this.button.classList.remove('loading');
      this.textElement.style.display = 'inline';
      this.loader.style.display = 'none';
      this.removeAttribute('loading');
    }
  }

  toggleDisabled(disabled) {
    if (disabled) {
      this.button.setAttribute('disabled', 'true');
      this.setAttribute('disabled', 'true');
    } else {
      this.button.removeAttribute('disabled');
      this.removeAttribute('disabled');
    }
  }

  showSuccess() {
    const originalText = this.textElement.textContent;
    this.textElement.textContent = '✓ Added!';
    this.textElement.style.color = '#10b981';
    
    setTimeout(() => {
      this.textElement.textContent = originalText;
      this.textElement.style.color = '';
    }, 2000);
  }

  showError() {
    const originalText = this.textElement.textContent;
    this.textElement.textContent = '✗ Error';
    this.textElement.style.color = '#ef4444';
    
    setTimeout(() => {
      this.textElement.textContent = originalText;
      this.textElement.style.color = '';
    }, 2000);
  }

  // Public methods for external control
  load() {
    this.toggleLoading(true);
    return this;
  }

  stop() {
    this.toggleLoading(false);
    return this;
  }
}

// Register the custom element
customElements.define('aurora-add-button', AuroraButton);

export default AuroraButton;
