let products = [];

function populatePopup() {
    const modalMarkup = `
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content rounded-5">
          <div class="modal-header border-0 mb-0">
            <button type="button" class="btn-close float-end mt-2 me-2" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body mt-0 mb-5 mx-4">
            <div class="row gx-5">
              <div class="col-md-4 my-auto">
                <img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" id="modal-img"
                     class="img-fluid rounded translateY(-50%)" alt="Product image">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h4 class="modal-title" id="modal-title">Modal title</h4>
                  <h5 id="modal-price" class="fw-bold my-3 text-orange">&nbsp;</h5>
                  <p class="card-text" id="modal-desc"></p>
                  
                  <!-- denna behöver existera för att då upp modal -->
                  <a href="#" id="modal-buy" class="btn btn-custom mt-3 px-4 py-2 rounded-5">Buy</a>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalMarkup);
}

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        products = await response.json();
        console.log("Fetched products:", products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

async function populateProducts() {
    await fetchProducts();
    let output = `<div class="row">`;
    for (let i = 0; i < products.length; i++) {
        if (i > 0 && i % 4 === 0) {
            output += `</div><div class="row">`;
        }
        output += `
      <div class="col-sm-6 col-lg-3 my-3">
        <div class="card h-100 shadow scale-on-hover cursor-pointer rounded-5">
          <div class="card-body" data-bs-toggle="modal" data-bs-target="#productModal" onclick="populateProductPopUp(${i})">
            <div class="position-relative mt-3 card-image-container">
              <img src="${products[i].image}" alt="${products[i].title}"
                   class="card-img-top card-image-custom position-absolute top-50 start-50 translate-middle img-fluid w-75 object-fit-contain">
            </div>
            <div class="mt-4 ms-2">
              <h5 class="product-title">${getFirstFiveWords(products[i].title)}</h5>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center mx-4 mb-4">
            <span class="price-text">€${products[i].price.toFixed(2)}</span>
            <button class="btn btn-custom px-4 py-2 rounded-5" onclick="addToCart(products[${i}])">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    `;
    }
    output += `</div>`;
    document.getElementById('prod-container').innerHTML = output;
}

function getFirstFiveWords(text) {
    const words = text.split(" ");
    return words.length > 5 ? words.slice(0, 6).join(" ") + "..." : text;
}

function populateProductPopUp(index) {
    document.getElementById('modal-title').textContent = products[index].title;
    document.getElementById('modal-price').textContent = `€${products[index].price.toFixed(2)}`;
    document.getElementById('modal-desc').textContent = products[index].description;
    document.getElementById('modal-img').src = products[index].image;

    const buyBtn = document.getElementById('modal-buy');
    if (buyBtn) {
        console.log("item bought");
        buyBtn.href = `form.html?title=${encodeURIComponent(products[index].title)}&price=${products[index].price.toFixed(2)}&image=${encodeURIComponent(products[index].image)}`;
        // TODO ändra från encode
    }
}

function addToCart(product) {
    localStorage
    console.log("add to cart: ", product);
    // TODO: implement cart functionality
}

function scrollToBottom(){
    const scrollHeight = document.body.scrollHeight;
    window.scrollTo(0, scrollHeight);
}

document.addEventListener('DOMContentLoaded', function() {
    populatePopup();    // Insert modal markup into DOM.
    populateProducts(); // Create product cards.
});
