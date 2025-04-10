let products = [];


async function populateProducts() {
    await fetchProducts();
    let output = `<div class="row">`;

    for (let i in products) {
        if (i % 4 === 0)
            output = `</div><div class="row">`;

        output += `
            <div class="col-sm-6 col-lg-3 my-3">
                <div class="card h-100 shadow scale-on-hover cursor-pointer rounded-5">
                    <div class="card-body">
                        <div class="position-relative mt-3 card-image-container">
                            <img src="${products[i].image}" alt="${products[i].title}" class="img-fluid">
                        </div>
                        <div ="class ="mt-4 ms-2">
                            <h5 class="products-title">${getFirstFiveWords(products[i].title)}</h5>
                    </div>
                </div>
                    <div class="d-flex justify-content-between align-items-center mx-4 mb-4">
                        <span class="price-text">€${products[i].price.toFixed(2)}</span>
                        <button class="btn btn-custom px-4 py-2 rounded-5" onclick="addToCart(products[${i}])">Add to cart</button>
                    </div>
                </div>
            </div>`
    }

    output += `</div>`;
    document.getElementById('prod-container').innerHTML = output;
}


async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}