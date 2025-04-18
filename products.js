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
                  <button class="btn btn-custom mt-3 px-4 py-2 rounded-5" onclick="addToCart(currentModalProduct)">Add to cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalMarkup);
}

let currentModalProduct = null;

// Fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        products = await response.json();
        console.log("Fetched products:", products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Populate product cards on the index page
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

// Helper to return first five words
function getFirstFiveWords(text) {
    const words = text.split(" ");
    return words.length > 5 ? words.slice(0, 6).join(" ") + "..." : text;
}

// Update the modal content based on the clicked product index.
function populateProductPopUp(index) {
    currentModalProduct = products[index];
    document.getElementById('modal-title').textContent = products[index].title;
    document.getElementById('modal-price').textContent = `€${products[index].price.toFixed(2)}`;
    document.getElementById('modal-desc').textContent = products[index].description;
    document.getElementById('modal-img').src = products[index].image;
}

// On DOMContentLoaded, insert the modal and populate products.
document.addEventListener('DOMContentLoaded', function () {
    populatePopup();    // Insert modal markup.
    populateProducts(); // Render product cards.
});

function updateCartImage() {
    const cart = getCart();
    if (cart.length > 0) {
        const firstProduct = cart[0];
        const productImg = document.getElementById('product-img');


        if (cart.length > 0 && productImg) {
            // If there is at least one product, display its image
            productImg.src = cart[0].image;
            productImg.style.display = "block";
            productImg.style.maxWidth = "70%";
            productImg.style.maxHeight = "70%";
        } else if (productImg) {
            productImg.src = "";
            productImg.style.display = "none";
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartImage();
});

function populateCartCarousel() {
    const cart = getCart(); // getCart() returns your cart array
    const carouselInner = document.getElementById('carousel-inner');
    if (!carouselInner) return;

    let carouselItemsHTML = '';
    if (cart.length === 0) {
        // Use a default image if the cart is empty
        carouselItemsHTML = `
            <div class="carousel-item active">
                <img src="default.jpg" class="d-block w-100" style="height:300px; object-fit: contain;" alt="No items in cart">
            </div>
        `;
    } else {
        cart.forEach((item, index) => {
            // The first item must have the "active" class
            carouselItemsHTML += `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${item.image}" class="d-block w-100" style="height:300px; object-fit: contain;" alt="${item.title}">
                </div>
            `;
        });
    }
    carouselInner.innerHTML = carouselItemsHTML;
}

document.addEventListener('DOMContentLoaded', function() {
    populateCartCarousel();
});