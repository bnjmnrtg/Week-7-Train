$(document).ready(function() {
    var trainSchedule = new Firebase("https://dazzling-heat-363.firebaseio.com/");

    var name = "";
    var destination = "";
    var frequency = 0;
    var firstArrival = "";
    var minutesAway = 0;
    var currentTime = moment();

    window.setInterval(function clock() {
        $('#time').html(moment().format("hh:mm:ss a"));
    }, 1000);

    $('#submit').on('click', function() {
        console.log("submit works");

        var trainName = $('#trainNameInput').val().trim();
        var trainDestination = $('#destinationInput').val().trim();
        var trainFirstArrival = $('#trainTimeInput').val().trim();
        var trainFrequency = $('#frequencyInput').val().trim();

        var newTrain = {
            name: trainName,
            destination: trainDestination,
            frequency: trainFrequency,
            firstArrival: trainFirstArrival,
            minutesAway: 0,
        }

        trainSchedule.push(newTrain);

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.firstArrival);
        console.log(newTrain.frequency);

        $('#trainNameInput').val("");
        $('#destinationInput').val("");
        $('#trainTimeInput').val("");
        $('#frequencyInput').val("");

        return false;

    });

    trainSchedule.on('child_added', function(childSnapshot, preChildKey) {
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainFirstArrival = childSnapshot.val().firstArrival;
        var trainFrequency = childSnapshot.val().frequency;

        var startTime = moment(trainFirstArrival, "hh:mm a").subtract(1, "years");
        console.log(startTime);
        var convertedTime = moment(startTime, ["hh:mm a"]);
        console.log(convertedTime);
        var diffTime = moment().diff(convertedTime, "minutes");
        console.log(diffTime);
        var remainder = diffTime % trainFrequency;
        console.log(remainder);
        var tMinutesTillTrain = trainFrequency - remainder;
        console.log(tMinutesTillTrain)
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log(nextTrain);
        var znextTrain = moment(nextTrain).format("hh:mm a");
        console.log(znextTrain);
        $("#traintable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + znextTrain + "</td><td>" +
            tMinutesTillTrain + "</td><tr>");
    })

    // setinterval
    // loop through table and set the times
    
    // window.setInterval(function runTable() {
    //     for (var i = 0; i < trainSchedule.length; i++) {
    //         trainSchedule[i]
    //     }
    // }, 1000);

});
