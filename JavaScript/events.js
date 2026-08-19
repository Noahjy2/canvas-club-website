document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("eventRegistrationForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const registration = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            selectedEvent: document.getElementById("event").value,
            comments: document.getElementById("comments").value
        };

        // Save registration information in sessionStorage
        sessionStorage.setItem(
            "eventRegistration",
            JSON.stringify(registration)
        );

        // Display confirmation message
        alert("Event registration has been submitted successfully.");

        // Clear all form fields
        form.reset();

    });


    // Navigation menu
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    if (navToggle && navLinks) {

        navToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("open");

            navToggle.setAttribute("aria-expanded", isOpen);

        });

    }

});