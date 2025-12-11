import { countCart } from '../../data/cart.js';

export function updateCartCountTop() {
        let cartQuantity = countCart();
        document.querySelector('.checkout-top-count').textContent = `${cartQuantity} Items`;
    }