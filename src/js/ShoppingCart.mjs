import { getLocalStorage, totalQuantity } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images ? item.Images.PrimarySmall: item.Images}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.ListPrice * item.quantity}<span>/ea</span></p>
  <div class="product-detail__add">
      <button class="removeItem" data-id="${item.Id}">Remove item</button>
    </div>
</li>`;

  return newItem;


}

// function to show the total in the cart.

 function sumPrice(list) {
  const prices = list.reduce((acumulator, element)=> parseFloat(acumulator) + parseFloat(element.ListPrice),0);
  const htmlElement = document.querySelector(".product-list");
  const card = document.querySelectorAll(".product-list li");
  if (card.length >0){
    const sum = document.createElement("span");
    const buttonCheck = document.createElement("button");
    buttonCheck.setAttribute("type", "button");
    buttonCheck.setAttribute("onclick", "window.location.href='/checkout/index.html';");
    buttonCheck.textContent = "Checkout";
    sum.innerHTML = `Total: $${prices}`;
    htmlElement.appendChild(sum);
    htmlElement.appendChild(buttonCheck);
  } else {

    const message = document.createElement("span");
    message.textContent = "There is no item here";
    htmlElement.appendChild(message);
  }

}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");  
    this.setupRemoveItemListeners(cartItems); 
    sumPrice(cartItems);
    // totalQuantity()

   

  }

  setupRemoveItemListeners(cartItems) {
    const removeButtons = document.querySelectorAll(".removeItem");
    
    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const itemId = event.currentTarget.dataset.id;
        // Remove the item from the array
        const updatedCartItems = cartItems.filter(item => item.Id !== itemId);
        // Update the local storage and re-render the cart
        localStorage.setItem(this.key, JSON.stringify(updatedCartItems));
        this.renderCartContents();
        totalQuantity()
      });
    });
  }

}