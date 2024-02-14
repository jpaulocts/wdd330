const baseURL = "https://api.edamam.com/api/recipes/v2?type=public&app_id=56dbbebe&app_key=%20ee5ca6def606b1f208c6d03cb0929fa6&diet=balanced"

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw {name: 'servicesError', message: data};
  }
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `&mealType=${category}`);
    const data = await convertToJson(response);
    return data;
  }

  async findProductById(id) {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=56dbbebe&app_key=ee5ca6def606b1f208c6d03cb0929fa6%09`);
    const data = await convertToJson(response);
    return data;
  }


  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}
