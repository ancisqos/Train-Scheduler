// Initialize and authenticate Firebase
  var config = {
    apiKey: "AIzaSyBFle2boOCQY5McPRwe6IjIiWc3RxrCPsw",
    authDomain: "train-scheduler-833d9.firebaseapp.com",
    databaseURL: "https://train-scheduler-833d9.firebaseio.com",
    projectId: "train-scheduler-833d9",
    storageBucket: "train-scheduler-833d9.appspot.com",
    messagingSenderId: "110501467082"
  };

  firebase.initializeApp(config);

	var trainData = firebase.database();

// click listener for button to add trains
$("#addTrainBtn").on("click", function(){

	// grab user input
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10, "years").format("X");
	var frequency = $("#frequencyInput").val().trim();

	// stores input for new train data
	var newTrain = {
		name: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	}

	trainData.ref().push(newTrain);

	alert("Train Added!");

	// Clears all text submission boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

	return false;

})

trainData.ref().on("child_added",function(snapshot){
	var name = snapshot.val().name;
	var destination = snapshot.val().destination;
	var frequency = snapshot.val().frequency;
	var firstTrain = snapshot.val().firstTrain;

	var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
	var minutes = frequency - remainder;
	var arrival = moment().add(minutes, "m").format("hh:mm A");

	console.log(remainder);
	console.log(minutes);
	console.log(arrival);

	$("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
	
})