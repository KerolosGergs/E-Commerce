import {addActiveClass,addCategoryBtn,addFavouriteBtn,addcard}  from '../js/home.js';
import { showloading ,Hideloading } from '../js/components.js';

let categories ={
  data:null,
  timestamp:0
} ;
let products ={
  data:null,
  timestamp:0
};

async function fetchCategory(){
  // const now = Date.now();
  // const expiryTime = 5 * 60 * 1000; // 5 minutes
  // if (categories.data && now - categories.timestamp < expiryTime) {
  //   return categories.data;
  // }
  // try{
  // let response = await fetch('https://dummyjson.com/products/categories');
  // if (!response.ok) {
  //   throw new Error(`Response status: ${response.status}`);
  // }
  // let json = await response.json();
  // categories= {
  //   data: json,
  //   timestamp: now

  // }
  // return json;
  // }catch(er){
  //   console.log(er);
  // }
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
  // groupByCategory = groupByCategory.filter(element=>element.length>0);
  // console.log(groupByCategory);

}



export async function getCategory() {
      
      let json = await fetchCategory();
      console.log(json);
      json.forEach(element => {
        addCategoryBtn(element);
      });
      addActiveClass();
    }
    


export async function fetchProducts(){
  const now = Date.now();
  const expiryTime = 5 * 60 * 1000; // 5 minutes
  if (products.data && now - products.timestamp < expiryTime) {
    return products.data;
  }
  try{
  let response = await fetch('https://dummyjson.com/products');
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  let json = await response.json();
  json = json.products;
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
    