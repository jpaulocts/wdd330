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
  const headerTemplate = await loadTemplate("../project-jpct/partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("../project-jpct/partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement)
  renderWithTemplate(footerTemplate, footerElement);
  

}