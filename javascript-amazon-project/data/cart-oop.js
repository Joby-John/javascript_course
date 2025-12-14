import { products } from "./products.js";

function Cart(localStorageKey){
    const cart = {
    cartItems : [],

    initCart(){
        this.loadFromStorage();
        },

    loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        },

    saveToStorage(){
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },

    addToCart(productId){
            const productExists = (products.some(product => product.id === productId ));

            if(productExists){
                let matchingItem;

                this.cartItems.forEach((cartItem) =>{
                    if(cartItem.productId === productId){
                        matchingItem = cartItem;
                    }

                });

                if(matchingItem){
                    matchingItem.quantity += 1;
                }else{
                    this.cartItems.push(
                    {
                        productId: productId,
                        quantity:1,
                        deliveryOptionId :'1'
                    });
                }

                this.saveToStorage();
            }

        },

    addToCartAnimation(button){
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
        },

    removeFromCart(productId){
        let newCart = [];

        this.cartItems.forEach((product)=>{
            if(product.productId !== productId){
                newCart.push(product);
            }
        });

        const productContainer = document.querySelector(`[data-cart-item-id="${productId}"]`);
        
        if(productContainer){
            productContainer.remove();
        }

        this.cartItems = newCart;
        this.saveToStorage();

        },


    countCart(){
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) =>{
                cartQuantity += cartItem.quantity;
            });
        return cartQuantity;
        },


    updateDeliveryOption(productId, deliveryOptionId){

        const matchingItem = this.cartItems.find((item) => 
        {
            return item.productId === productId
        });
    
        if(matchingItem){
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        }

        }
    };

    return cart;
}

 const cart = Cart('cart-oop');
 const businesscart = Cart('business-cart');



cart.initCart();
cart.addToCart('901eb2ca-386d-432e');
businesscart.initCart();

console.log(cart);
console.log(businesscart);





