//////////////////////////////////////////////////////////
// 1. Create Necessary Firebase variables and local counter variables

// Variable to reference database
var database = firebase.database();

// Variable to reference the connections
var connectionsRef = database.ref("/connections");

// Variable to update andy connection changes
var connectedRef = database.ref(".info/connected");

// Add some initial local values
var initialValue = 100;
var initialValue2 = 100;
var clickCounter = initialValue;
var clickCounter2 = initialValue2;


//////////////////////////////////////////////////////////
// 2. Code to handle changes in connections and reflect on page

connectedRef.on("value", function(change){

    if(change.val()){
        // add user to the connection list
        var con = connectionsRef.push(true);

        // remove on a disconnenct
        con.onDisconnect().remove();
    }
});

// Update at page load or when list changes
connectionsRef.on("value",function(snap){
    // display viewercount in html using jquery
    $("#numWatchers").text(snap.numChildren());
})


//////////////////////////////////////////////////////////
// 3. Create code for handling and displaying counter variables

database.ref("/clicks").on("value", function(snap){
    
    // Change the local variable to reflect the firebase variable
    clickCounter = snap.val().clickCount;

    // Change the html to reflect the local values
    $("#click-value").text(clickCounter);

    // Make the value of the progress bar change
    $("#progress1").css("width", (clickCounter + "%"));

}, function(err){
    console.log("The firebase read failed: " + err.code);
})

database.ref("/clicks2").on("value", function(snap){
    
    // Change the local variable to reflect the firebase variable
    clickCounter2 = snap.val().clickCount2;

    // Change the html to reflect the local values
    $("#click-value2").text(clickCounter2);

    // Make the value of the progress bar change
    $("#progress2").css("width", (clickCounter2 + "%"));

}, function(err){
    console.log("The firebase read failed: " + err.code);
})


//////////////////////////////////////////////////////////
// 4. Logic for handling click events from player buttons
$("#click-button").on("click", function(){

    // Reduce the local counter
    clickCounter--;
    console.log(clickCounter);

    // Alert if user made it to zero and reset
    if (clickCounter === 0){
        alert("You made it to zero");
        clickCounter = initialValue;
    }

    // save new value in firebase
    database.ref("/clicks").set({
        clickCount: clickCounter
    });
})


$("#click-button2").on("click", function(){

    // Reduce the local counter
    clickCounter2--;
    console.log(clickCounter2)

    // Alert if user made it to zero and reset
    if (clickCounter2 === 0){
        alert("You made it to zero");
        clickCounter2 = initialValue2;
    }

    // save new value in firebase
    database.ref("/clicks2").set({
        clickCount2: clickCounter2
    });
})

//////////////////////////////////////////////////////////
// 5. Logic for handling reset button
$("#restart").on("click", function(){

    // set clickcounter back to initial value
    clickCounter = initialValue;
    clickCounter2 = initialValue2;

    // database ref
    database.ref("/clicks").set({
        clickCount: clickCounter
    });

    database.ref("/clicks2").set({
        clickCount2: clickCounter2
    })

    //Log the new local count
    console.log("Race Reset to : " + clickCounter);

    // set the click value text to the value of clickcounter
    $("#click-value").text(clickCounter);

})