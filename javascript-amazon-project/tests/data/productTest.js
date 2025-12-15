import {Product, Clothing} from '../../data/products.js';


describe('Test Suite: Product Class', ()=>{
    let products;
    beforeEach(()=>{
        products = [{
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
            stars: 4.5,
            count: 87
            },
            priceCents: 1090,
            keywords: [
            "socks",
            "sports",
            "apparel"
            ]
        },{
            id: "bc2847e9-5323-403f-b7cf-57fde044a955",
            image: "images/products/men-cozy-fleece-zip-up-hoodie-red.jpg",
            name: "Men's Full-Zip Hooded Fleece Sweatshirt",
            rating: {
            stars: 4.5,
            count: 3157
            },
            priceCents: 2400,
            type : 'clothing',
            sizeChartLink:'demo link',
            keywords: [
            "sweaters",
            "hoodies",
            "apparel",
            "mens"
            ]}
        ]
    });
    it('creates a new object for product class', ()=>{
        const productInstances= products.map( (productDetails) => {
          if(productDetails.type === 'clothing'){
            return new Clothing(productDetails);
          }
          return new Product(productDetails)
        
        });

        expect(typeof productInstances[0]).toContain('object');
        expect(productInstances[0] instanceof Product).toBe(true);

        expect(productInstances[0].priceCents).toEqual(1090);
        expect(productInstances[0].getPriceInUSD()).toEqual(`$10.90`)
        expect(productInstances[0].extraInfoHTML()).toBe('');
    });

    it('verifies if clothing gets automatically turned to Clothing class', ()=>{
        const productInstances= products.map( (productDetails) => {
          if(productDetails.type === 'clothing'){
            return new Clothing(productDetails);
          }
          return new Product(productDetails)
          
        });
        expect(productInstances[0] instanceof Clothing).toBe(false);
        expect(productInstances[1] instanceof Clothing).toBe(true);
        expect(productInstances[1].extraInfoHTML()).toContain(`<a href="${productInstances[1].sizeChartLink}" target="_blank">Size Chart</a>`);
    });

    it('tests getStarsUrl',()=>{
        const product = new Product(products[0]);
        expect(product.getStarsUrl()).toBe('images/ratings/rating-45.png')
    });

    
});