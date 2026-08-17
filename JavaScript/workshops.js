document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("workshopRegistrationForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const registration = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            selectedWorkshop: document.getElementById("workshop").value,
            comments: document.getElementById("comments").value
        };

        /*
         * Convert the object into a string and save it
         * in sessionStorage.
         */
        sessionStorage.setItem(
            "workshopRegistration",
            JSON.stringify(registration)
        );

        alert("Workshop registration has been saved for this session.");

    });


    /*
     * Retrieve previously saved registration data
     * when the page is opened again during the
     * same browser session.
     */
    const savedRegistration =
        sessionStorage.getItem("workshopRegistration");

    if (savedRegistration) {

        const registration = JSON.parse(savedRegistration);

        document.getElementById("name").value =
            registration.name;

        document.getElementById("email").value =
            registration.email;

        document.getElementById("workshop").value =
            registration.selectedWorkshop;

        document.getElementById("comments").value =
            registration.comments;
    }

});
