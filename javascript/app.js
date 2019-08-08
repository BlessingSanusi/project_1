$(document).ready(function() {



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
    
            var place = "New York";
            var limit = 10
                var settings = {
                "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events?location="+place+"&limit="+limit,
                "method": "GET",
                "headers": {
                "Authorization": "Bearer 0RNHafMEpqhc0LGydMyazrFx-E5hu7sAda5jw9c7No27dJA4wtsXxsxHWmtVi7dPa9ewyFHmR24sl4gV_mQw_vpRSEA_XjnXP-rz77HxPd02FdwmRtfDuxSybF1MXXYx",
                }
            }
            
            $.ajax(settings).then(function (response) {
                console.log(response);
                console.log(response.events[0]);
            });

}); //end document.reapdy