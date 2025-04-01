import {addActiveClass,addCategoryBtn,addFavouriteBtn,addcard,addToCartFunc ,addQuantitySelector}  from '../js/home.js';


export async function getCategory() {
  
    try{
      let response = await fetch('https://dummyjson.com/products/categories')
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      let json = await response.json();
      json.forEach(element => {
        addCategoryBtn(element);
      });
      addActiveClass();
    
    }catch(er){
      console.error(error.message);
    }
    }
    
    
 export   async function getProducts(category) {
      
    try{
      let response;
      if(category==='All'||category===undefined){
         response = await fetch('https://dummyjson.com/products')
      }else{
         response = await fetch(`https://dummyjson.com/products/category/${category}`)
      }
    
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      let json = await response.json();
      let data = await json.products;
    
    
      data.forEach(element => {
        addcard(element);
      });
      addFavouriteBtn();
      addQuantitySelector();
      addToCartFunc(data);
     
    }catch(er){
      console.log(er);
    }
    };
    