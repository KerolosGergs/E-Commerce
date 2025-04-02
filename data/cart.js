
export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart =[];
}

export function saveChanges(item){
    localStorage.setItem('cart',JSON.stringify(cart))
}


export function addToCard(product,quantity){
  const index = cart.findIndex(element=> product.id == element.id);
  if(index ==-1){
     cart.push({
            id:product.id,
            name:product.title,
            image:product.images[0],
            price:product.price,
            quantity:+quantity,
          })}
          else {
            cart[index].quantity+=+quantity;
          }
  saveChanges();
}


export function deleteCartItem(productId){
  let newCart=[];
  cart.forEach(cartItem => {
    if(productId != cartItem.id){
      newCart.push(cartItem)
    }
  });
  cart =newCart;
  saveChanges();

  console.log(cart);
}