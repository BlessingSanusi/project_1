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


// {
//     "events": [
//         {
//             "attending_count": 1,
//             "category": "other",
//             "cost": null,
//             "cost_max": null,
//             "description": "THIS EVENT IS FULL TO CAPACITY!  WE ARE NO LONGER ACCEPTING RSVPs.  ABSOLUTELY NO WALK-INS!\n\n*****In light of the recent tragedy in Haiti, all funds...",
//             "event_site_url": "https://www.yelp.com/events/london-yelps-burst-birthday-event-full?adjust_creative=Y_K0fV6ocULU7tdvseG9Mw&utm_campaign=yelp_api_v3&utm_medium=api_v3_event_search&utm_source=Y_K0fV6ocULU7tdvseG9Mw",
//             "id": "london-yelps-burst-birthday-event-full",
//             "image_url": "https://s3-media2.fl.yelpcdn.com/ephoto/lSNudwrOHLFqwCP5ZG1QLw/o.jpg",
//             "interested_count": 337,
//             "is_canceled": false,
//             "is_free": true,
//             "is_official": false,
//             "latitude": 51.5325189,
//             "longitude": -0.1049946,
//             "name": "Yelp's \"Burst\" Birthday - EVENT FULL",
//             "tickets_url": "",
//             "time_end": "2010-01-26T22:00:00+00:00",
//             "time_start": "2010-01-26T20:00:00+00:00",
//             "location": {
//                 "address1": "7 Torrens St",
//                 "address2": "",
//                 "address3": "",
//                 "city": "London",
//                 "zip_code": "EC1V 1NQ",
//                 "country": "GB",
//                 "state": "XGL",
//                 "display_address": [
//                     "7 Torrens St",
//                     "London EC1V 1NQ",
//                     "United Kingdom"
//                 ],
//                 "cross_streets": ""
//             },
//             "business_id": "islington-metal-works-london"
//         }
//     ],
//     "total": 1
// }