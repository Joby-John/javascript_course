// setUpTestDOMCheckout.js
export function setupOrderSummaryDOM() {
    const container = document.querySelector('.js-test-container');
    container.innerHTML = '';

    /* Cart count (updateCartCountTop uses this) */
    const cartCount = document.createElement('span');
    cartCount.className = 'checkout-top-count';
    container.appendChild(cartCount);

    /* Order summary wrapper (MUST match real page) */
    const orderSummary = document.createElement('div');
    orderSummary.className = 'order-summary js-order-summary';

    /* Template MUST live inside order summary */
    const cartTemplate = document.createElement('template');
    cartTemplate.id = 'cart-item-template';
    cartTemplate.innerHTML = `
        <div class="js-cart-item-container cart-item-container">
            <div class="delivery-date">
                Delivery date: <span class="js-delivery-date"></span>
            </div>
            <div class="cart-item-details-grid">
                <img class="product-image js-product-image" src="">
                <div class="cart-item-details">
                    <div class="product-name js-product-name"></div>
                    <div class="product-price js-product-price"></div>
                    <div class="js-quantity-container product-quantity">
                        Quantity: <span class="js-quantity-label"></span>
                        <input class="js-new-quantity-input new-quantity-input" type="number">
                        <span class="js-update-quantity-link">Update</span>
                        <span class="js-save-quantity-link">Save</span>
                        <span class="js-delete-quantity-link">Delete</span>
                    </div>
                </div>
                <div class="delivery-options js-delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                </div>
            </div>
        </div>
    `;
    container.appendChild(cartTemplate);
    container.appendChild(orderSummary);

    /* Payment summary */
    const paymentSummary = document.createElement('div');
    paymentSummary.className = 'js-payment-summary payment-summary';
    paymentSummary.innerHTML = `
        <div class="payment-summary-title">Order Summary</div>

        <div class="payment-summary-row">
            <div class="js-item-count"></div>
            <div class="js-total-product-price payment-summary-money"></div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="js-total-shipping-price payment-summary-money"></div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="js-total-before-tax payment-summary-money"></div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="js-tax-amount payment-summary-money"></div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="js-order-total payment-summary-money"></div>
        </div>

        <button class="js-place-order-button place-order-button button-primary">
            Place your order
        </button>
    `;
    container.appendChild(paymentSummary);
}
