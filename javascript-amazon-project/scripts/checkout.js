import {cart} from '../data/cart.js';
import {products} from '../data/products.js';
import * as moneyUtils from './utils/money.js';



const cartContainer = document.querySelector('.js-order-summary');
const template = document.querySelector('#cart-item-template');

cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    let quantity = cartItem.quantity;

    const matchingProduct = products.find(product=>
        productId === product.id );

    

    if(matchingProduct){

        const clone = template.content.cloneNode(true);
        clone.querySelector('.js-product-image').src = matchingProduct.image;
        clone.querySelector('.js-product-name').innerHTML = matchingProduct.name;
        clone.querySelector('.js-product-price').innerHTML = `$${moneyUtils.formatCurrency(matchingProduct.priceCents)}`;
        clone.querySelector('.js-quantity-label').innerHTML = quantity;
        const deliveryInputRadios = clone.querySelectorAll('.js-delivery-option-input');

        deliveryInputRadios.forEach((input)=>{
            input.name = `${matchingProduct.id}-delivery-option`; 
        });

        cartContainer.appendChild(clone);

    }

});