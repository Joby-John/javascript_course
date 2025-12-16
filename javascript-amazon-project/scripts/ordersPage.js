import {orders} from '../data/orders.js'
import * as cartModule from '../data/cart.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import * as moneyUtils from './utils/money.js';
import * as productModule from '../data/products.js';

console.log(orders);

// console.log(orders);
addEventListener('DOMContentLoaded', async()=>{
    cartModule.initCart();
    await productModule.initProducts();

    const parentDiv = document.querySelector('.js-orders-grid');
    const template = document.querySelector('#order-container-template');

    orders.forEach((order)=>{
        const isoString = order.orderTime;
        const formattedDate = dayjs(isoString).format('MMMM D');

        const clone = template.content.cloneNode(true);

        clone.querySelector('.js-order-date').innerHTML = formattedDate;
        clone.querySelector('.js-order-cost').innerHTML = `$${moneyUtils.formatCurrency(order.totalCostCents)}`;
        clone.querySelector('.js-order-id').textContent = order.id;

        const orderDetailsGrid = clone.querySelector('.js-order-details-grid');
        const productContainerTemplate = clone.querySelector('#js-product-container-template');
        order.products.forEach((orderProduct)=>{
            const product = productModule.findMatchingProduct(orderProduct.productId);
            const productClone = productContainerTemplate.content.cloneNode(true);

            productClone.querySelector('.js-product-image-container').innerHTML = `<img src="${product.image}">`;
            productClone.querySelector('.js-product-name').textContent = product.name;
            productClone.querySelector('.js-product-delivery-date').innerHTML = dayjs(orderProduct.estimatedDeliveryTime).format('MMMM D');
            productClone.querySelector('.js-product-quantity').textContent = `Quantity: ${orderProduct.quantity}`
            productClone.querySelector('.js-buy-again-button').addEventListener('click' ,()=>{
                cartModule.addToCart(orderProduct.productId);
                updateCartQuantity()
            });

            productClone.querySelector('.js-track-link').href = `tracking.html?orderId=${order.id}&productId=${orderProduct.productId}`;

            orderDetailsGrid.appendChild(productClone);

        });

        parentDiv.appendChild(clone);
    })


    updateCartQuantity();
    function updateCartQuantity() {
        const cartQuantityEle = document.querySelector('.js-cart-quantity');
        const cartQuantity = cartModule.countCart();
        cartQuantityEle.innerHTML = cartQuantity;
    }

});



// get the order data from order.js
//reset the cart
// display the html
// make button interactive