import { setupOrderSummaryDOM } from "./setUpTestDOMCheckout.js";
import { renderOrderSummmary } from "../../scripts/checkout/orderSummary.js";
import { initCart, cart } from "../../data/cart.js";

setupOrderSummaryDOM();

describe('Test Suite : renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '3fdfe8d6-9a15-4979-b459-585b0d0545b9';

    beforeEach(() => {
        setupOrderSummaryDOM(); 
        
        // Your existing spies...
        spyOn(localStorage, 'setItem').and.callFake(() => {});
        spyOn(localStorage, 'getItem').and.callFake((key) => {
            // ... your mock data ...
            return JSON.stringify([{ productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 2, deliveryOptionId: '1' },{ productId: '3fdfe8d6-9a15-4979-b459-585b0d0545b9', quantity: 1, deliveryOptionId: '2' }]);
        });

        initCart();
    });

    // ✨ NEW: Clean up the HTML after the test finishes
    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('displays the cart', () => {
        renderOrderSummmary();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    });
    it('removes a product from the cart', () => {
        renderOrderSummmary();

        // 2. Select the specific delete link using the Attribute Selector
        // Syntax: .class[data-attribute="value"]
        const deleteLink = document.querySelector(`.js-delete-quantity-link[data-product-id="${productId1}"]`);
        
        // 3. Click it programmatically
        deleteLink.click();

       
        
       
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

        
        const container1 = document.querySelector(`.js-cart-item-container[data-cart-item-id="${productId1}"]`);
        expect(container1).toEqual(null);

        
        const container2 = document.querySelector(`.js-cart-item-container[data-cart-item-id="${productId2}"]`);
        expect(container2).not.toEqual(null);

        expect(cart.length).toEqual(1);

    });

    it('update product quantity', ()=>{

        renderOrderSummmary();

        const inputField = document.querySelector(`.js-new-quantity-input[data-product-id="${productId2}"]`);

        inputField.value = '10';

        const saveLink = document.querySelector(`.js-save-quantity-link[data-product-id="${productId2}"]`);

        saveLink.click();
        
        const quantityLabel = document.querySelector(`.js-quantity-label[data-product-id="${productId2}"]`);
        expect(quantityLabel.innerHTML).toEqual('10');

        const upperProductCount = document.querySelector('.checkout-top-count');
        expect(upperProductCount.textContent).toContain(12);
    });
});