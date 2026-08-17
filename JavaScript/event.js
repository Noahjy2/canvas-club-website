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

        /*
         * Convert the object into a string and save it
         * in sessionStorage.
         */
        sessionStorage.setItem(
            "eventRegistration",
            JSON.stringify(registration)
        );

        alert("Event registration has been saved for this session.");

    });


    /*
     * Retrieve previously saved registration data
     * when the page is opened again during the
     * same browser session.
     */
    const savedRegistration =
        sessionStorage.getItem("eventRegistration");

    if (savedRegistration) {

        const registration = JSON.parse(savedRegistration);

        document.getElementById("name").value =
            registration.name;

        document.getElementById("email").value =
            registration.email;

        document.getElementById("event").value =
            registration.selectedEvent;

        document.getElementById("comments").value =
            registration.comments;
    }

});
