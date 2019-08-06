$(document).ready(function() {

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


        function getTravelAdvisoryInfo(){

            //var location = $('#autocomplete-input');
            var location = 'GR';
            var api_key = "775e2f93afmsh982d2aa4d4c5505p181e67jsn80b576927669";
            var queryURL = "https://www.travel-advisory.info/api?countrycode=" + location ;

            $.ajax({
                url:queryURL,
                method :"GET"
            }).then(function(response){
                    var results = response.data;
                    console.log(results['advisory'])
    
                })
                
            }//end displayTravelAdvisory function  
         
            //test displayTravelAdvisory function
            getTravelAdvisoryInfo()


         function getThingsToDo(){
                       
            var location = 'GR';
            var api_key = "775e2f93afmsh982d2aa4d4c5505p181e67jsn80b576927669";
            var queryURL = "https://api.yelp.com/v3/events/featured" + location ;

            $.ajax({
                url:queryURL,
                method :"GET"
            }).then(function(response){
                    var results = response.data;
                    console.log(results['advisory'])
    
                })



         }//end getThingsToDo function




    }); //end document.ready