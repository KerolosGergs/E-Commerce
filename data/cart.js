
export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart =[];
}

export function saveChanges(item){
    localStorage.setItem('cart',JSON.stringify(cart))
}


export function addToCard(product){
  const index = cart.findIndex(element=> product.id == element.id);
  if(index ==-1){
     cart.push({
            id:product.id,
            name:product.title,
            image:product.images[0],
            price:product.price,
            quantity:1
          })}
          else {
            cart[index].quantity++;
          }
  saveChanges();
}