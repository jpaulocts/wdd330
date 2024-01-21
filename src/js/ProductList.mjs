import { renderListWithTemplate } from "./utils.mjs";

export function productCardTemplate(product){

    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`   
}

export default class ProductList{
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
     
    }

    async init() {

        const list = await this.dataSource.getData();
        const listAdjusted = list.filter((item)=> item.Id === "880RR" || item.Id === "985RF" || item.Id === "985PR" || item.Id === "344YJ")
        this.renderList(listAdjusted);
    }

    renderList(list){
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    filterSelection(list){

        const filteredList = list.filter((item)=> item.Id === "880RR" || item.Id === "985RF" || item.Id === "985PR" || item.Id === "344YJ");
        return filteredList
    }
}



