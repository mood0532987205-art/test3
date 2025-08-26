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
    // Wait for Salla to be ready
    if (typeof salla !== 'undefined') {
      this.render();
      this.attachEventListeners();
    } else {
      // Wait for Salla to load
      document.addEventListener('DOMContentLoaded', () => {
        this.render();
        this.attachEventListeners();
      });
    }
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
    // Ensure salla is available
    if (typeof salla === 'undefined') {
      return 'Add to Cart';
    }

    if (this.productStatus === 'sale' && this.productType === 'booking') {
      return salla.lang.get('pages.cart.book_now') || 'Book Now';
    }
    if (this.productStatus === 'sale') {
      return salla.lang.get('pages.cart.add_to_cart') || 'Add to Cart';
    }
    if (this.productType !== 'donating') {
      return salla.lang.get('pages.products.out_of_stock') || 'Out of Stock';
    }
    return salla.lang.get('pages.products.donation_exceed') || 'Donate';
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
      e.stopPropagation();

      // Ensure we don't interfere with other click handlers
      if (!this.isLoading && !this.hasAttribute('disabled')) {
        this.handleAddToCart();
      }
    });

    // Listen for Salla events
    if (typeof salla !== 'undefined') {
      // Update button state when cart changes
      salla.event.on('cart::updated', () => {
        // Button can be updated here if needed
      });
    }
  }

  async handleAddToCart() {
    console.log('Aurora Button: handleAddToCart called', {
      productId: this.productId,
      productStatus: this.productStatus,
      productType: this.productType,
      isLoading: this.isLoading,
      disabled: this.hasAttribute('disabled')
    });

    if (this.isLoading || this.hasAttribute('disabled')) {
      console.log('Aurora Button: Button is loading or disabled');
      return;
    }

    // Check if Salla is available
    if (typeof salla === 'undefined') {
      console.error('Aurora Button: Salla is not available');
      this.showError();
      return;
    }

    if (this.productStatus !== 'sale') {
      // Handle out of stock or other statuses
      if (this.productType !== 'donating') {
        console.log('Aurora Button: Product not for sale');
        if (salla.notify) {
          salla.notify.warning(salla.lang.get('pages.products.out_of_stock') || 'Product is out of stock');
        }
        return;
      }
    }

    try {
      this.toggleLoading(true);
      console.log('Aurora Button: Starting add to cart process');

      // Get the product form if it exists (for product page)
      const form = this.closest('form') || document.querySelector('.product-form');

      if (form) {
        console.log('Aurora Button: Using form submission');
        // Product page - validate form first
        if (!form.reportValidity()) {
          console.log('Aurora Button: Form validation failed');
          this.toggleLoading(false);
          return;
        }

        // Use Salla's built-in form submission
        const formData = new FormData(form);
        formData.append('product_id', this.productId);

        // Trigger Salla's add to cart with form data
        const result = await salla.cart.addItem(formData);
        console.log('Aurora Button: Form submission result', result);
      } else {
        console.log('Aurora Button: Using direct product addition');
        // Product card - simple add to cart
        const productData = {
          id: parseInt(this.productId),
          quantity: 1
        };

        // Handle donation products
        if (this.productType === 'donating') {
          const donationInput = this.closest('.s-product-card-content')?.querySelector('[name="donating_amount"]');
          if (donationInput && donationInput.value) {
            productData.donating_amount = parseFloat(donationInput.value);
          }
        }

        console.log('Aurora Button: Adding product with data', productData);
        const result = await salla.cart.addItem(productData);
        console.log('Aurora Button: Direct addition result', result);
      }

      // Show success feedback
      this.showSuccess();
      console.log('Aurora Button: Successfully added to cart');

      // Trigger cart update events
      if (salla.event) {
        salla.event.dispatch('cart::updated');
      }

    } catch (error) {
      console.error('Aurora Button: Add to cart error', error);
      this.showError();

      // Show user-friendly error message
      if (salla.notify) {
        if (error.response && error.response.data && error.response.data.error) {
          salla.notify.error(error.response.data.error.message);
        } else if (error.message) {
          salla.notify.error(error.message);
        } else {
          salla.notify.error(salla.lang.get('common.messages.request_error') || 'An error occurred');
        }
      }
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
