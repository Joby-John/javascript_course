import { setupOrderSummaryDOM } from "./setUpTestDOMCheckout.js";
import { renderOrderSummmary } from "../../scripts/checkout/orderSummary.js";
import { initCart } from "../../data/cart.js";

setupOrderSummaryDOM();

describe('Test Suite : renderOrderSummary', () => {
    
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
    afterAll(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('displays the cart', () => {
        renderOrderSummmary();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    });
    it('removes a product from the cart', () => {
        renderOrderSummmary();

        // 1. Define the ID of the product you want to delete 
        // (matches the mock data in your beforeEach)
        const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        const productId2 = '3fdfe8d6-9a15-4979-b459-585b0d0545b9';

        // 2. Select the specific delete link using the Attribute Selector
        // Syntax: .class[data-attribute="value"]
        const deleteLink = document.querySelector(`.js-delete-quantity-link[data-product-id="${productId1}"]`);
        
        // 3. Click it programmatically
        deleteLink.click();

        // 4. Verification: Check the DOM 
        
        // Expectation A: Total items should now be 1 (since we started with 2)
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

        // Expectation B: The container for the deleted product (ID1) should be null (gone)
        const container1 = document.querySelector(`.js-cart-item-container[data-cart-item-id="${productId1}"]`);
        expect(container1).toEqual(null);

        // Expectation C: The container for the OTHER product (ID2) should still exist
        const container2 = document.querySelector(`.js-cart-item-container[data-cart-item-id="${productId2}"]`);
        expect(container2).not.toEqual(null);

    });

    it('update product quantity', ()=>{
        renderOrderSummmary();
        const productId2 = '3fdfe8d6-9a15-4979-b459-585b0d0545b9';

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