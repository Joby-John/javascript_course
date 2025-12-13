import * as cartModule from '../../data/cart.js';
import { products, findMatchingProduct } from '../../data/products.js';
import * as moneyUtils from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../../data/delivery-options.js';
import { renderPaymentSummary } from './paymentSummary.js';
import {updateCartCountTop} from './checkoutHeader.js';


//initializes cart 
cartModule.initCart();

const cartContainer = document.querySelector('.js-order-summary');
const template = document.querySelector('#cart-item-template');




export function renderOrderSummmary(){
    cartContainer.innerHTML = '';
    cartModule.cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        let quantity = cartItem.quantity;

        const matchingProduct = findMatchingProduct(productId);



        if (matchingProduct) {

            const clone = template.content.cloneNode(true);
            clone.querySelector('.js-product-image').src = matchingProduct.image;
            clone.querySelector('.js-product-name').innerHTML = matchingProduct.name;
            clone.querySelector('.js-product-price').innerHTML = `$${moneyUtils.formatCurrency(matchingProduct.priceCents)}`;
            clone.querySelector('.js-quantity-label').innerHTML = quantity;
            clone.querySelector('.js-new-quantity-input').value = quantity;

            const inputQuantityElement = clone.querySelector('.js-new-quantity-input');
            inputQuantityElement.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    updateProductCount(inputQuantityElement, matchingProduct.id);
                }
            });

            const updateLink = clone.querySelector('.js-update-quantity-link');
            updateLink.addEventListener('click', () => {
                const container = updateLink.closest('.js-cart-item');
                container.classList.add('is-editing-quantity');
            });

            const saveLink = clone.querySelector('.js-save-quantity-link');
            saveLink.addEventListener('click', () => {
                updateProductCount(inputQuantityElement, matchingProduct.id, cartItem);
                
            });

            const deleteLinks = clone.querySelectorAll('.js-delete-quantity-link');
            deleteLinks.forEach((link) => {
                link.dataset.productId = matchingProduct.id;
            });

            addClickEventToDelete(deleteLinks);

            const deliveryOptionDiv = clone.querySelector('.js-delivery-options');
            GenerateDeliveryOptionsHtml(deliveryOptionDiv, matchingProduct, cartItem);



            const cartItemContainers = clone.querySelectorAll('.cart-item-container');
            cartItemContainers.forEach((containers) => {
                containers.dataset.cartItemId = `${matchingProduct.id}`;
            });

            cartContainer.appendChild(clone);

        }
    });

    updateCartCountTop();
    //everytime order summary updates payment summary also updates
    renderPaymentSummary();
}

function addClickEventToDelete(deleteLinks) {
        deleteLinks.forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                cartModule.removeFromCart(productId);


                renderOrderSummmary();


            })
        });
    }

function updateProductCount(inputElement, productId) {
        const container = inputElement.closest('.js-cart-item');
        container.classList.remove('is-editing-quantity');

        let value = inputElement.value.trim();

        // check if number
        if (!/^\d+$/.test(value)) {
            alert("Please enter a valid number.");
            inputElement.value = container.querySelector('.js-quantity-label').innerHTML;
            return;
        }

        let newItemCount = Number(value);

        if (newItemCount === 0) {
            cartModule.removeFromCart(productId);
            updateCartCountTop();
            renderOrderSummmary();
            return;
        }

        if (newItemCount < 0 || newItemCount > 999) {
            alert("Quantity must be between 1 and 999.");
            inputElement.value = container.querySelector('.js-quantity-label').innerHTML;
            return;
        }


        let matchingItem = cartModule.cart.find(item => item.productId === productId);


        if (matchingItem) {
            matchingItem.quantity = newItemCount;
            cartModule.saveToStorage();
        }
        renderOrderSummmary();
    }

 function GenerateDeliveryOptionsHtml(DeliveryOptionContainer, matchingProduct, cartItem) {
        const parentContainer = DeliveryOptionContainer;
        const today = dayjs();


        deliveryOptions.forEach((deliveryOption) => {

            const deliveryDate = today.add(
                deliveryOption.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM, D');
            const deliveryFee = Number(moneyUtils.formatCurrency(deliveryOption.priceCents));

            const priceString = deliveryFee === 0  ? 'FREE' : `$${deliveryFee} -`;

            const temp = document.createElement('div');

            temp.innerHTML = `
                <div class="js-delivery-option delivery-option">

                    <input class="js-delivery-option-input delivery-option-input" 
                        name="${matchingProduct.id}-delivery-option" type="radio"
                        data-testid="delivery-option-input">

                    <div>
                        <div class="delivery-option-date">
                        ${dateString}
                        </div>
                        <div class="delivery-option-price">
                        ${priceString} Shipping
                        </div>
                    </div>
                    </div>
            `
            const option = temp.firstElementChild;
            option.dataset.productId = matchingProduct.id;
            option.dataset.optionId = deliveryOption.id;
            parentContainer.appendChild(option);

            if(deliveryOption.id === cartItem.deliveryOptionId){
                const input = option.querySelector('.js-delivery-option-input');
                input.checked = true;
                
                parentContainer.closest('.js-cart-item').querySelector('.js-delivery-date').innerHTML = dateString; 
            }

            //radio clicks
            option.addEventListener('click', ()=>{
                updateRadioSelection(option);
            });
            
            const input = option.querySelector('.js-delivery-option-input');
            input.addEventListener('change', ()=>{
                updateRadioSelection(option);
            })
        });

    }

function updateRadioSelection(option){
        const {productId, optionId} = option.dataset;

        cartModule.updateDeliveryOption(productId, optionId);

        renderOrderSummmary();
    }

