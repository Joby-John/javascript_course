import {cart} from '../data/cart.js';
import {products} from '../data/products.js';



const cartContainer = document.querySelector('.js-order-summary');
const template = document.querySelector('#cart-item-template');

cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    let quantity = cartItem.quantity;

    const matchingProduct = products.find(product=>
        productId === product.id );

    

    if(matchingProduct){
        let priceDollars = (matchingProduct.priceCents/100).toFixed(2);
        const clone = template.content.cloneNode(true);
        clone.querySelector('.js-product-image').src = matchingProduct.image;
        clone.querySelector('.js-product-name').innerHTML = matchingProduct.name;
        clone.querySelector('.js-product-price').innerHTML = `$${priceDollars}`;
        clone.querySelector('.js-quantity-label').innerHTML = quantity;

        cartContainer.appendChild(clone);

    }

});