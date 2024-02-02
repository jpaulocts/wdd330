import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <div class="product-detail__add">
      <button class="removeItem" data-id="${item.Id}">Remove item</button>
    </div>
</li>`;

  return newItem;


}

// function to show the total in the cart.

 function sumPrice(list) {
  const prices = list.reduce((acumulator, element)=> parseFloat(acumulator) + parseFloat(element.FinalPrice),0);
  console.log(prices);
  const htmlElement = document.querySelector(".product-list");
  const sum = document.createElement("span");
  sum.innerHTML = `Total: $${prices}`;
  htmlElement.appendChild(sum);

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
      });
    });
  }

}