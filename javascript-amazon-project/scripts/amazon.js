import {cart} from '../data/cart.js';
import {products as productList} from '../data/products.js';


document.addEventListener('DOMContentLoaded', () => {

    generateProducts();
    addTocartButtonEvents();

    let cartQuantity = 0;
    const cartQuantityEle = document.querySelector('.js-cart-quantity');
    cartQuantityEle.textContent = cartQuantity;

    function generateProducts() {
        const prodGrid = document.querySelector('.js-product-grid');
        const template = document.querySelector('#product-template');
        const starImgs = {
            0: 'images/ratings/rating-0.png',
            0.5: 'images/ratings/rating-05.png',
            1: 'images/ratings/rating-10.png',
            1.5: 'images/ratings/rating-15.png',
            2: 'images/ratings/rating-20.png',
            2.5: 'images/ratings/rating-25.png',
            3: 'images/ratings/rating-30.png',
            3.5: 'images/ratings/rating-35.png',
            4: 'images/ratings/rating-40.png',
            4.5: 'images/ratings/rating-45.png',
            5: 'images/ratings/rating-50.png'
        };

        prodGrid.innerHTML = '';

        productList.forEach(product => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('.product-image').src = product.image;
            clone.querySelector('.product-name').textContent = product.name;
            clone.querySelector('.product-rating-stars').src = starImgs[Math.round(product.rating.stars * 2) / 2];
            clone.querySelector('.product-rating-count').textContent = product.rating.count;
            clone.querySelector('.product-price').textContent = `$${(product.priceCents / 100).toFixed(2)}`;

            clone.querySelector('.js-add-to-cart').dataset.productId= product.id; 


            prodGrid.appendChild(clone);
        });
    }

    


    function addTocartButtonEvents(){
            document.querySelectorAll('.js-add-to-cart').forEach((button)=>{

                button.addEventListener('click', ()=>{
                    
                    const productId = button.dataset.productId;
                    let matchingItem;

                    cart.forEach((product) =>{
                        if(product.productId === productId){
                            matchingItem = product;
                        }

                    });

                    if(matchingItem){
                        matchingItem.quantity += 1;
                    }else{
                        cart.push(
                        {
                            productId: productId,
                            quantity:1,
                        });
                    }

                    // counting for cartquantity
                    cartQuantity = 0;
                    cart.forEach((product) =>{
                        cartQuantity += product.quantity;
                    });
                    cartQuantityEle.textContent = cartQuantity;


                    // For the "Added to Cart" animation:
                    const addedTocartDiv = button.closest('.js-product-container').querySelector('.js-added-to-cart');

                    // In JavaScript, every object can have custom properties.
                    // Here, we attach a `timeOutId` property to each product's addedTocartDiv
                    // This ensures each product card has its own independent timeout.
                    if(addedTocartDiv.timeOutId){
                        clearTimeout(addedTocartDiv.timeOutId);// cancel any previous timeout if user clicks again quickly
                    }

                    addedTocartDiv.classList.add('added-to-cart-vis');

                    addedTocartDiv.timeOutId = setTimeout(()=>{
                        addedTocartDiv.classList.remove('added-to-cart-vis');

                        addedTocartDiv.timeOutId = null;// clean up the custom property after the animation ends
                    }, 2000)
                });

            });
    }
});
