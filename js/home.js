import { cart ,addToCard} from "../data/cart.js";


let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

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




// Favourite button 

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


async function getCategory() {
try{
  let response = await fetch('https://dummyjson.com/products/categories')
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  let json = await response.json();
  let categories= document.getElementById('categories');

  let button1 =  document.createElement('button');
  button1.textContent='All';
  button1.classList.add('category-btn');
  button1.classList.add('active');  
  button1.addEventListener('click', function() {
    let productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    //to Make it active
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('active');
  });
  this.classList.add('active');
    getProducts('All');
  })
  categories.appendChild(button1);
  console.log(json);
  json.forEach(element => {
    let button =  document.createElement('button');
    button.textContent=element.name;
    button.classList.add('category-btn');
    
    button.addEventListener('click', function() {
      let productGrid = document.getElementById('product-grid');
      productGrid.innerHTML = '';
      document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    this.classList.add('active');
      getProducts(element.name);

    })
    categories.appendChild(button);



  });

}catch(er){
  console.error(error.message);
}
}

async function getProducts(category) {
  
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
  let productGrid = document.getElementById('product-grid');
  console.log(data);
  data.forEach(element => {

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

    ///add to info
    let price = document.createElement('div');
    price.classList.add('product-price');

    let CurrPrice = document.createElement('span');
    CurrPrice.classList.add('current-price');
    CurrPrice.textContent='$'+ element.price;
    price.appendChild(CurrPrice);

    let OrgPrice = document.createElement('span');
    OrgPrice.classList.add('original-price');
    OrgPrice.textContent='$' + +element.price+.10 * +element.price ;
    price.appendChild(OrgPrice);

    info.appendChild(price);

    // add to info 
    let cart = document.createElement('button')
    cart.classList.add('add-to-cart');
    cart.classList.add('js-add-to-cart');
    cart.setAttribute('data-product-id',`${element.id}`)
    let cartIcon = document.createElement('i');
    cartIcon.classList.add('fas');
    cartIcon.classList.add('fa-shopping-cart');


    cart.appendChild(cartIcon);
    cart.textContent='Add to Cart';
    info.appendChild(cart);

    card.appendChild(info);
    productGrid.appendChild(card);
  })

  document.querySelectorAll('.js-add-to-cart').forEach((cartBtn)=>{
    cartBtn.addEventListener('click',function(){
      let productId =cartBtn.dataset.productId;
      // console.log(`${productId}`);

      data.forEach((element)=>{
        if(element.id == productId){
          addToCard(element);
        }
      })
      console.log(cart);
    })
  })
}catch(er){
  console.log(er);
}
};




getCategory();
getProducts();