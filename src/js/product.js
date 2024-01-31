import { setLocalStorage, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { ProductDetails } from "./productDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParams('product'); 
const product = new ProductDetails(productId, dataSource);


// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }


  product.init();


  
