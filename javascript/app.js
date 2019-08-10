$(document).ready(function() {
    $("#icons").hide();
    $("#travel-info").hide();
    //Initialize Firebase
    var config = {
        apiKey: "AIzaSyB4VocKAGdBV2MOoa4Tlea2kodPc7mg3HQ",
        authDomain: "travelapp-e9f01.firebaseapp.com",
        databaseURL: "https://travelapp-e9f01.firebaseio.com",
        projectId: "travelapp-e9f01",
        storageBucket: "",
        messagingSenderId: "986030707385",
        appId: "1:986030707385:web:0a04b09b94708972"
    };

    firebase.initializeApp(config);
    var database = firebase.database();

    var place;
    var tuGoApiKey = "xspyubpakcte72gaz2tw6qdd";
    var queryUrl1 = "https://api.tugo.com/v1/travelsafe/countries";

    //tuGo AJAX call to populate drop down country options
    $("#icons").hide();
    $("#travel-info").hide();
    //Initialize Firebase
    var config = {
        apiKey: "AIzaSyB4VocKAGdBV2MOoa4Tlea2kodPc7mg3HQ",
        authDomain: "travelapp-e9f01.firebaseapp.com",
        databaseURL: "https://travelapp-e9f01.firebaseio.com",
        projectId: "travelapp-e9f01",
        storageBucket: "",
        messagingSenderId: "986030707385",
        appId: "1:986030707385:web:0a04b09b94708972"
    };

    firebase.initializeApp(config);
    var database = firebase.database();

    var place;
    var tuGoApiKey = "xspyubpakcte72gaz2tw6qdd";
    var queryUrl1 = "https://api.tugo.com/v1/travelsafe/countries";

    //tuGo AJAX call to populate drop down country options
    $.ajax({
        url: queryUrl1,
        method: "GET",
        headers: {
            "X-Auth-API-Key": "xspyubpakcte72gaz2tw6qdd"
        }
    }).then(function(response) {
        console.log(response);

        var dropdown = document.getElementById("dropDownCountry");
        dropdown.length = 0;

        let defaultOption = document.createElement("option");
        defaultOption.text = "Choose Country";

        dropdown.appendChild(defaultOption);
        dropdown.selectedIndex = 0;

        for (var i = 0; i < response.length; i++) {
            var option = document.createElement("option");
            option.setAttribute("class", "dropdown-item");
            option.text = response[i].englishName;
            option.value = response[i].id;
            dropdown.appendChild(option);
        }
    });


    database
        .ref("countries")
        .once("value")
        .then(function(snapshot) {
            console.log(snapshot.val());
            var array = snapshot.val();
            for (var i = 0; i < array; i++) {
                console.log(array[i].englishName);
                var option = document.createElement("option");
                option.setAttribute("class", "dropdown-item");
                option.text = array[i].englishName;
                option.value = array[i].id;
                dropdown.appendChild(option);
            }
        });

    //Grab the selected country
    $("#submit").on("click", function(event) {
        event.preventDefault();
        $("#travel-info").show();
        $("#info").show();
        $("#dropDownCountry").tooltip();

        var submitted = $("select#dropDownCountry option:checked").val();
        console.log(submitted);
        $.ajax({
            url: queryUrl1,
            method: "GET",
            headers: {
                "X-Auth-API-Key": "xspyubpakcte72gaz2tw6qdd"
            }
        }).then(function(response) {
            console.log(response);

            var dropdown = document.getElementById("dropDownCountry");
            dropdown.length = 0;

            let defaultOption = document.createElement("option");
            defaultOption.text = "Choose Country";

            dropdown.appendChild(defaultOption);
            dropdown.selectedIndex = 0;

            for (var i = 0; i < response.length; i++) {
                var option = document.createElement("option");
                option.setAttribute("class", "dropdown-item");
                option.text = response[i].englishName;
                option.value = response[i].id;
                dropdown.appendChild(option);
            }
        });

        //Firebase population of country list
        database
            .ref("countries")
            .once("value")
            .then(function(snapshot) {
                console.log(snapshot.val());
                var array = snapshot.val();
                for (var i = 0; i < array; i++) {
                    console.log(array[i].englishName);
                    var option = document.createElement("option");
                    option.setAttribute("class", "dropdown-item");
                    option.text = array[i].englishName;
                    option.value = array[i].id;
                    dropdown.appendChild(option);
                }
            });

        //Grab the selected country
        $("#submit").on("click", function(event) {
            event.preventDefault();
            $("#travel-info").show();
            $("#info").show();
            $("#dropDownCountry").tooltip();

            var submitted = $("select#dropDownCountry option:checked").val();
            console.log(submitted);
            $.ajax({
                url: queryUrl1 + "/" + submitted,
                method: "GET",
                headers: {
                    "X-Auth-API-Key": "xspyubpakcte72gaz2tw6qdd"
                }
            }).then(function(response) {
                console.log(response);

                var advisories = response.advisories;

                var country = $(".country").html(
                    "<div col='m6'><h5>Country: " + response.name + "<br><br>"
                );
                console.log(country);

                $(".country").append(country);
                console.log(response.lawAndCulture.lawAndCultureInfo);

                $(".law").html("<div><h6>Law and Culture:</h6>");

                var textLawArray = [];

                for (i = 0; i < response.lawAndCulture.lawAndCultureInfo.length; i++) {
                    textLawArray +=
                        "<p>" +
                        response.lawAndCulture.lawAndCultureInfo[i].category +
                        ": " +
                        response.lawAndCulture.lawAndCultureInfo[i].description +
                        "</p>";
                }
                $(".lawData").html(textLawArray);
                $(".allLaw").accordion({
                    collapsible: true,
                    active: false,
                    animate: 300,
                    icons: false
                });

                $(".travelAD").html(
                    "<h6>Travel Advisories:</h6><p> " +
                    response.advisories.description +
                    "</p>"
                );
                $(".travelAD").accordion({
                    collapsible: true,
                    active: false,
                    animate: 300,
                    icons: false
                });

                if (response.climate.description != null) {
                    $(".climate").html(
                        "<h6>Climate Conditions:</h6><p> " +
                        response.climate.description +
                        "</p>"
                    );
                } else {
                    $(".climate").html("<h6>Climate Conditions:</h6><p> None </p>");
                }
                $(".climate").accordion({
                    collapsible: true,
                    active: false,
                    animate: 300,
                    icons: false
                });

                if (response.safety.description != null) {
                    $(".safety").html(
                        "<h6>Safety Information:</h6><p> " +
                        response.climate.description +
                        "</p>"
                    );
                } else {
                    $(".safety").html(
                        "<h6>Safety Information:</h6><p> " +
                        response.safety.safetyInfo[0].description +
                        "</p>"
                    );
                }
                $(".safety").accordion({
                    collapsible: true,
                    active: false,
                    animate: 300,
                    icons: false
                });
            });
            $("#icons").show();
            console.log(response);

            var advisories = response.advisories;
            console.log(advisories, advisories.description, 'HFJKDSHAJFKLAHSDFJDKSALHFSADKJFHDJSAKLFHASJFK')
            console.log($('.travelAD'))

            $(".travelAD").html(
                "<h6>Travel Advisories:</h6><p> " +
                advisories.description +
                "</p>"
            );

            var country = $(".country").html(
                "<div col='m6'><h5>Country: " + response.name + "<br><br>"
            );
            console.log(country);

            $(".country").append(country);
            console.log(response.lawAndCulture.lawAndCultureInfo);

            $(".law").html("<div><h6>Law and Culture:</h6>");

            var textLawArray = [];

            for (i = 0; i < response.lawAndCulture.lawAndCultureInfo.length; i++) {
                textLawArray +=
                    "<p>" +
                    response.lawAndCulture.lawAndCultureInfo[i].category +
                    ": " +
                    response.lawAndCulture.lawAndCultureInfo[i].description +
                    "</p>";
            }
            $(".lawData").html(textLawArray);
            $(".allLaw").accordion({
                collapsible: true,
                active: true,
                animate: 300,
                icons: false
            });

            $(".travelAD").accordion({
                collapsible: true,
                active: true,
                animate: 300,
                icons: false
            });

            if (response.climate.description != null) {
                $(".climate").html(
                    "<h6>Climate Conditions:</h6><p> " +
                    response.climate.description +
                    "</p>"
                );
            } else {
                $(".climate").html("<h6>Climate Conditions:</h6><p> None </p>");
            }
            $(".climate").accordion({
                collapsible: true,
                active: true,
                animate: 300,
                icons: false
            });

            if (response.safety.description != null) {
                $(".safety").html(
                    "<h6>Safety Information:</h6><p> " +
                    response.climate.description +
                    "</p>"
                );
            } else {
                $(".safety").html(
                    "<h6>Safety Information:</h6><p> " +
                    response.safety.safetyInfo[0].description +
                    "</p>"
                );
            }
            $(".safety").accordion({
                collapsible: true,
                active: true,
                animate: 300,
                icons: false
            });
        });
    });
});