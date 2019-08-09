/* JavaScript file to print results in a
readable format given a JSON file
from the family planning app.
@author John Angeles
*/

// Input is the input element from our HTML script.
var input = document.getElementById("fileInput");

// When the input changes, we will end up calling this function that will ultimately call the onload function
input.addEventListener('change', function (e) {
	const reader = new FileReader(); 

	// As soon as we read the text, we will call the following function.
	reader.onload = function() {

		// Parse the result from the reader
		var parsedFile = JSON.parse(reader.result);

		// Fetch the questions.
		var questionsList = parsedFile.questions;

		displayQuestionsAndAnswers(questionsList);

	}

	// Reads the input.
	reader.readAsText(input.files[0]);
})

/* Main function that, given a questionsList recently gotten
from a parsed file, displays the results in a human-readable fashion.
*/
function displayQuestionsAndAnswers(questionsList) {
	var i;

	// For loop that basically iterates through the list and prints out what the user responded.
	for (i = 0; i < questionsList.length; i ++) {
		console.log("Question " + i + ":");
		console.log(questionsList[i]);
		console.log("-------------------");
	}
}
