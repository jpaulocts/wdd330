import { renderListWithTemplate } from "./utils.mjs";

export function productCardTemplate(product){

    const recipeLink = product._links.self.href;

    const startIndex = recipeLink.indexOf("v2") + 3;
    
    const endIndex = recipeLink.indexOf("?");

    const id = recipeLink.substring(startIndex,endIndex);

    return `<li class="product-card">
    <a href="/wdd330/project-jpct/recipe_page/index.html?recipe=${id}">
      <img src="${product.recipe.image}" alt="Image of ${product.recipe.label}">
      <h2 class="card__name">${product.recipe.label}</h2>
      <h3 class="card__brand" >Cuisine Type:${product.recipe.cuisineType}</h3>
      <p class="product-card__cal"> Calories: ${product.recipe.calories.toFixed(2)}</p>
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

        const list = await this.dataSource.getData(this.category);
        document.querySelector(".title").innerHTML = `: ${capitalize(this.category)}`;
        this.renderList(list.hits);
        
        
      
    }

    renderList(list){
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

}

function capitalize(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }



    

