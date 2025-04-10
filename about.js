function populateAboutUs() {
    let output = `
    <div class="modal fade" id="aboutModal" tabindex="-1" aria-labelledby="aboutModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content rounded-5">
            <div class="modal-header border-0 mb-0">
                <button type="button" class="btn-close float-end mt-2 me-2" data-bs-dismiss="modal"
                        aria-label="Close"></button>
            </div>
            <div class="modal-body mx-4 mt-0">
                <h1>Welcome to our test webshop!</h1> <br>
                <p>
                    We are five students from Nackademin, working together to develop and refine our skills in web
                    development
                    and
                    e-commerce. This project is part of our learning journey, where we experiment with different
                    technologies,
                    design principles, and functionalities to create a fully functional online store.
                    <br>
                    Our goal is to build a user-friendly and efficient webshop while gaining hands-on experience in
                    coding,
                    UX/UI
                    design, and business logic. This is a test project, so while things may change and evolve, we
                    appreciate any
                    feedback as we continue to improve.
                    <br><br>
                    Thanks for checking out our site!
                    <br>
                </p>
                <div class="mb-4 mt-4">
                    <button class="btn btn-custom px-4 py-2 rounded-5" data-bs-dismiss="modal"
                            aria-label="Close">Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', output);

}

populateAboutUs();