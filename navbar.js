async function populateNavbar() {
    const output = `
    <nav class="navbar sticky-top navbar-expand-sm shadow-sm opacity-1">
        <div class="container my-3">
            <a href="#" class="navbar-brand mb-0 h1">Andreas Webshop</a>
            <button type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" class="navbar-toggler"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto d-flex align-items-center">
                    <li class="nav-item"><a href="index.html" class="nav-link active">Home</a></li>
                    <li class="nav-item"><a href="#" class="nav-link" data-bs-toggle="modal" data-bs-target="#aboutModal">About</a></li>
                    <li class="nav-item"><a href="index.html" class="nav-link" onclick="scrollToBottom()">Contact</a></li>
                    <li><button id="darkModeToggle" class="btn btn-toolbar px-2">Dark</button></li>
                    <li class="nav-item">
                        <div class="btn btn-sm cursor-pointer position-relative" onclick="window.location.href='form.html'">
                            <img src="Assets/img/nav/cart-shopping-solid.svg" alt="bin" height="20" draggable="true" class="cursor-pointer">
                            <span id="cart-counter" class="position-absolute translate-middle badge rounded-pill pill-bg-custom">0</span>
                        </div>
                    </li>
                    <li class="nav-item ms-5 mt-0 align-items-end position-relative">
                      <button id="currencyToggleBtn" class="btn btn-sm text-secondary fw-normal">
                        Currency: <span id="currencyLabel">EUR</span>
                      </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`;

    document.body.insertAdjacentHTML('afterbegin', output);

    const currencyToggleBtn = document.getElementById('currencyToggleBtn');
    const currencyLabel = document.getElementById('currencyLabel');

    const current = getCurrencyPreference();
    currencyLabel.textContent = current;

    currencyToggleBtn.addEventListener('click', () => {
        const newCurrency = getCurrencyPreference() === 'EUR' ? 'SEK' : 'EUR';
        setCurrencyPreference(newCurrency);
        currencyLabel.textContent = newCurrency;
        renderCart();
    });

    document.querySelectorAll('.currency-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const selected = option.getAttribute('data-currency');
            setCurrencyPreference(selected);
            currencyLabel.textContent = selected;
            dropdownMenu.classList.add('hidden');
            renderCart();
        });
    });

    document.addEventListener('click', () => {
        dropdownMenu.classList.add('hidden');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateNavbar().then(() => {
        if (document.getElementById('cart-items-content')) {
            renderCart();
            updateCartCounter();
        }
    });
});