
$(document).ready(function() {
  $("#icons").hide();
  $("#travel-info").hide();
  $('.section-things').hide();
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
      url: queryUrl1 + "/" + submitted,
      method: "GET",
      headers: {
        "X-Auth-API-Key": "xspyubpakcte72gaz2tw6qdd"
      }
    }).then(function(response) {
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
    $("#icons").show();
    getThingsToDo();

    $('.section-things').show();
  });
});

//var place2 = $("#inputCity").val().trim();
//console.log('place2:'+ place2);

function getThingsToDo() {

  var place = $("#inputCity").val().trim();
  console.log(place);

   //var place = "Houston";
  //console.log(place);

  var limit = 6;

  var settings = {
    "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events?location="+place+"&limit="+limit,
    "method": "GET",
    "headers": {
    "Authorization": "Bearer 0RNHafMEpqhc0LGydMyazrFx-E5hu7sAda5jw9c7No27dJA4wtsXxsxHWmtVi7dPa9ewyFHmR24sl4gV_mQw_vpRSEA_XjnXP-rz77HxPd02FdwmRtfDuxSybF1MXXYx"
        }}

  $.ajax(settings).then(function (response) {
   
    var card = "";
    for(i=0; i<limit; i++){
      var results = response.events;
      var event_category = results[i].category;
      var event_desc = results[i].description;
      var event_img = results[i].image_url;
      var event_url = results[i].event_site_url;
  
      console.log(results[i].category);
      console.log(results[i].description);
      console.log( results[i].image_url);
      console.log(results[i].event_site_url);

      card += "<div class='col s12 m6 l4'>" +
      "<div class='card small'>" + 
        "<div class='card-image'>" +
          "<img src='" + event_img + "' alt='' />" +
          "<span class='card-title'>" + event_category + "</span>" +
        "</div>" +
        "<div class='card-content'>" +
          "<p class='deep-orange-text text-darken-4'>" + event_category + "</p>" +
          "<p>" + event_desc +
          "</p>" +
        "</div>" +
      "</div>" +
    "</div>";

    }
    $("#Events").html(card);

    // var event_Container_Div = $("div");
    // //var event_Container_Div = document.createElement("div")
    // event_Container_Div.addClass('col s12 m4');

    // var event_Card_div = $("div class ='card small'");
    
    // var event_Img_Div = $("img class = 'card-image'");
    // event_Img_Div.attr('src', event_img);
    
    // var event_Content = $("class='card-content'");
    // event_Content.html(event_desc);

    // event_Card_div.append(event_Img_Div);
    // event_Card_div.append(event_Content);

    // $("#Events").appendChild(event_Container_Div);

        }) //end ajax call

} //end getThingsToDo
 