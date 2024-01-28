import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");

const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listElements = new ProductList(category, dataSource, element);

listElements.init();
