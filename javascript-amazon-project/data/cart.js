import { products } from "./products.js";

export let cart = [];

export function resetCart(){
    cart = [];
    saveToStorage();
}
export function initCart(){
    loadFromStorage();
}

export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}



export function addToCart(productId){
        if(products.some(product => product.id === productId)){
            let matchingItem;

            cart.forEach((cartItem) =>{
                if(cartItem.productId === productId){
                    matchingItem = cartItem;
                }

            });

            if(matchingItem){
                matchingItem.quantity += 1;
            }else{
                cart.push(
                {
                    productId: productId,
                    quantity:1,
                    deliveryOptionId :'1'
                });
            }

            saveToStorage();
        }
    }

export function addToCartAnimation(button){
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
        }, 2000);
    }

export function removeFromCart(productId){
    let newCart = [];

    cart.forEach((product)=>{
        if(product.productId !== productId){
            newCart.push(product);
        }
    });

    const productContainer = document.querySelector(`[data-cart-item-id="${productId}"]`);

    productContainer.remove();

    cart = newCart;
    saveToStorage();

}

export function countCart(){
    let cartQuantity = 0;
    cart.forEach((cartItem) =>{
            cartQuantity += cartItem.quantity;
        });
    return cartQuantity;
}

export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateDeliveryOption(productId, deliveryOptionId){

    const matchingItem = cart.find((item) => 
        {
            return item.productId === productId
        });
    
        if(matchingItem){
            matchingItem.deliveryOptionId = deliveryOptionId;
            saveToStorage();
        }

}