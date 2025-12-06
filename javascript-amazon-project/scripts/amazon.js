
const productList = getLocal() || [];
generateProducts();


console.log(productList);

    const prodName = document.querySelector('.js-prod-name');
    const imgLink = document.querySelector('.js-prodImg-link');
    const starCount = document.querySelector('.js-starCount');
    const revCount = document.querySelector('.js-reviewCount');
    const price = document.querySelector('.js-price');
    const subButton = document.querySelector('.js-save-btn');

    subButton.addEventListener('click', (event)=>{

        // validation
        //prod name
        if(prodName.value.trim() === ""){
            alert("Error: product name cannot be empty");
            return;
        }
        //image url
        if(!isValidURL(imgLink.value)){
            alert('Error: Please enter a valid image path');
            return;
        }

        //star rating 0-5
        if(starCount.value.trim() === "" || Number(starCount.value) < 0 || Number(starCount.value)>5){
            alert('Error: Star rating must be between 0 and 5');
            return;   
        }

        //review count 
        if(revCount.value.trim() === "" || Number(revCount.value) < 0){
            alert("Error: Review count must be positive");
            return;
        }
        // 5. Price (must be positive)
        if (price.value.trim() === "" || Number(price.value) <= 0) {
            alert("Error: Price must be greater than 0.");
            return;
        }

        let product = {
            name: prodName.value,
            image_src: imgLink.value,
            rating:{
                stars : Number(starCount.value),
                count : Number(revCount.value)
            },
            priceCents: 100* Number(price.value)
        }

        productList.push(product);

        saveLocal();
        window.alert('Product added successfully');

    });

    function isValidURL(path) {
    // Accept common image extensions
    const validExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
    return validExtensions.test(path.trim());
    }

    function saveLocal(){
        localStorage.setItem('prodList', JSON.stringify(productList));
    }
    function getLocal(){
        return JSON.parse(localStorage.getItem('prodList'));
    }


    function generateProducts(){
        const prodGrid = document.querySelector('.js-product-grid');
        prodGrid.innerHTML = '';

        const starImgs = {
            0: 'images/ratings/rating-0.png',
            0.5: 'images/ratings/rating-05.png',
            1: 'images/ratings/rating-10.png',
            1.5: 'images/ratings/rating-15.png',
            2.0: 'images/ratings/rating-20.png',
            2.5: 'images/ratings/rating-25.png',
            3.0: 'images/ratings/rating-30.png',
            3.5: 'images/ratings/rating-35.png',
            4.0: 'images/ratings/rating-40.png',
            4.5: 'images/ratings/rating-45.png',
            5.0: 'images/ratings/rating-50.png'
        };


        productList.forEach((product, index)=>{
            let name = product.name;
            let img_src = product.image_src;
            let stars = product.rating.stars;
            let revCount = product.rating.count;
            let priceCents = product.priceCents;

            const productContainer = document.createElement('div');
            productContainer.classList.add('product-container');
            productContainer.classList.add('js-product-container');
            

            const imgContainer = document.createElement('div');
            imgContainer.classList.add('product-image-container');
            imgContainer.classList.add('js-product-image-container');

            const img = document.createElement('img');
            img.classList.add('product-image')
            img.classList.add('js-product-image')
            img.src = `${img_src}`;
            imgContainer.appendChild(img);

            const prodNameDiv = document.createElement('div');
            prodNameDiv.classList.add('js-product-name');
            prodNameDiv.classList.add('product-name');
            prodNameDiv.classList.add('limit-text-to-2-lines');
            prodNameDiv.textContent = `${name}`;

            const prodRatingContainerDiv = document.createElement('div');
            const starImg = document.createElement('img');
            starImg.classList.add('product-rating-stars');
            starImg.classList.add('js-product-rating-stars');
            let starsRounded = Math.round(stars * 2) / 2;
            starImg.src = `${starImgs[starsRounded]}`;
            prodRatingContainerDiv.appendChild(starImg);

            const reviewCountDiv = document.createElement('div');
            reviewCountDiv.classList.add('product-rating-count');
            reviewCountDiv.classList.add('js-product-rating-count');
            reviewCountDiv.classList.add('link-primary');
            reviewCountDiv.textContent = `${revCount}`
            prodRatingContainerDiv.appendChild(reviewCountDiv);

            const priceDiv = document.createElement('div');
            priceDiv.classList.add('product-price');
            priceDiv.classList.add('js-product-price');
            priceDiv.textContent = `$${(priceCents/100).toFixed(2)}`

            const productQuantityDiv = document.createElement('div');
            productQuantityDiv.classList.add('product-quantity-container');
            productQuantityDiv.classList.add('js-product-quantity-container');

            const select = document.createElement('select');

            for(let i = 1; i<=10; i++){
                let option = document.createElement('option');
                option.value = i;
                option.textContent = i;

                if(i === 1){
                    option.selected = true;
                }

                select.appendChild(option);
            }
            productQuantityDiv.appendChild(select);

            const productSpacerDiv = document.createElement('div');
            productSpacerDiv.classList.add('product-spacer');
            productSpacerDiv.classList.add('js-product-spacer');

            const addedButtonDiv = document.createElement('div');
            addedButtonDiv.classList.add('added-to-cart');
            addedButtonDiv.classList.add('js-added-to-cart');
            addedButtonDiv.textContent = 'Added';

            const addedImg = document.createElement('img');
            addedImg.src = 'images/icons/checkmark.png';
            addedImg.classList.add('added-to-cart');
            addedImg.classList.add('js-added-to-cart');

            addedButtonDiv.appendChild(addedImg);

            const addButton = document.createElement('button');
            addButton.classList.add('add-to-cart-button');
            addButton.classList.add('js-add-to-cart-button');
            addButton.classList.add('button-primary');
            addButton.textContent = 'Add to Cart';


            productContainer.appendChild(imgContainer);
            productContainer.appendChild(prodNameDiv);
            productContainer.appendChild(prodRatingContainerDiv);
            productContainer.appendChild(priceDiv);
            productContainer.appendChild(productQuantityDiv);
            productContainer.appendChild(productSpacerDiv);
            productContainer.appendChild(addedButtonDiv);
            productContainer.appendChild(addButton);

            prodGrid.appendChild(productContainer);

        });
    }
