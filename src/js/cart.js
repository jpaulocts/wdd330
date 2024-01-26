import ShoppingCart from "./ShoppingCart.mjs";
import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";


loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");

cart.renderCartContents();
