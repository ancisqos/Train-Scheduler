// Initialize Firebase
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

$("#addTrainbtn").on("click", function(){
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10, "years").format("X");
	var frequency = $("#frequencyInput").val().trim();

	var newTrain = {
		name: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	}

	trainData.ref().push(newTrain);

	alert("Train Added!");

	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

	return false;

})