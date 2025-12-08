
export const cart = [{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2
},{
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1
}
];

export function addToCart(productId){
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
            });
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