import * as cartModule from '../data/cart.js';
import {products as productsList, loadProductsFetch} from '../data/products.js';


addEventListener('DOMContentLoaded', async()=>{
    // Wait for products to load, then render
        // Generate product grid
        try{
            // Initialize cart
            cartModule.initCart();
            //get products list from remote backend
            await loadProductsFetch();

            renderPage();
        }catch(error){
            showErrorPage();
            console.error('Checkout page failed to load:', error);
        }

        
    
});

function renderPage(){
    generateProducts();
    addTocartButtonEvents();
    updateCartQuantity();
}
function showErrorPage(){
    document.querySelector('body').innerHTML = document.querySelector('body').innerHTML =  `
      <main class="error-page">
        <h2>Something went wrong</h2>
        <p>Please try again later.</p>
      </main>
    `;
}


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

        clone.querySelector('.js-add-to-cart').dataset.productId = product.id;
        const sizeChartLinkDiv = clone.querySelector('.js-clothing-size');
        sizeChartLinkDiv.innerHTML = product.extraInfoHTML();

        prodGrid.appendChild(clone);
    });
}

function addTocartButtonEvents() {
    document.querySelectorAll('.js-add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            cartModule.addToCart(productId);
            updateCartQuantity();
            cartModule.addToCartAnimation(button);
        });
    });
}

function updateCartQuantity() {
    const cartQuantityEle = document.querySelector('.js-cart-quantity');
    const cartQuantity = cartModule.countCart();
    cartQuantityEle.innerHTML = cartQuantity;
}
