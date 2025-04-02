import { cart, deleteCartItem } from "../data/cart.js";
import { calculateProductPrice } from "./utils/featuresUtils.js";

function displayCartItems() {
    let cartItemsHtml = '';

    cart.forEach(item => {
        cartItemsHtml += `
        <tr class="js-product-${item.id}">
            <td>
                <div class="product">
                    <div class="image-container" data-product-id="${item.id}">
                        <img class="product-img" src="${item.image}" alt="${item.name}">
                        <div class="overlay-hover">✖</div>
                    </div>
                    <span>${item.name}</span>
                </div>
            </td>
            <td>$${item.price}</td>
            <td>
                <div class="quantity-control">
                    <button class="decrese-quantity" data-product-id="${item.id}">-</button>
                    <input class="cart-quantity js-cart-quantity-${item.id}" type="text" value="${item.quantity}">
                    <button class="increase-quantity" data-product-id="${item.id}">+</button>
                </div>
            </td>
            <td class="js-total-price-${item.id}">$${calculateProductPrice(item.price, item.quantity)}</td>
        </tr>`;
    });

    document.querySelector('.table-body').innerHTML = cartItemsHtml;

    // Attach event listeners AFTER inserting elements
    document.querySelectorAll('.image-container').forEach(img => {
        img.addEventListener('click', function () {
            let productId = img.dataset.productId;
            deleteCartItem(productId);
            document.querySelector(`.js-product-${productId}`).remove();
        });
    });

    document.querySelectorAll('.decrese-quantity').forEach(decreseBtn => {
        decreseBtn.addEventListener('click', function () {
            let productId = decreseBtn.dataset.productId;
            let quantityInput = document.querySelector(`.js-cart-quantity-${productId}`);
            let newQuantity = Math.max(1, parseInt(quantityInput.value) - 1);
            quantityInput.value = newQuantity;
            updateTotalPrice(productId);
        });
    });

    document.querySelectorAll('.increase-quantity').forEach(increaseBtn => {
        increaseBtn.addEventListener('click', function () {
            let productId = increaseBtn.dataset.productId;
            let quantityInput = document.querySelector(`.js-cart-quantity-${productId}`);
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateTotalPrice(productId);
        });
    });
}

// Function to update total price when quantity changes
function updateTotalPrice(productId) {
    let item = cart.find(product => product.id == productId);
    let quantityInput = document.querySelector(`.js-cart-quantity-${productId}`);
    let newQuantity = parseInt(quantityInput.value);
    let totalPriceElement = document.querySelector(`.js-total-price-${productId}`);
    totalPriceElement.textContent = `$${calculateProductPrice(item.price, newQuantity)}`;
}

// Ensure displayCartItems runs only after the DOM is loaded
document.addEventListener('DOMContentLoaded', displayCartItems);
