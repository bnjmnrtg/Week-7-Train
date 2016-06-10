$(document).ready(function(){
	var trainSchedule = new Firebase("https://dazzling-heat-363.firebaseio.com/");

	var name = "";
	var destination = "";
	var frequency= 0 ;
	var firstArrival = "";
	var minutesAway = 0 ;
	var currentTime = moment();

	
	window.setInterval(function clock(){
		$('#time').html(moment(currentTime).format("hh:mm:ss a"));
	}, 1000);

	
	
	
	$('#submit').on('click', function(){
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
	
	trainSchedule.on('child_added', function(childSnapshot, preChildKey){

		var trainName = childSnapshot.val().name;
		var trainDestination = childSnapshot.val().destination;
		var trainFirstArrival = childSnapshot.val().firstArrival;
		var trainFrequency =  childSnapshot.val().frequency;

		$("#traintable > tbody").append("<tr><td>" + trainName + "</td><td>"
		 + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainFirstArrival
		  + "</td><tr>");
	})

});










