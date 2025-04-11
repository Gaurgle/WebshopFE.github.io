// js/cart.js

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
        cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
    // Optionally, show a confirmation, update a cart icon, etc.
    console.log("Added to cart:", product);
}

// Update the quantity for a given product.
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
}

// Remove a product from the cart.
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
    updateCartImage();
}

// Clear the entire cart.
function clearCart() {
    localStorage.removeItem('cart');
    renderCart();
    updateCartImage()
}

// Render cart contents to the page (used on cart.html)
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
          <!-- Text container: fixed max-width with ellipsis if necessary -->
          <div class="flex-grow-1 me-3" style="max-width: 70%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            <strong>${getFirstFiveWords(item.title)}</strong><br>
            <small>${item.quantity} x €${item.price.toFixed(2)} = €${itemTotal.toFixed(2)}</small>
          </div>
          <!-- Button container: fixed width so buttons always stay aligned -->
          <div class="flex-shrink-0 mb-4">
            <button class="btn btn-outline-secondary btn-sm me-1" onclick="updateQuantity(${item.id}, 1)">+</button>
            <button class="btn btn-outline-secondary btn-sm me-1" onclick="updateQuantity(${item.id}, -1)">-</button>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
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

// When the cart page loads, render the cart.
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('cart-items-content')) {
        renderCart();
    }
});
