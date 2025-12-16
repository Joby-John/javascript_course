import {renderOrderSummmary} from './checkout/orderSummary.js';
import {renderPaymentSummary, setUpPlaceOrderButton} from './checkout/paymentSummary.js';
import { loadProductsFetch } from '../data/products.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';



renderCheckoutPage();

async function renderCheckoutPage(){
    try{
        await loadProductsFetch(); 
        renderOrderSummmary();
        renderPaymentSummary();
        setUpPlaceOrderButton();
    }catch(error){
        renderErrorPage();
        console.error('Checkout page failed to load:', error);
    } 
}

function renderErrorPage(){
    document.querySelector('body').innerHTML =  `
      <main class="error-page">
        <h2>Something went wrong</h2>
        <p>Please try again later.</p>
      </main>
    `;
}



