function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function addToCart(product) {
    const cart = getCart();

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    saveCart(cart);
    renderCart();

}

function updateQuantity(productId, change) {
    const cart = getCart();
    const product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity += change;

        if (product.quantity <= 0) {
            removeFromCart(productId)
        } else {
            saveCart(cart)
            renderCart();
        }
    }
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
}

function clearCart() {
    localStorage.removeItem('cart');
    renderCart();
}

// todo fungerar som manuel update cart?
function renderCart() {
    const cart = getCart();
    let output = '';
    let total = 0;

    if (cart.length === 0) {
        itemsHTML = `<p>No items in cart</p>`;
    } else {
        forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemsHTML += `
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <strong>${item.title}</strong><br />
            <small>${item.quantity} x €${item.price.toFixed(2)} = €${itemTotal.toFixed(2)}</small>
          </div>
          <div>
            <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${item.id}, 1)">+</button>
            <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${item.id}, -1)">-</button>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
          </div>
        </div>
            `;
        });
    }
    // output += `div class="cart-total"><Strong>Total: €${total.toFixed(2)}</Strong></div>`;
    document.getElementById('cart-items-content').innerHTML = itemsHTML;
    document.getElementById('cart-totals-content').innerHTML = `<p>Total: €${total.toFixed(2)}</p>`;
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});