// Retrieve the cart from localStorage, or return an empty array if it doesn't exist.
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save the cart to localStorage.
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add a product to the cart, or update quantity if it already exists.
function addToCart(product) {
    const cart = getCart();
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    saveCart(cart);
    updateCartCounter();
}

// Update the quantity for a product.
function updateQuantity(productId, change) {
    let cart = getCart();
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart(cart);
        }
    }
    renderCart();
    updateCartCounter();
}

// Remove a product from the cart.
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
    updateCartImage();
    updateCartCounter();
}

// Clear the entire cart.
function clearCart() {
    localStorage.removeItem('cart');
    renderCart();
    updateCartImage();
    updateCartCounter();
}

function renderCart() {
    const cart = getCart();
    let itemsHTML = '';
    let total = 0;

    if (cart.length === 0) {
        itemsHTML = `<p>No items in cart.</p>`;
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemsHTML += `
        <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="flex-grow-1 me-3" style="max-width: 70%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                <strong>${getFirstFiveWords(item.title)}</strong><br>
                <small>${item.quantity} x €${item.price.toFixed(2)} = €${itemTotal.toFixed(2)}</small>
              </div>
                  <div class="flex-shrink-0 mb-1 d-flex translate-end">
                    <button class="btn btn-outline-secondary btn-sm btn-plus" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <div class="btn border-black btn-sm btn-counter">${item.quantity}</div>
                    <button class="btn btn-outline-secondary btn-sm btn-minus" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <div class="btn btn-sm scale-on-hover cursor-pointer">
                        <img src="Assets/img/nav/trash-can-solid.svg" alt="bin" height="20" draggable="false" onclick="removeFromCart(${item.id})">
                    </div>
              </div>
        </div>
      `;
        });
    }
    const itemsEl = document.getElementById('cart-items-content');
    if (itemsEl) {
        itemsEl.innerHTML = itemsHTML;
    }
    const totalsEl = document.getElementById('cart-totals-content');
    if (totalsEl) {
        totalsEl.innerHTML = `<p>Total: €${total.toFixed(2)}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items-content')) {
        renderCart();
        updateCartCounter();
    }
});

function updateCartCounter() {
    const cart = getCart(); // Assumes getCart() returns an array of cart items
    let totalItems = 0;

    // Sum up the quantity of each item
    cart.forEach(item => {
        totalItems += item.quantity;
    });

    // Update the cart-counter element, if it exists
    const counterEl = document.getElementById('cart-counter');
    if (counterEl) {
        counterEl.textContent = totalItems;
    }
}