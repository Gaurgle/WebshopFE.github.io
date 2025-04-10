async function populateNavbar() {
    let output = `
    <nav class="navbar sticky-top navbar-expand-sm navbar-light bg-white shadow-sm">
    <div class="container my-3">
        <a href="#" class="navbar-brand mb-0 h1">
            Battle Shop
        </a>
        <button type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" class="navbar-toggler"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto d-flex align-items-center">
                <li class="nav-item">
                    <a href="index.html" class="nav-link active">Home</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" data-bs-toggle="modal" data-bs-target="#aboutModal">About</a>
                </li>
                <li class="nav-item">
                    <a href="index.html" class="nav-link" onclick="scrollToBottom()">Contact</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" onclick="window.location.href='cart.html'">Cart</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', output);
}

document.addEventListener('DOMContentLoaded', populateNavbar);


