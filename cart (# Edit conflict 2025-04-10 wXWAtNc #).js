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

    forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        output = `
        <div class="cart-item">
            <img src="${item.img}" alt="${item.title}" width="50">
            <span>${item.title}</span>
            <span>$item.quantity} x €${item.price.toFixed(2)} =  €${itemTotal.toFixed(2)}</span>
            <button onclick="ontimeupdate(${item.id}, 1)">+</button>
            <button onclick="ontimeupdate(${item.id}, -1)">-</button>
            </div>
            `;
    });
    output += `div class="cart-total"><Strong>Total: €`

}