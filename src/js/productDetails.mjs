import {setLocalStorage, getLocalStorage} from "./utils.mjs";


function productDetailsTemplate(product) {
    return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${product.Image}"
        alt="${product.NameWithoutBrand}"
        onerror="this.onerror=null; this.src='../images/tents/the-north-face-alpine-guide-tent-3-person-4-season-in-canary-yellow-high-rise-grey~p~985pr_01~320.jpg';"
      />
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">
      ${product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div></section>`;
  }

export class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {       
    this.product = await this.dataSource.findProductById(this.productId)
    this.renderProductDetails("main")       
    document.getElementById("addToCart")
        .addEventListener("click", this.addProductToCart.bind(this));
    }
    
    addProductToCart = () => {
        const currentCart = getLocalStorage("so-cart") || [];
        currentCart.push(this.product);
        setLocalStorage("so-cart", currentCart);
    }
    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
          "afterBegin",
          productDetailsTemplate(this.product)
        );
      }
   

    
  }
  