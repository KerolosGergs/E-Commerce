import { cart ,addToCard} from "../data/cart.js";
import {getCategoryShop,getProductsShop }from"../data/products.js";
import { showAlert } from "./components.js";



// Favourite button to Card 
export function addFavouriteBtnShop(){
  document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('active');
        const icon = this.querySelector('i');
        if (this.classList.contains('active')) {
            icon.classList.replace('far', 'fas');
        } else {
            icon.classList.replace('fas', 'far');
        }
    });
  });
}


// Categories active to Button on click
export function addActiveClassShop(){
  
 document.querySelectorAll('.category-btn').forEach(button =>{ button.addEventListener('click', function() {
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('active');
  });
  this.classList.add('active');
  });

button.addEventListener('click', function() {

  getProductsShop(this.textContent);
})}
);
}





export function addCategoryBtnShop(element){

  let categories= document.getElementById('categories');
  let button =  document.createElement('button');
  button.textContent=element;
  button.classList.add('category-btn');

 
  categories.appendChild(button);
}

export function addcardShop(element){
  let productGrid = document.getElementById('product-grid');
  
    let card = document.createElement('div');
    card.classList.add('product-card')

    // Add to card 
    let button =  document.createElement('button');
    button.classList.add('favorite-btn');
    let icon = document.createElement('i')
    icon.classList.add(`fas`);
    icon.classList.add(`fa-heart`);

    button.appendChild(icon);
    card.appendChild(button);

    // Add To card
    let image = document.createElement('img');
    image.setAttribute('src',element.image);
    image.classList.add('product-img')
    card.appendChild(image);

    //Add to card
    let info = document.createElement('div');
    info.classList.add('product-info');

    let title = document.createElement('h3');
    title.classList.add('product-title');
    title.textContent=element.title;
    info.appendChild(title)

    let Type = document.createElement('span');
    Type.classList.add('product-category');
    Type.textContent=element.category.name;
    info.appendChild(Type);

    // add to info priceQuantity
    let priceQuantity = document.createElement('div');
    priceQuantity.classList.add('price-quantity');


    ///add to priceQuantity  (Product Price)
    let price = document.createElement('div');
    price.classList.add('product-price');

    let CurrPrice = document.createElement('span');
    CurrPrice.classList.add('current-price');
    CurrPrice.textContent='$'+ element.price;
    price.appendChild(CurrPrice);

    // add to info Quantity Selector
    let quantity = document.createElement('div');
    quantity.classList.add('quantity-selector');

    let minus = document.createElement('button');
    minus.textContent='-';
    minus.classList.add('quantity-btn');
    minus.classList.add('minus');
    

    let input = document.createElement('input');
    input.classList.add('quantity-input');
    input.setAttribute('type','number');
    input.setAttribute('value','1');
    input.setAttribute('min','1');
    input.setAttribute('value-by-id',element.id);

    let plus = document.createElement('button');
    plus.textContent='+';
    plus.classList.add('quantity-btn');
    plus.classList.add('plus')

    quantity.appendChild(minus);
    quantity.appendChild(input);
    quantity.appendChild(plus);

    priceQuantity.appendChild(price);
    priceQuantity.appendChild(quantity);
    info.appendChild(priceQuantity);


    minus.addEventListener('click',function() {
      if (input.value > 1) {
        input.value  -= 1;
    }
    })

    plus.addEventListener('click',function() {
      +input.value ++;
    })
    input.addEventListener('input',function() {
      if (isNaN(+input.value) || +input.value < 1) {
        input.value = 1;
    }
    })

    // add to info 
    let AddCartBtn = document.createElement('button')
    AddCartBtn.classList.add('add-to-cart');
    AddCartBtn.classList.add('js-add-to-cart');
    AddCartBtn.setAttribute('id',`${element.id}`)
    let cartIcon = document.createElement('i');
    cartIcon.classList.add('fas');
    cartIcon.classList.add('fa-shopping-cart');
    AddCartBtn.addEventListener('click',function() {
      
      addToCard(element,input.value);
      input.value=1
      showAlert();
        document.querySelector('.counter-cart').textContent = cart.length;
    });

    AddCartBtn.appendChild(cartIcon);
    AddCartBtn.textContent='Add to Cart';
    info.appendChild(AddCartBtn);

    card.appendChild(info);
    
    productGrid.appendChild(card);
  
}







getCategoryShop();
getProductsShop();




