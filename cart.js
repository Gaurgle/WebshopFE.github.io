function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
    const cart = getCart();

    const existingCart = cart.find(item => item.id === product.id);

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