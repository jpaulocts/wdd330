import { setLocalStorage, getLocalStorage, alertMessage, totalQuantity} from "./utils.mjs";


function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
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

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.productArray = []
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails("main");
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
  addToCart() {
    this.addProduct(this.product);
    // const currentCart = getLocalStorage("so-cart") || [];
    // currentCart.push(this.product);
    // setLocalStorage("so-cart", currentCart);
   
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
    totalQuantity()

  }
  addProduct(product){
    this.productArray = getLocalStorage("so-cart") || [];
    let currentItem = this.productArray.findIndex((item) => item.Id === product.Id);
    
    if (currentItem === -1) {
      this.productArray.push({
          Id: product.Id,
          Name: product.Name,
          ColorName: product.ColorName,
          Brand: product.Brand,
          Colors: product.Colors,
          Discount: product.Discount,
          Images: product.Images,
          ListPrice: product.ListPrice,
          DescriptionHtmlSimple: product.DescriptionHtmlSimple,
          quantity: 1
      });
  } else {
    this.productArray[currentItem].quantity += 1;

  }
  setLocalStorage("so-cart", this.productArray);
  totalQuantity()

  }


  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}