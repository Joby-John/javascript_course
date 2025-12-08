import {cart, removeFromCart, countCart} from '../data/cart.js';
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

        const deleteLinks = clone.querySelectorAll('.js-delete-quantity-link');
        deleteLinks.forEach((link)=>{
            link.dataset.productId = matchingProduct.id;
        });

        addClickEventToDelete(deleteLinks);

        const cartItemContainers = clone.querySelectorAll('.cart-item-container');
        cartItemContainers.forEach((containers)=>{
            containers.dataset.cartItemId = `${matchingProduct.id}`;
        });

        cartContainer.appendChild(clone);

    }

    updateCartCountTop();

});

function addClickEventToDelete(deleteLinks){
    deleteLinks.forEach((link)=>{
            link.addEventListener('click', ()=>{
               const productId = link.dataset.productId;
               removeFromCart(productId);
               
               const productContainer = document.querySelector(`[data-cart-item-id="${productId}"]`);
               
               productContainer.remove();
               updateCartCountTop();
               
            })
        });
}

function updateCartCountTop(){
    let cartQuantity = countCart();
    document.querySelector('.checkout-top-count').textContent = `${cartQuantity} Items`;   
}