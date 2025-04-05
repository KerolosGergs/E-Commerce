import { cart, addToCard } from "../data/cart.js";
import { getCategory, getProducts, fetchProducts } from "../data/products.js";
import { showAlert } from "./components.js";

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls

document
  .getElementsByClassName("prev")[0]
  ?.addEventListener("click", function () {
    showSlides((slideIndex -= 1));
  });
document
  .getElementsByClassName("next")[0]
  ?.addEventListener("click", function () {
    showSlides((slideIndex += 1));
  });

Array.from(document.getElementsByClassName("dot")).forEach((dot, index) => {
  dot.addEventListener("click", function () {
    showSlides((slideIndex = index + 1));
  });
});

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  if (slides.length > 0 && slides[slideIndex - 1]) {
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }

  // slides[slideIndex-1].style.display = "block";
}

document.getElementById("darkModeToggle").addEventListener("click", darkMode);

export function darkMode() {
  document.body.classList.toggle("dark-mode");
  // document.rootElement.
}

// Favourite button to Card
export function addFavouriteBtn() {
  document.querySelectorAll(".favorite-btn").forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("active");
      const icon = this.querySelector("i");
      if (this.classList.contains("active")) {
        icon.classList.replace("far", "fas");
      } else {
        icon.classList.replace("fas", "far");
      }
    });
  });
}

//Search Bar
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-box input");

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();

    const productCards = document.querySelectorAll(
      "#product-grid .product-card"
    );

    productCards.forEach((card) => {
      const title =
        card.querySelector(".product-title")?.textContent.toLowerCase() || "";
      const description =
        card.querySelector(".product-description")?.textContent.toLowerCase() ||
        "";

      const isMatch =
        title.includes(searchTerm) || description.includes(searchTerm);

      card.style.display = isMatch ? "block" : "none";
    });
  });
});

// Categories active to Button on click
export function addActiveClass() {
  document.querySelectorAll(".category-btn").forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelectorAll(".category-btn").forEach((btn) => {
        btn.classList.remove("active");
      });
      this.classList.add("active");
    });

    button.addEventListener("click", function () {
      getProducts(this.textContent);
    });
  });
}
function addActiveBtn(name) {
  document.querySelectorAll(".category-btn").forEach((button) => {
    if (button.textContent != name) {
      button.classList.remove("active");
    } else {
      button.classList.add("active");
    }
  });

  getProducts(name);
}

export function addCategoryBtn(element) {
  let categories = document.getElementById("categories");
  let button = document.createElement("button");
  button.textContent = element;
  button.classList.add("category-btn");

  categories.appendChild(button);
}

export function addcard(element) {
  let productGrid = document.getElementById("product-grid");

  let card = document.createElement("div");
  card.classList.add("product-card");

  // Add to card
  let button = document.createElement("button");
  button.classList.add("favorite-btn");
  let icon = document.createElement("i");
  icon.classList.add(`fas`);
  icon.classList.add(`fa-heart`);

  button.appendChild(icon);
  card.appendChild(button);

  // Add To card
  let image = document.createElement("img");
  image.setAttribute("src", element.image);
  image.classList.add("product-img");
  card.appendChild(image);

  //Add to card
  let info = document.createElement("div");
  info.classList.add("product-info");

  let title = document.createElement("h3");
  title.classList.add("product-title");
  title.textContent = element.title;
  info.appendChild(title);

  let Type = document.createElement("span");
  Type.classList.add("product-category");
  Type.textContent = element.category.name;
  info.appendChild(Type);

  // add to info priceQuantity
  let priceQuantity = document.createElement("div");
  priceQuantity.classList.add("price-quantity");

  ///add to priceQuantity  (Product Price)
  let price = document.createElement("div");
  price.classList.add("product-price");

  let CurrPrice = document.createElement("span");
  CurrPrice.classList.add("current-price");
  CurrPrice.textContent = "$" + element.price;
  price.appendChild(CurrPrice);

  // add to info Quantity Selector
  let quantity = document.createElement("div");
  quantity.classList.add("quantity-selector");

  let minus = document.createElement("button");
  minus.textContent = "-";
  minus.classList.add("quantity-btn");
  minus.classList.add("minus");

  let input = document.createElement("input");
  input.classList.add("quantity-input");
  input.setAttribute("type", "number");
  input.setAttribute("value", "1");
  input.setAttribute("min", "1");
  input.setAttribute("value-by-id", element.id);

  let plus = document.createElement("button");
  plus.textContent = "+";
  plus.classList.add("quantity-btn");
  plus.classList.add("plus");

  quantity.appendChild(minus);
  quantity.appendChild(input);
  quantity.appendChild(plus);

  priceQuantity.appendChild(price);
  priceQuantity.appendChild(quantity);
  info.appendChild(priceQuantity);

  minus.addEventListener("click", function () {
    if (input.value > 1) {
      input.value -= 1;
    }
  });

  plus.addEventListener("click", function () {
    +input.value++;
  });
  input.addEventListener("input", function () {
    if (isNaN(+input.value) || +input.value < 1) {
      input.value = 1;
    }
  });

  // add to info
  let cart = document.createElement("button");
  cart.classList.add("add-to-cart");
  cart.classList.add("js-add-to-cart");
  cart.setAttribute("id", `${element.id}`);
  let cartIcon = document.createElement("i");
  cartIcon.classList.add("fas");
  cartIcon.classList.add("fa-shopping-cart");
  cart.addEventListener("click", function () {
    debugger;
    addToCard(element, input.value);
    input.value = 1;
    showAlert();
  });

  cart.appendChild(cartIcon);
  cart.textContent = "Add to Cart";
  info.appendChild(cart);

  card.appendChild(info);

  productGrid.appendChild(card);
}

async function CardSection() {
  let cardSection = document.getElementById("cardSection");
  cardSection.innerHTML = "";
  let products = await fetchProducts();

  const groupByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  // Step 2: Pick the first product from each category
  const uniqueCategoryProducts = Object.values(groupByCategory).map(
    (products) => products[0]
  );
  console.log(uniqueCategoryProducts);

  for (let i = 0; i < 4; i++) {
    let product = uniqueCategoryProducts[i];
    const card = document.createElement("div");
    card.className = "card";

    // Create and append the image
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.category;
    img.className = "card-img";
    card.appendChild(img);

    // Create and append the card content
    const cardContent = document.createElement("div");
    cardContent.className = "card-content";

    const title = document.createElement("h3");
    title.className = "card-title";
    title.style.textAlign = "center";
    title.textContent = product.category; // Fallback to 'name' if 'title' doesn't exist
    cardContent.appendChild(title);

    // const category = document.createElement('p');
    // category.className = 'card-category';
    // category.textContent = product.category;
    // cardContent.appendChild(category);

    // const price = document.createElement('p');
    // price.className = 'card-price';

    // const originalPrice = document.createElement('span');
    // originalPrice.className = 'original-price';
    // originalPrice.textContent = `$${product.price}`;
    // price.appendChild(originalPrice);

    // cardContent.appendChild(price);
    card.appendChild(cardContent);

    // Create and append the overlay
    const overlay = document.createElement("div");
    overlay.className = "card-overlay";

    const overlayTitle = document.createElement("h3");
    overlayTitle.className = "overlay-title";
    overlayTitle.textContent = product.category;
    overlay.appendChild(overlayTitle);

    // const overlayPrice = document.createElement('p');
    // overlayPrice.className = 'overlay-price';
    // overlayPrice.textContent = `$${product.price}`;
    // overlay.appendChild(overlayPrice);

    const buyNowLink = document.createElement("a");
    buyNowLink.href = "#shopNow";
    buyNowLink.className = "buy-now";
    buyNowLink.textContent = "Buy Now";
    buyNowLink.addEventListener("click", function () {
      addActiveBtn(product.category);
    });
    overlay.appendChild(buyNowLink);

    card.appendChild(overlay);

    // Append the card to the container
    cardSection.appendChild(card);
  }
}

CardSection();

getCategory();
getProducts();
