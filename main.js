/* JavaScript file to print results in a
readable format given a JSON file
from the family planning app.

Kind of like a conveyor belt, this script takes input
from input.addEventListener and displays the results 
through (in this order) displayQuestionsAndAnswers, to processX functions,
to finally the renderHTML function.
@author John Angeles
*/

//Get the url that contains formation about what the user inputted.
var url = document.URL;

//Get the container from our HTML file that will display the results.
var displayContainer = document.getElementById("displayContentsContainer");

/* Fourth step. A function that works in conjunction with displayContainer.
Basically, it displays our results to our HTML file. */
function renderHTML(question, answer) {

	var answerClass;

	if (answer == "NO") {
		answerClass = "no";
	} else {
		answerClass = "yes";
	}

	var qDisplay = "<p class='" + answerClass + "'>Question: " + question + "</p>";
	var answer = "<p class='" + answerClass + "'>You answered: " + answer + "</p>";
	displayContainer.insertAdjacentHTML('beforeend', qDisplay);
	displayContainer.insertAdjacentHTML('beforeend', answer);
}

// Input is the input element from our HTML script.
var input = document.getElementById("fileInput");

/* First step. When the input changes, we will end up calling this
 function that will ultimately call the onload function. */
input.addEventListener('change', function (e) {
	const reader = new FileReader(); 

	// As soon as we read the text, we will call the following function.
	reader.onload = function() {
		//Just a test!
		url = "https://jpangeles16.github.io/hesperian_work_repo/?Feedback%20on%20method%20chooser%20results&body=Please%20add%20your%20feedback%20on%20the%20results%2C%20include%20what%20you%20expected%20or%20results%20that%20you%20did%20not%20expect.%0A%0A%0A%0A-------------Please%20do%20not%20edit%20below%20this%20line--------------%0A%0A%7B%0A%20%20%22questions%22%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22question%22%3A%20%22qMostImportant%22%2C%0A%20%20%20%20%20%20%22answers%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22safe_with_breastfeeding-yes%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22pregnant_after_stopping-yes%22%3A%202%2C%0A%20%20%20%20%20%20%20%20%22few_side_effects-yes%22%3A%203%2C%0A%20%20%20%20%20%20%20%20%22no_hormones-no%22%3A%204%2C%0A%20%20%20%20%20%20%20%20%22effective_long_term-no%22%3A%205%2C%0A%20%20%20%20%20%20%20%20%22not_interrupt_sex-no%22%3A%206%2C%0A%20%20%20%20%20%20%20%20%22continue_periods-no%22%3A%207%2C%0A%20%20%20%20%20%20%20%20%22fewer_periods-no%22%3A%208%2C%0A%20%20%20%20%20%20%20%20%22decreases_symptoms_from_periods-no%22%3A%209%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22question%22%3A%20%22qRiskFactors%22%2C%0A%20%20%20%20%20%20%22answers%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22smoke-no%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22bloodpressure-no%22%3A%202%2C%0A%20%20%20%20%20%20%20%20%22over35-no%22%3A%203%2C%0A%20%20%20%20%20%20%20%20%22other-risk-factors-no%22%3A%204%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22question%22%3A%20%22qPeriodProblems%22%2C%0A%20%20%20%20%20%20%22answers%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22period_bother-no%22%3A%201%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22question%22%3A%20%22qWhichHaveYouUsed%22%2C%0A%20%20%20%20%20%20%22answers%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22ocp-no%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22ccap-no%22%3A%202%2C%0A%20%20%20%20%20%20%20%20%22diaph-no%22%3A%203%2C%0A%20%20%20%20%20%20%20%20%22sperm-no%22%3A%204%2C%0A%20%20%20%20%20%20%20%20%22pop-no%22%3A%205%2C%0A%20%20%20%20%20%20%20%20%22nuvaring-no%22%3A%206%2C%0A%20%20%20%20%20%20%20%20%22depo-no%22%3A%207%2C%0A%20%20%20%20%20%20%20%20%22nori-no%22%3A%208%2C%0A%20%20%20%20%20%20%20%20%22cyclomess-no%22%3A%209%2C%0A%20%20%20%20%20%20%20%20%22mcondom-no%22%3A%2010%2C%0A%20%20%20%20%20%20%20%20%22fcondom-no%22%3A%2011%2C%0A%20%20%20%20%20%20%20%20%22sponge-no%22%3A%2012%2C%0A%20%20%20%20%20%20%20%20%22paragard-no%22%3A%2013%2C%0A%20%20%20%20%20%20%20%20%22implanon-no%22%3A%2014%2C%0A%20%20%20%20%20%20%20%20%22withd-no%22%3A%2015%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22question%22%3A%20%22qOtherMedications%22%2C%0A%20%20%20%20%20%20%22answers%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22stjohnswort-no%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22antifungal-no%22%3A%202%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22question%22%3A%20%22qOtherHealthIssues%22%2C%0A%20%20%20%20%20%20%22answers%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22acne-no%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22hair-no%22%3A%202%2C%0A%20%20%20%20%20%20%20%20%22endometriosis-no%22%3A%203%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22question%22%3A%20%22qWhenHaveChildren%22%2C%0A%20%20%20%20%20%20%22answers%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22have-children-years%22%3A%201%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22question%22%3A%20%22qOtherQuestions%22%2C%0A%20%20%20%20%20%20%22answers%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22i-put-no%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22healthworker-put-no%22%3A%202%2C%0A%20%20%20%20%20%20%20%20%22partner-willing-no%22%3A%203%2C%0A%20%20%20%20%20%20%20%20%22keep-secret-no%22%3A%204%2C%0A%20%20%20%20%20%20%20%20%22breastfeeding-no%22%3A%205%2C%0A%20%20%20%20%20%20%20%20%22sti-protect-no%22%3A%206%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22question%22%3A%20%22qMethodSpecific%22%2C%0A%20%20%20%20%20%20%22answers%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22birth_control_pills-no%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22birth_control_injections-no%22%3A%202%2C%0A%20%20%20%20%20%20%20%20%22contraceptive_ring-no%22%3A%203%2C%0A%20%20%20%20%20%20%20%20%22iud-no%22%3A%204%2C%0A%20%20%20%20%20%20%20%20%22contraceptive_implant-no%22%3A%205%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22question%22%3A%20%22results%22%0A%20%20%20%20%7D%0A%20%20%5D%2C%0A%20%20%22results%22%3A%20%7B%0A%20%20%20%20%22green%22%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22mcondom%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%200.5666666666666667%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22fam%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%200.5499999999999999%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%2C%0A%20%20%20%20%22yellow%22%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22withd%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%200.48666666666666664%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22fcondom%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%200.4514285714285714%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22diaph%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%200.36%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22sperm%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%200.355%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22sponge%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%200.2914285714285714%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22ccap%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%200.2914285714285714%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22ortho_evra%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%200.049538461538461545%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22ocp%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%20-0.08846153846153845%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%2C%0A%20%20%20%20%22red%22%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22mirena%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%200.38503125%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22implanon%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%200.31994576719576723%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22vas%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%200.2852857142857143%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22btl%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%200.28428571428571425%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22pop%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%200.21230769230769234%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22paragard%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%200.13527272727272727%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22nuvaring%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%200.06133333333333332%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22cyclomess%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%200.05196428571428572%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22nori%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%20-0.008660714285714282%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22id%22%3A%20%22depo%22%2C%0A%20%20%20%20%20%20%20%20%22score%22%3A%20-0.07794642857142856%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%0A%20%20%7D%0A%7D"

		//First, ensure that the url is properly decoded
		url = decodeURL(url);

		//OLD
		// // Parse the result from the reader
		// var parsedFile = JSON.parse(reader.result);
		//NEW

		// Fetch the questions.
		var questionsList = parsedFile.questions;

		// Fetch the results.
		var results = parsedFile.results;

		// Display the user's results.
		displayQuestionsAndAnswers(questionsList);

		// (Leads to fifth step) display the recommendations
		displayRecommendations(results);
	}
	// Reads the input.
	reader.readAsText(input.files[0]);
})

/* Assumes that our URL input is encoded. Not only does this function
decode it, but it returns the JSON text that we can parse to get the answers from 
the user. */
function decodeURL(url) {
	url = decodeURI(url);
	var index = url.indexOf("?");
	return url.substring(index + 1, url.length)
}

/* Second step. Main function that, given a questionsList recently gotten
from a parsed file, displays the results in a human-readable fashion.
*/
function displayQuestionsAndAnswers(questionsList) {

	displayContainer.insertAdjacentHTML('beforeend', "<h1> Your Input </h1>");

	var i;
	// For loop that basically iterates through the list and prints out what the user responded.
	for (i = 0; i < questionsList.length; i ++) {
		//Every index into questionsList will be a question object.
		processQuestionAndAnswerObject(questionsList[i]);
	}
}

/*Third step. These upcoming functions that this function uses
are in the third step in our process.
To be called from displayQuestionsAndAnswers. It takes in an object
that has a question and a set of answers.
*/
function processQuestionAndAnswerObject(questionAndAnswerObject) {
	var question = questionAndAnswerObject.question;
	switch (question) {
		case "qMostImportant":
			displayContainer.insertAdjacentHTML('beforeend', "<p>FIRST PAGE</p>");
			processQMostImportant(questionAndAnswerObject);
			return;
		case "qRiskFactors":
			displayContainer.insertAdjacentHTML('beforeend', "<p>SECOND PAGE</p>");
			processQRiskFactors(questionAndAnswerObject);
			return;
		case "qPeriodProblems":
			displayContainer.insertAdjacentHTML('beforeend', "<p>THIRD PAGE</p>");
			processQPeriodProblems(questionAndAnswerObject);
			return;
		case "qWhichHaveYouUsed":
			displayContainer.insertAdjacentHTML('beforeend', "<p>FOURT PAGE</p>");
			processQWhichHaveYouUsed(questionAndAnswerObject);
			return;
		case "qOtherMedications":
			displayContainer.insertAdjacentHTML('beforeend', "<p>FIFTH PAGE</p>");
			processQOtherMedications(questionAndAnswerObject);
			return;
		case "qOtherHealthIssues":
			displayContainer.insertAdjacentHTML('beforeend', "<p>SIXTH PAGE</p>");
			processQOtherHealthIssues(questionAndAnswerObject);
			return;
		case "qWhenHaveChildren":
			displayContainer.insertAdjacentHTML('beforeend', "<p>SEVENTH PAGE</p>");
			processQWhenHaveChildren(questionAndAnswerObject);
			return;
		case "qOtherQuestions":
			displayContainer.insertAdjacentHTML('beforeend', "<p>EIGHTH PAGE</p>");
			processQOtherQuestions(questionAndAnswerObject);
			return;
		case "qMethodSpecific":
			displayContainer.insertAdjacentHTML('beforeend', "<p>NINTH PAGE</p>");
			processQMethodSpecific(questionAndAnswerObject);
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
		renderHTML(q, questionAnswerPair[1]);
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

		renderHTML(q, questionAnswerPair[1]);
	}
}

/* Handles the third page of questions. */
function processQPeriodProblems(questionObject) {
	var answers = questionObject.answers;
	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);
		renderHTML("Question: When you are NOT using birth control, does your period bother you?", questionAnswerPair[1]);
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
		renderHTML(q, questionAnswerPair[1]);
	
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
		renderHTML(q, questionAnswerPair[1]);

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
		renderHTML(q, questionAnswerPair[1]);

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
		renderHTML(q, questionAnswerPair[1]);

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
		renderHTML(q, questionAnswerPair[1]);

	}
}

// =================================================================

// THIS HALF DISPLAYS THE SURVEY'S RECOMMENDATIONS

// =================================================================

var recommendationsContainer = document.getElementById("displayRecommendations");

/* Given the results from the JSON file, display the recommendations the survey gives the user.
Results is an object with three properties: green, yellow, or red. Each color property contains a list
of objects that each contain an id and a score.
 */
function displayRecommendations(results) {
	recommendationsContainer.insertAdjacentHTML('beforeend', "<h1> Recommendations </h1>");

	var green = results.green;
	var yellow = results.yellow;
	var red = results.red;

	var result;

	recommendationsContainer.insertAdjacentHTML('beforeend', "<p> RECOMMENDED: </p>")

	for (var i = 0; i < green.length; i ++) {
		result = returnMethod(green[i].id);
		displayGreenResult(result);
	}

	recommendationsContainer.insertAdjacentHTML('beforeend', "<p> OTHER POSSIBLE: </p>")


	for (i = 0; i < yellow.length; i ++) {
		result = returnMethod(yellow[i].id);
		displayYellowResult(result);
	}

	recommendationsContainer.insertAdjacentHTML('beforeend', "<p> NOT RECOMMENDED: </p>")

	for (i = 0; i < red.length; i ++) {
		result = returnMethod(red[i].id);
		displayRedResult(result);
	}
}

/* Called from displayRecommendations. Given an id, this function displays the proper name
of the method. */
function returnMethod(id) {
	switch(id) {
		case"btl":
			return "BTL/Tubes Tied";
		case"ccap":
			return "CCAP";
		case"depo":
			return "Depo";
		case"nori":
			return "Noristerat";
		case"cyclomess":
			return "Cyclofem and Messygna";
		case"diaph":
			return "Diaphram";
		case"fam":
			return "Fam";
		case"fcondom":
			return "Female Condom";
		case"implanon":
			return "Implant";
		case"mcondom":
			return "Male Condom";
		case"mirena":
			return "Mirena";
		case"nuvaring":
			return "Nuva Ring";
		case"ocp":
			return "Birth Control Pills";
		case"ortho_evra":
			return "Patch";
		case"paragard":
			return "Paragard";
		case"pop":
			return "Mini Pills";
		case"sperm":
			return "Spermicide";
		case"sponge":
			return "Sponge";
		case"vas":
			return "Vasectomy";
		case"withd":
			return "Withdrawal";
	}
}

/* Assumes we are calling from displayRecommendations. We display results 
with a green finish.*/
function displayGreenResult(result) {
	recommendationsContainer.insertAdjacentHTML('beforeend', "<p class='greenresult'>" + result + "</p>");

}
function displayYellowResult(result) {
	recommendationsContainer.insertAdjacentHTML('beforeend', "<p class='yellowresult'>" + result + "</p>");
}

function displayRedResult(result) {
	recommendationsContainer.insertAdjacentHTML('beforeend', "<p class='redresult'>" + result + "</p>");
}


