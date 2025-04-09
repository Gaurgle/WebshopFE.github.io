function renderCart() {
    const cart = getCart();
    const container = document.getElementById('cart-container');
    let output = '';
    let totalSum = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalSum += itemTotal;

        output += `
        <div class="cart-item d-flex align-items-center justify-content-between my-3">
            <div class="d-flex align-items-center">
                <img src="${item.image}" alt="${item.title}" width="50" class="me-2">
                    <div>
                    <div>${item.title}</div>
                    <div>${item.quantity} x €${item.price.toFixed(2)} = ${itemTotal.toFixed(2)}</div>
                    </div>
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-primary" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="btn btn-sm btn-outline-primary" onclick="updateQuantity(${item.id}, -1)">-</button>
                </div>
            </div>
            `;
    });

    output += `<div class="cart-total my-3"><strong>Total: €${totalSum.toFixed(2)}</strong></div>`;
    container.innerHTML = output;
}