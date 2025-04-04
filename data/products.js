import {addActiveClass,addCategoryBtn,addFavouriteBtn,addcard}  from '../js/home.js';
import { showloading ,Hideloading } from '../js/components.js';
import { addActiveClassShop, addcardShop, addCategoryBtnShop, addFavouriteBtnShop } from '../js/shop.js';

 let categories ={
  data:[],
  timestamp:0
} ;
 let products ={
  data:[],
  timestamp:0
};

async function fetchCategory(){

  const now = Date.now();
  let groupByCategory = await fetchProducts();
   groupByCategory = groupByCategory.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});
    categories = {
      data:Object.keys(groupByCategory),
      timestamp:now
    }
  return Object.keys(groupByCategory);


}



export async function getCategory() {
      
      let json = await fetchCategory();
      // console.log(json);
      json.forEach(element => {
        addCategoryBtn(element);
      });
      addActiveClass();
    }
    export async function getCategoryShop() {
      
      let json = await fetchCategory();
      
      json.forEach(element => {
        addCategoryBtnShop(element);
      });
      addActiveClassShop();
    }


export async function fetchProducts(){
  const now = Date.now();
  const expiryTime = 5 * 60 * 1000; // 5 minutes
  if (products.data && now - products.timestamp < expiryTime) {
    return products.data;
  }
  try{
  // let response = await fetch('https://dummyjson.com/products');
  let response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  let json = await response.json();
  console.log(json);
  // json = json.products;
  products= {
    data: json,
    timestamp: now

  }
  return json;
  }catch(er){
    console.log(er);
  }
}
    
 export   async function getProducts(category) {
  document.getElementById('product-grid').innerHTML = '';
  showloading();
    
    
    let data = await fetchProducts();
    if(data.length!=0){
      Hideloading();
    }
    if(category === 'All' || category === undefined){data = await fetchProducts();}
    else{
      data = data.filter(element => element.category === category.toLowerCase());

    }
    data.forEach(element => {
        addcard(element);
      });
      addFavouriteBtn();

     
 };


 export   async function getProductsShop(category) {
  document.getElementById('product-grid').innerHTML = '';
  showloading();
    
    
    let data = await fetchProducts();
    if(data.length!=0){
      Hideloading();
    }
    if(category === 'All' || category === undefined){data = await fetchProducts();}
    else{
      data = data.filter(element => element.category === category.toLowerCase());

    }
    data.forEach(element => {
        addcardShop(element);
      });
      addFavouriteBtnShop();

     
 };
    