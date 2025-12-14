import * as cartModule from '../data/cart.js';
import {products as productsList} from '../data/products.js';


//initializes cart
cartModule.initCart();

document.addEventListener('DOMContentLoaded', () => {

    generateProducts();
    addTocartButtonEvents();
    updateCartQuantity();

    function generateProducts() {
        const prodGrid = document.querySelector('.js-product-grid');
        const template = document.querySelector('#product-template');
        

        prodGrid.innerHTML = '';

        productsList.forEach(product => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('.product-image').src = product.image;
            clone.querySelector('.product-name').textContent = product.name;
            clone.querySelector('.product-rating-stars').src = product.getStarsUrl();
            clone.querySelector('.product-rating-count').textContent = product.rating.count;
            clone.querySelector('.product-price').textContent = product.getPriceInUSD();

            clone.querySelector('.js-add-to-cart').dataset.productId= product.id; 


            prodGrid.appendChild(clone);
        });
    }

    function addTocartButtonEvents(){
        document.querySelectorAll('.js-add-to-cart').forEach((button)=>{

            button.addEventListener('click', ()=>{
                
                const productId = button.dataset.productId;
                cartModule.addToCart(productId);
                updateCartQuantity();
                cartModule.addToCartAnimation(button);
            });

        });
    }

    function updateCartQuantity(){
         let cartQuantity = 0;
        const cartQuantityEle = document.querySelector('.js-cart-quantity');
        
        // counting for cartquantity
        cartQuantity = cartModule.countCart();
        cartQuantityEle.innerHTML = cartQuantity;
    }
});
