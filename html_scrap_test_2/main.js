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
		//Every index into questionsList will be a question object.
		processQuestionAndAnswerObject(questionsList[i]);
	}
}

/* To be called from displayQuestionsAndAnswers. It takes in an object
that has a question and a set of answers.
*/
function processQuestionAndAnswerObject(questionAndAnswerObject) {
	var question = questionAndAnswerObject.question;
	switch (question) {
		case "qMostImportant":
			processQMostImportant(questionAndAnswerObject);
			return;
		case "qRiskFactors":
			console.log("Risk factors");
			return;
		case "qPeriodProblems":
			console.log("Period problems question");
			return;
		case "qWhichHaveYouUsed":
			console.log("Which have I used question");
			return;
		case "qOtherMedications":
			console.log("Other medications question");
			return;
		case "qOtherHealthIssues":
			console.log("qOtherHealthIssues");
			return;
		case "qWhenHaveChildren":
			console.log("qWhenHaveChildren");
			return;
		case "qOtherQuestions":
			console.log("qOtherQuestions");
			return;
		case "qMethodSpecific":
			console.log("Last question I think");
			return;
		default:
			console.log("Nothing happened!");
			return;
	}
}

/* Mini helper function that, when given an answer property,
returns an array with the question, and an answer 
that is either yes or no.
*/
function getUserResponse(answer) {
	var lastChar = answer[answer.length - 1];
	var question;
	var response;
	if (answer[answer.length - 1] == "o") {
		question = answer.substring(0, answer.length - 3);
		response = "NO";
	} else {
		question = answer.substring(0, answer.length - 4);
		response = "YES";
	}
	return [question, response];
}


/* Process question 1 assuming we pass in questionObject as Q1.
*/
function processQMostImportant(questionObject) {
	var answers = questionObject.answers;

	// Variables to store the question and answer pair.
		var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);

		switch(questionAnswerPair[0]) {
			case "safe_with_breastfeeding":
				q = "Safe with breastfeeding";
				break;
			case "pregnant_after_stopping":
				q = "Able to get pregnant quickly after stopping the method";
				break;
			case "few_side_effects":
				q = "Few or no side-effects";
				break;
			case "no_hormones":
				q = "No hormones";
				break;
			case "effective_long_term":
				q = "Effective long term (3 months or longer)";
				break;
			case "not_interrupt_sex":
				q = "Don't need to interrupt sex to use it";
				break;
			case "continue_periods":
				q = "Continue to have my monthly periods";
				break;
			case "fewer_periods":
				q = "Have fewer or no periods";
				break;
			case "decreases_symptoms_from_periods":
				q = "Decrease symptoms from period";
				break;
		}
		console.log("Question: " + q);
		console.log("You answered: " + questionAnswerPair[1]);
	}
}




