import { cart ,addToCard} from "../data/cart.js";
import {getCategory ,getProducts}from"../data/products.js";
import { showAlert } from "./alert.js";

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls

document.getElementsByClassName('prev')[0].addEventListener('click', function() {
  showSlides(slideIndex-=1);
});
document.getElementsByClassName('next')[0].addEventListener('click', function() {
  showSlides(slideIndex+=1);
})

Array.from(document.getElementsByClassName('dot')).forEach((dot, index) => {
  dot.addEventListener('click', function() {
    showSlides(slideIndex = index + 1);
  });
});


function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}





// Favourite button to Card 
export function addFavouriteBtn(){
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
export function addActiveClass(){
  document.querySelectorAll('.category-btn').forEach(button => button.addEventListener('click', function() {
    let productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('active');
  });
  this.classList.add('active');
    getProducts('All');
  }));
}





export function addCategoryBtn(element){

  let categories= document.getElementById('categories');
  let button =  document.createElement('button');
  button.textContent=element.name;
  button.classList.add('category-btn');
  
 
  categories.appendChild(button);
}

export function addcard(element){
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
    image.setAttribute('src',element.images[0]);
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
    let cart = document.createElement('button')
    cart.classList.add('add-to-cart');
    cart.classList.add('js-add-to-cart');
    cart.setAttribute('id',`${element.id}`)
    let cartIcon = document.createElement('i');
    cartIcon.classList.add('fas');
    cartIcon.classList.add('fa-shopping-cart');
    cart.addEventListener('click',function() {
      debugger
      addToCard(element,input.value);
      input.value=1
      showAlert();
    });

    cart.appendChild(cartIcon);
    cart.textContent='Add to Cart';
    info.appendChild(cart);

    card.appendChild(info);
    productGrid.appendChild(card);
  
}









getCategory();
getProducts();




