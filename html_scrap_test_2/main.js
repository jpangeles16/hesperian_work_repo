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
			console.log("FIRST PAGE");
			processQMostImportant(questionAndAnswerObject);
			return;
		case "qRiskFactors":
			console.log("SECOND PAGE");
			processQRiskFactors(questionAndAnswerObject);
			return;
		case "qPeriodProblems":
			console.log("THIRD PAGE");
			processQPeriodProblems(questionAndAnswerObject);
			return;
		case "qWhichHaveYouUsed":
			console.log("FOURTH PAGE");
			processQWhichHaveYouUsed(questionAndAnswerObject);
			return;
		case "qOtherMedications":
			console.log("FIFTH PAGE");
			processQOtherMedications(questionAndAnswerObject);
			return;
		case "qOtherHealthIssues":
			console.log("SIXTH PAGE");
			processQOtherHealthIssues(questionAndAnswerObject);
			return;
		case "qWhenHaveChildren":
			console.log("SEVENTH PAGE");
			processQWhenHaveChildren(questionAndAnswerObject);
			return;
		case "qOtherQuestions":
			console.log("EIGHTH PAGE");
			processQOtherQuestions(questionAndAnswerObject);
			return;
		case "qMethodSpecific":
			console.log("NINTH PAGE");
			processQMethodSpecific(questionAndAnswerObject);
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

/* Remember that questionObject contains an answers list. */
function processQRiskFactors(questionObject) {
	var answers = questionObject.answers;
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);
		
		switch(questionAnswerPair[0]) {
			case "smoke":
				q = "Do you smoke tobacco?";
				break;
			case "bloodpressure":
				q = "Do you have high blood pressure?";
				break;
			case "over35":
				q = "Are you over 35-years old?";
				break;
			case "other-risk-factors":
				q = "Have you ever had a serious, long-term health problem such as cancer, anemia, seizures, migraines, TB, stroke, heart attack or others?";
				break;
		}

		console.log("Question: " + q);
		console.log("You answered: " + questionAnswerPair[1]);
	}
}

/* Handles the third page of questions. */
function processQPeriodProblems(questionObject) {
	var answers = questionObject.answers;
	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);
		console.log("Question: When you are NOT using birth control, does your period bother you?");
		console.log("You answered: " + questionAnswerPair[1]);
	}
}

function processQWhichHaveYouUsed(questionObject) {
	var answers = questionObject.answers;
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);
		switch(questionAnswerPair[0]) {
			case "ocp":
				q = "The pill or birth control pills (containing both an estrogen and progestin)";
				break;
			case "ccap":
				q = "Cervical cap";
				break;
			case "diaph":
				q = "Diaphragm";
				break;
			case "sperm":
				q = "Vaginal spermicides (foam, film, gel, or suppositories)";
				break;
			case "pop":
				q = "'Mini-pills' or progestin-only pills";
				break;
			case "nuvaring":
				q = "NuvaRing, the vaginal contraceptive ring";
				break;
			case "depo":
				q = "Depo-Provera, birth control injection";
				break;
			case"nori":
				q = "Noristerat, birth control injection";
				break;
			case "cyclomess":
				q = "Cyclofem or Mesigyna, birth control injection";
				break;
			case"mcondom":
				q = "Male condom";
				break;
			case"fcondom":
				q = "Female condom";
				break;
			case"sponge":
				q = "Contraceptive sponge";
				break;
			case"paragard":
				q = "Intrauterine Device or IUD (ParaGard, Mirena, or others)";
				break;
			case"implanon":
				q = "Contraceptive implant (Norplant, Implanon, or others)";
				break;
			case"withd":
				q = "Pulling out or withdrawal";
				break;
		}
		console.log("Method: " + q);
		console.log("You answered: " + questionAnswerPair[1]);		
	}
}

function processQOtherMedications(questionObject) {
	var answers = questionObject.answers;
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);

		switch(questionAnswerPair[0]) {
			case "stjohnswort":
				q = "Do you take St. John's wort?";
				break;
			case "antifungal":
				q = "Do you use antifungal medications such as Griseofulvin, Fulvicin or Grisactin?";
				break;
		}
		console.log("Question: " + q);
		console.log("You answered: " + questionAnswerPair[1]);
	}
}

function processQOtherHealthIssues(questionObject) {
	var answers = questionObject.answers;
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);

		switch(questionAnswerPair[0]) {
			case"acne":
				q = "Do you have severe acne?";
				break;
			case"hair":
				q = "Do you have thick, dark facial hair?";
				break;
			case"endometriosis":
				q = "Do you have endometriosis?"
				break;
		}
		console.log("Question: " + q);
		console.log("You answered: " + questionAnswerPair[1]);
	}
}

function processQWhenHaveChildren(questionObject) {
	console.log("STILL NEED TO IMPLEMENT");
}

function processQOtherQuestions(questionObject) {
	var answers = questionObject.answers;
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);
		switch(questionAnswerPair[0]) {
			case"i-put":
				q = "I can't use methods where I have to put things into my vagina";
				break;
			case"healthworker-put":
				q = "I can't use a method where a health worker puts something into my vagina or womb";
				break;
			case"partner-willing":
				q = "My partner is not willing to use birth control"
				break;
			case"keep-secret":
				q = "I want to keep my method secret from others (my parents or partner)";
				break;
			case"breastfeeding":
				q = "I am breastfeeding";
				break;
			case"sti-protect":
				q = "I need something that protects against STIs";
				break;
		}
		console.log("Prompt: " + q);
		console.log("You answered: " + questionAnswerPair[1]);
	}
}

function processQMethodSpecific(questionObject) {
	var answers = questionObject.answers;
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);
		switch(questionAnswerPair[0]) {
			case"birth_control_pills":
				q = "Birth control pills only work when you take a pill every single day, more or less at the same time. Could you do this?";
				break;
			case"birth_control_injections":
				q = "Birth control injections require that you go to the clinic every 1-3 months to get an injection. Could you do this?";
				break;
			case"contraceptive_ring":
				q = "The contraceptive ring requires you to place a small bendable ring in your vagina every month. Could you do this?";
				break;
			case"iud":
				q = "The IUD is a small T-shaped object placed inside your uterus by a health worker. It provides contraception for 3-12 years, depending on the type. Would you feel comfortable having this done?";
				break;
			case"contraceptive_implant":
				q = "The contraceptive implant is 1-2 small tubes placed under the skin on your upper arm by a health worker. It provides contraception for up to 3 years. Would you feel comfortable having this done?";
				break;
		}
		console.log("Question: " + q);
		console.log("You answered: " + questionAnswerPair[1]);
	}
}





