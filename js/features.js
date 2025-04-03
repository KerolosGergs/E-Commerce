import { cart, deleteCartItem,calculateTotalPrice,saveChanges} from "../data/cart.js";
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
            displayTotalPrice();
        });
    });

    document.querySelectorAll('.decrese-quantity').forEach(decreseBtn => {
        decreseBtn.addEventListener('click', function () {
            let productId = decreseBtn.dataset.productId;
            let quantityInput = document.querySelector(`.js-cart-quantity-${productId}`);
            let newQuantity = Math.max(1, parseInt(quantityInput.value) - 1);
            quantityInput.value = newQuantity;
            updateItemTotalPrice(productId);
        });
    });

    document.querySelectorAll('.increase-quantity').forEach(increaseBtn => {
        increaseBtn.addEventListener('click', function () {
            let productId = increaseBtn.dataset.productId;
            let quantityInput = document.querySelector(`.js-cart-quantity-${productId}`);
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateItemTotalPrice(productId);
        });
    });
}

// Function to update total price when quantity changes
function updateItemTotalPrice(productId) {
    let item = cart.find(product => product.id == productId);
    let quantityInput = document.querySelector(`.js-cart-quantity-${productId}`);
    let newQuantity = parseInt(quantityInput.value);
    let totalPriceElement = document.querySelector(`.js-total-price-${productId}`);
    totalPriceElement.textContent = `$${calculateProductPrice(item.price, newQuantity)}`;
}

// Ensure displayCartItems runs only after the DOM is loaded
document.addEventListener('DOMContentLoaded', displayCartItems);
document.addEventListener('DOMContentLoaded', displayTotalPrice);

let total =0;
function displayTotalPrice(){
    total=calculateTotalPrice();
    document.querySelector('.subtotal-price').textContent = `$${total.toFixed(2)}`;
    document.querySelector('.total-price').textContent = `$${total.toFixed(2)}`;
}


document.querySelector('.update-cart').addEventListener('click',function(){
    cart.forEach(cartItem =>{
        let newQuantity = Number(document.querySelector(`.js-cart-quantity-${cartItem.id}`).value)
        if(!isNaN(newQuantity)&&(newQuantity<=50 && newQuantity >0)){
            cartItem.quantity =newQuantity;
            saveChanges();
            displayTotalPrice();
        }
        else{
            alert("Please Enter Number From 1 to 50!")   
        }
    })
})

let couponCodes = ['amr10','rashed15']
localStorage.setItem('couponCodes',JSON.stringify(couponCodes))

document.querySelector('.apply-coupon').addEventListener('click',function(){
    let inputCode = document.querySelector('.input-coupon').value;
    let vaildCoupon = couponCodes.find(coupon => coupon === inputCode);
    total = calculateTotalPrice();
    if(vaildCoupon&&total>0){
            total = total - total*Number(inputCode.slice(-2))/100;
            document.querySelector('.subtotal-price').textContent = `$${total.toFixed(2)}`;
            document.querySelector('.total-price').textContent = `$${total.toFixed(2)}`;
            document.querySelector('.coupon-error').style.display = `none`;

    }
    else{
        document.querySelector('.coupon-error').style.display = `block`;
    }
    
})