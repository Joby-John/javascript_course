import {cart, initCart} from '../../data/cart.js';
import {getDeliveryOption} from '../../data/delivery-options.js';
import {findMatchingProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';

//initializes cart
initCart();


export function renderPaymentSummary(){
    
    let totalProductPriceCents = 0;
    let totalShippingPriceCents = 0;
    let itemCount = 0;

    cart.forEach((item)=>{
        const quantity = item.quantity;
        const productId = item.productId;
        const deliveryOptionId = item.deliveryOptionId;
        
        const price = findMatchingProduct(productId).priceCents;
        const shippingPrice = getDeliveryOption(deliveryOptionId).priceCents;

        totalProductPriceCents += (quantity * price);
        totalShippingPriceCents += shippingPrice;
        itemCount += item.quantity;
    })

    const totalBeforeTaxCents = totalProductPriceCents + totalShippingPriceCents;
    const extraTaxCents = totalBeforeTaxCents * 0.1;
    const orderTotalCents = totalBeforeTaxCents + extraTaxCents;

    const totalProductPrice = formatCurrency(totalProductPriceCents);
    const totalShippingPrice = formatCurrency(totalShippingPriceCents);
    const totalBeforeTax = formatCurrency(totalBeforeTaxCents);
    const extraTax = formatCurrency(extraTaxCents);
    const orderTotal = formatCurrency(orderTotalCents);

    const parentDiv = document.querySelector('.js-payment-summary');
    parentDiv.querySelector('.js-item-count').innerHTML = `Items (${itemCount}):`;
    parentDiv.querySelector('.js-total-product-price').innerHTML = `$${totalProductPrice}`;
    parentDiv.querySelector('.js-total-shipping-price').innerHTML = `$${totalShippingPrice}`;
    parentDiv.querySelector('.js-total-before-tax').innerHTML = `$${totalBeforeTax}`;
    
    parentDiv.querySelector('.js-tax-amount').innerHTML = `$${extraTax}`;
    parentDiv.querySelector('.js-order-total').innerHTML = `$${orderTotal}`;

    if(itemCount === 0){
        
        parentDiv.querySelector('.js-place-order-button').disabled = true;
        parentDiv.querySelector('.js-place-order-button').classList.add('place-order-button-disabled');
    }

}