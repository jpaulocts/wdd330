export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const parameter = urlParams.get(param);
  return parameter;

}

export function renderListWithTemplate(templateFn, parentElement, list, position="afterbegin", clear=false){

  const htmlStrings = list.map(templateFn);
    
    if (clear) {
      parentElement.innerHTML = "";
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}


export function alertMessage(message, scroll = true, duration = 4000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>❌</span>`;

  alert.style.display = "flex";
  alert.style.background = "navy";
  alert.style.color = "white";
  alert.style.fontWeight = "bold";
  alert.style.margin = "1rem";
  alert.style.justifyContent = "space-between";

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

export function totalQuantity (){      
  const array = getLocalStorage("so-cart");
  const cartAmount = document.getElementById("cart-quantity");
  if (array) {
      cartAmount.textContent = array.map((x) => x.quantity).reduce((x, y) => x + y, 0); 
  } else {
      cartAmount.textContent = 0;
  }
}


export function renderWithTemplate(templateFn, parentElement,  position="afterbegin", clear=false){
    if (clear) {
      parentElement.innerHTML = "";
    }

    parentElement.insertAdjacentHTML(position,templateFn);
    
}

export async function loadTemplate(path) {
  const res = await fetch(path) 
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/project-jpct/partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("/project-jpct/partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement)
  renderWithTemplate(footerTemplate, footerElement);
  
}