document.addEventListener('DOMContentLoaded', () => {


    const productList = products;
    console.log(productList);
    generateProducts();


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
            prodGrid.appendChild(clone);
        });
    }

    //no more used
    // function getLocal(){
    //     return JSON.parse(localStorage.getItem('prodList'));
    // }
});
