//No more used as array comes from product.js



// document.addEventListener("DOMContentLoaded", ()=>{
//     const productList = getLocal() || [];


//     console.log(productList);
//     const prodId = document.querySelector('.js-prod-id');
//     const prodName = document.querySelector('.js-prod-name');
//     const imgLink = document.querySelector('.js-prodImg-link');
//     const starCount = document.querySelector('.js-starCount');
//     const revCount = document.querySelector('.js-reviewCount');
//     const price = document.querySelector('.js-price');
//     const subButton = document.querySelector('.js-save-btn');
//     const keywords = document.querySelector('.js-prod-keyword')

//     if (subButton) {
//         subButton.addEventListener('click', (event)=>{
//             event.preventDefault();
//            // validation
//             //prod name
//             if(prodName.value.trim() === ""){
//                 alert("Error: product name cannot be empty");
//                 return;
//             }
//             //image url
//             if(!isValidURL(imgLink.value)){
//                 alert('Error: Please enter a valid image path');
//                 return;
//             }

//             //star rating 0-5
//             if(starCount.value.trim() === "" || Number(starCount.value) < 0 || Number(starCount.value)>5){
//                 alert('Error: Star rating must be between 0 and 5');
//                 return;   
//             }

//             //review count 
//             if(revCount.value.trim() === "" || Number(revCount.value) < 0){
//                 alert("Error: Review count must be positive");
//                 return;
//             }
//             // 5. Price (must be positive)
//             if (price.value.trim() === "" || Number(price.value) <= 0) {
//                 alert("Error: Price must be greater than 0.");
//                 return;
//             }
//             productList.push({
//                 id: prodId.value,
//                 name: prodName.value,
//                 image: imgLink.value,
//                 rating: {
//                     stars: Number(starCount.value),
//                     count: Number(revCount.value)
//                 },
//                 priceCents: 100 * Number(price.value),
//                 keywords: keywords.value.split(",").map(k => k.trim()).filter(k=> k !== "")
//             });

//             saveLocal();
//             alert('Product added successfully');
//         });
//     }

//     function isValidURL(path) {
//     // valid image extensions
//     const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];

//     // 1. Must end with an image extension
//     const lower = path.toLowerCase();
//     if (!imageExtensions.some(ext => lower.endsWith(ext))) {
//         return false;
//     }

//     // 2. Try full URL (https://)
//     try {
//         new URL(path);
//         return true;
//     } catch (e) {
//         // not a full URL, check if it's a relative/local path
//     }

//     // 3. Local or relative paths (e.g., images/img-1.png)
//     return /^[./\w-]+(\.\w+)$/.test(path);
// }


//     function saveLocal(){
//         localStorage.setItem('prodList', JSON.stringify(productList));
//     }
//     function getLocal(){
//         return JSON.parse(localStorage.getItem('prodList'));
//     }

// })