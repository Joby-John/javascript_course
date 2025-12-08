import * as cartModule from '../data/cart.js';
import {products} from '../data/products.js';
import * as moneyUtils from './utils/money.js';


const cartContainer = document.querySelector('.js-order-summary');
const template = document.querySelector('#cart-item-template');

cartModule.cart.forEach((cartItem)=>{
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
        clone.querySelector('.js-new-quantity-input').value = quantity;

        const updateLink = clone.querySelector('.js-update-quantity-link');
        updateLink.addEventListener('click', ()=>{
            const container = updateLink.closest('.js-cart-item');
            container.classList.add('is-editing-quantity');
        });

        const saveLink = clone.querySelector('.js-save-quantity-link');
        saveLink.addEventListener('click', ()=>{
            const container = saveLink.closest('.js-cart-item');
            container.classList.remove('is-editing-quantity');
            const inputElement = container.querySelector('.js-new-quantity-input');
            let newQuantity = updateProductCount(inputElement, matchingProduct.id);
            container.querySelector('.js-quantity-label').innerHTML = newQuantity; 

            updateCartCountTop();
        });

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
               cartModule.removeFromCart(productId);

               updateCartCountTop();
               
            })
        });
}

function updateCartCountTop(){
    let cartQuantity = cartModule.countCart();
    document.querySelector('.checkout-top-count').textContent = `${cartQuantity} Items`;   
}

function updateProductCount(inputElement, productId){
    let newItemCount = Number(inputElement.value);

    if(newItemCount <= 0){
        cartModule.removeFromCart(productId);
        return 0;
    }

    let matchingItem = cartModule.cart.find(item => item.productId === productId);


    if(matchingItem){
        matchingItem.quantity = newItemCount;
        cartModule.saveToStorage();
    }
    return newItemCount;
}