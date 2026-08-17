/* =====================================================
   CANVAS
   GLOBAL JAVASCRIPT
===================================================== */

$(document).ready(function () {


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    $("#menuToggle").click(function () {

        $("#navLinks").toggleClass("open");

    });


    $("#navLinks a").click(function () {

        $("#navLinks").removeClass("open");

    });



    /* =====================================================
       JOIN PAGE
    ===================================================== */

    if ($("#membershipForm").length > 0) {


        /* =============================================
           INTEREST SELECTION
        ============================================= */

        $('input[name="interest"]').change(function () {

            updateCreativeProfile();

            updateJoinProgress();

        });


        function updateCreativeProfile() {

            let selected = [];


            $('input[name="interest"]:checked').each(function () {

                selected.push($(this).val());

            });


            let container =
                $("#selectedInterests");


            if (selected.length === 0) {

                container.html(`
                    <span>
                        Select an interest above
                    </span>
                `);

                return;

            }


            container.empty();


            selected.forEach(function (interest) {

                container.append(`
                    <span>
                        ${interest}
                    </span>
                `);

            });

        }



        /* =============================================
           CHARACTER COUNTER
        ============================================= */

        $("#reason").on("input", function () {

            let length =
                $(this).val().length;


            $("#characterCount")
                .text(length);


            updateJoinProgress();

        });



        /* =============================================
           PROGRESS
        ============================================= */

        function updateJoinProgress() {

            let progress = 0;


            if (
                $("#name").val().trim() !== "" &&
                $("#studentID").val().trim() !== "" &&
                $("#email").val().trim() !== "" &&
                $("#programme").val() !== "" &&
                $("#year").val() !== ""
            ) {

                progress = 33;

            }


            if (
                $('input[name="interest"]:checked').length > 0
            ) {

                progress =
                    Math.max(progress, 66);

            }


            if (
                $("#reason").val().trim() !== ""
            ) {

                progress = 100;

            }


            $("#progressBar")
                .css(
                    "width",
                    progress + "%"
                );


            $(".progress-labels span")
                .removeClass("active");


            if (progress >= 100) {

                $(".progress-labels span")
                    .eq(2)
                    .addClass("active");

            }

            else if (progress >= 66) {

                $(".progress-labels span")
                    .eq(1)
                    .addClass("active");

            }

            else {

                $(".progress-labels span")
                    .eq(0)
                    .addClass("active");

            }

        }



        $("#membershipForm input, #membershipForm select, #membershipForm textarea")
            .on("input change", function () {

                updateJoinProgress();

            });



        /* =============================================
           JOIN FORM SUBMIT
        ============================================= */

        $("#membershipForm").submit(function (event) {

            event.preventDefault();


            let selectedInterests =
                $('input[name="interest"]:checked');


            if (selectedInterests.length === 0) {

                $("#joinMessage")
                    .text(
                        "Please select at least one creative interest."
                    )
                    .css({
                        "display": "block"
                    });


                $("html, body").animate({

                    scrollTop:
                        $(".interest-grid")
                            .offset()
                            .top - 120

                }, 500);


                return;

            }


            let membershipData = {

                name:
                    $("#name").val().trim(),

                studentID:
                    $("#studentID").val().trim(),

                email:
                    $("#email").val().trim(),

                programme:
                    $("#programme").val(),

                year:
                    $("#year").val(),

                interests: [],

                reason:
                    $("#reason").val().trim(),

                submittedAt:
                    new Date().toLocaleString()

            };


            selectedInterests.each(function () {

                membershipData.interests.push(
                    $(this).val()
                );

            });


            /*
             * Membership data saved using localStorage.
             */

            localStorage.setItem(
                "canvasMembership",
                JSON.stringify(membershipData)
            );


            let button =
                $("#joinButton");


            button.prop(
                "disabled",
                true
            );


            button.find(".button-text")
                .text(
                    "CREATING PROFILE..."
                );


            button.find(".button-arrow")
                .text("✓");


            setTimeout(function () {

                $("#successPopup")
                    .addClass("show");


                button.prop(
                    "disabled",
                    false
                );


                button.find(".button-text")
                    .text(
                        "JOIN CANVAS"
                    );


                button.find(".button-arrow")
                    .text("→");


            }, 1000);

        });



        /* =============================================
           CLOSE JOIN POPUP
        ============================================= */

        $("#closePopup").click(function () {

            $("#successPopup")
                .removeClass("show");


            $("#membershipForm")[0].reset();


            $("#selectedInterests").html(`
                <span>
                    Select an interest above
                </span>
            `);


            $("#characterCount")
                .text("0");


            $("#progressBar")
                .css("width", "0%");


            $(".progress-labels span")
                .removeClass("active");


            $(".progress-labels span")
                .first()
                .addClass("active");


            $("#joinMessage")
                .hide()
                .text("");

        });



        /* =============================================
           CLOSE POPUP OUTSIDE
        ============================================= */

        $("#successPopup").click(function (event) {

            if (event.target === this) {

                $(this).removeClass("show");

            }

        });


        updateJoinProgress();

    }





    /* =====================================================
       CONTACT PAGE
    ===================================================== */

    if ($("#contactForm").length > 0) {


        /* =============================================
           MESSAGE CHARACTER COUNTER
        ============================================= */

        $("#message").on("input", function () {

            $("#messageCount")
                .text(
                    $(this).val().length
                );

        });



        /* =============================================
           CONTACT FORM
        ============================================= */

        $("#contactForm").on("submit", function (event) {

            event.preventDefault();


            let name =
                $("#contactName")
                    .val()
                    .trim();


            let email =
                $("#contactEmail")
                    .val()
                    .trim();


            let subject =
                $("#subject")
                    .val();


            let message =
                $("#message")
                    .val()
                    .trim();


            if (
                name === "" ||
                email === "" ||
                subject === "" ||
                message === ""
            ) {

                $("#contactMessage")
                    .text(
                        "Please complete all fields before sending."
                    )
                    .show();

                return;

            }


            let button =
                $("#sendMessageButton");


            button.prop(
                "disabled",
                true
            );


            button.find("span:first")
                .text(
                    "SENDING..."
                );


            button.find("span:last")
                .text(
                    "..."
                );


            setTimeout(function () {

                $("#contactMessage")
                    .text(
                        "Thank you, " +
                        name +
                        ". Your message has been received."
                    )
                    .show();


                button.prop(
                    "disabled",
                    false
                );


                button.find("span:first")
                    .text(
                        "SEND MESSAGE"
                    );


                button.find("span:last")
                    .text(
                        "→"
                    );


                $("#contactForm")[0]
                    .reset();


                $("#messageCount")
                    .text("0");


            }, 1000);

        });



        /* =============================================
           REST API BUTTON
        ============================================= */

        $("#loadResources").on("click", function () {

            console.log(
                "REST API BUTTON CLICKED"
            );


            loadAnimationResources();

        });



        /* =============================================
           REST API FUNCTION
           
           API:
           Open-Meteo

           METHOD:
           GET

           RESPONSE:
           JSON
        ============================================= */

        function loadAnimationResources() {

            console.log(
                "STARTING REST API REQUEST"
            );


            /* -----------------------------------------
               SHOW LOADING
            ----------------------------------------- */

            $("#apiLoading")
                .show();


            $("#apiError")
                .hide()
                .text("");


            $("#resourceContainer")
                .empty();



            /* -----------------------------------------
               API URL

               Kampar, Perak, Malaysia
            ----------------------------------------- */

            const apiURL =
                "https://api.open-meteo.com/v1/forecast" +
                "?latitude=4.3250" +
                "&longitude=101.1500" +
                "&current=temperature_2m" +
                ",relative_humidity_2m" +
                ",wind_speed_10m" +
                ",weather_code" +
                ",is_day" +
                "&temperature_unit=celsius" +
                "&wind_speed_unit=kmh" +
                "&timezone=Asia%2FSingapore";


            console.log(
                "API URL:"
            );


            console.log(
                apiURL
            );



            /* -----------------------------------------
               SEND GET REQUEST
            ----------------------------------------- */

            fetch(apiURL)

                .then(function (response) {

                    console.log(
                        "HTTP STATUS:",
                        response.status
                    );


                    if (!response.ok) {

                        throw new Error(
                            "HTTP error " +
                            response.status
                        );

                    }


                    return response.json();

                })



                /* -------------------------------------
                   RECEIVE JSON DATA
                -------------------------------------- */

                .then(function (data) {

                    console.log(
                        "REST API RESPONSE:",
                        data
                    );


                    /* ---------------------------------
                       HIDE LOADING
                    ---------------------------------- */

                    $("#apiLoading")
                        .hide();


                    /* ---------------------------------
                       CHECK RESPONSE
                    ---------------------------------- */

                    if (
                        !data ||
                        !data.current
                    ) {

                        showAPIError(
                            "No current data was returned by the REST API."
                        );

                        return;

                    }



                    /* ---------------------------------
                       EXTRACT DATA
                    ---------------------------------- */

                    const current =
                        data.current;


                    const temperature =
                        current.temperature_2m;


                    const humidity =
                        current.relative_humidity_2m;


                    const windSpeed =
                        current.wind_speed_10m;


                    const weatherCode =
                        current.weather_code;


                    const isDay =
                        current.is_day;



                    /* ---------------------------------
                       WEATHER DESCRIPTION
                    ---------------------------------- */

                    const weather =
                        getWeatherDescription(
                            weatherCode
                        );



                    /* ---------------------------------
                       DAY / NIGHT
                    ---------------------------------- */

                    const dayStatus =
                        isDay === 1
                            ? "DAY"
                            : "NIGHT";



                    /* ---------------------------------
                       CREATE RESULT CARD
                    ---------------------------------- */

                    const card = `

                        <div class="col-12">

                            <div class="resource-card">

                                <div class="resource-number">

                                    CANVAS // LIVE API

                                </div>


                                <h3>

                                    CREATIVE SPACE
                                    CONDITIONS

                                </h3>


                                <p>

                                    <strong>
                                        Temperature:
                                    </strong>

                                    ${temperature} °C

                                </p>


                                <p>

                                    <strong>
                                        Humidity:
                                    </strong>

                                    ${humidity} %

                                </p>


                                <p>

                                    <strong>
                                        Wind Speed:
                                    </strong>

                                    ${windSpeed} km/h

                                </p>


                                <p>

                                    <strong>
                                        Weather:
                                    </strong>

                                    ${weather}

                                </p>


                                <p>

                                    <strong>
                                        Time:
                                    </strong>

                                    ${dayStatus}

                                </p>


                                <span class="resource-type">

                                    REST API
                                    •
                                    GET
                                    •
                                    JSON

                                </span>


                            </div>

                        </div>

                    `;



                    /* ---------------------------------
                       DISPLAY RESULT
                    ---------------------------------- */

                    $("#resourceContainer")
                        .html(card);


                    console.log(
                        "API DATA DISPLAYED"
                    );

                })



                /* -------------------------------------
                   ERROR
                -------------------------------------- */

                .catch(function (error) {

                    console.error(
                        "REST API ERROR:",
                        error
                    );


                    $("#apiLoading")
                        .hide();


                    showAPIError(
                        "Unable to connect to the REST API. Please check your internet connection and try again."
                    );

                });

        }



        /* =============================================
           API ERROR
        ============================================= */

        function showAPIError(message) {

            $("#apiError")
                .text(message)
                .show();

        }



        /* =============================================
           WEATHER CODE
        ============================================= */

        function getWeatherDescription(code) {

            switch (code) {

                case 0:
                    return "CLEAR SKY";


                case 1:
                    return "MAINLY CLEAR";


                case 2:
                    return "PARTLY CLOUDY";


                case 3:
                    return "OVERCAST";


                case 45:
                case 48:
                    return "FOG";


                case 51:
                case 53:
                case 55:
                    return "DRIZZLE";


                case 61:
                case 63:
                case 65:
                    return "RAIN";


                case 71:
                case 73:
                case 75:
                    return "SNOW";


                case 80:
                case 81:
                case 82:
                    return "RAIN SHOWERS";


                case 95:
                    return "THUNDERSTORM";


                case 96:
                case 99:
                    return "THUNDERSTORM WITH HAIL";


                default:
                    return "UNKNOWN WEATHER";

            }

        }

    }

});