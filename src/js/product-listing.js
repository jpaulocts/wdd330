import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParams, getLocalStorage, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const listElements = new ProductList(category, dataSource, element);


listElements.init();

const searchInput = document.querySelector("[data-search]");
const searchForm = document.querySelector("[data-search-form]");


searchForm.addEventListener("submit", (e) =>{
    let searchValue = searchInput.value.toLowerCase();
    if (searchValue) {
        const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"]
        if (categories.includes(searchValue)) {
            window.location.replace("./product-listing/index.html?category=" + searchValue)
        } else {
            alert("We can only search for 'tents', 'backpacks', 'sleeping-bags', 'hammocks'")
        }
    e.preventDefault();

    }


});