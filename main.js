/* JavaScript file to print results in a
readable format given a JSON file
from the family planning app.

Kind of like a conveyor belt, this script takes input
from input.addEventListener and displays the results 
through (in this order) displayQuestionsAndAnswers, to processX functions,
to finally the renderHTML function.

I do have to say, though, I haven't taken complete
advantage of abstraction barriers, and so
TODO: create a class for the JSON file to help with this.
@author John Angeles
*/

//Get the url that contains formation about what the user inputted.
var url = document.URL;

//Get the container from our HTML file that will display the results.
var displayContainer = document.getElementById("displayContentsContainer");

//In the event that the user has problems, I will post what their 
//contraceptive issues are in this container
var contraceptiveProblemsContainer = document.getElementById("displayContraceptiveIssuesContainer");

//The container where we list out all of our health issues (TB, cancer, etc)
var healthProblemsContainer = document.getElementById("displayhealthissuescontainer");

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

/* Fourth step. A function that works in conjunction with the issues container. */
function renderHTMLForContraceptiveProblems(question, answer) {
	var answerClass;

	if (answer == "NO") {
		answerClass = "no";
	} else {
		answerClass = "yes";
	}

	var qDisplay = "<p class='" + answerClass + "'>Question: " + question + "</p>";
	var answer = "<p class='" + answerClass + "'>You answered: " + answer + "</p>";
	contraceptiveProblemsContainer.insertAdjacentHTML('beforeend', qDisplay);
	contraceptiveProblemsContainer.insertAdjacentHTML('beforeend', answer);
}

/* Fourth step. A function that works in conjunction with the health problems container. */
function renderHTMLForContraceptiveProblems(question, answer) {
	var answerClass;

	if (answer == "NO") {
		answerClass = "no";
	} else {
		answerClass = "yes";
	}

	var qDisplay = "<p class='" + answerClass + "'>Question: " + question + "</p>";
	var answer = "<p class='" + answerClass + "'>You answered: " + answer + "</p>";
	healthProblemsContainer.insertAdjacentHTML('beforeend', qDisplay);
	healthProblemsContainer.insertAdjacentHTML('beforeend', answer);
}

// Input is the input element from our HTML script.
var input = document.getElementById("fileInput");
const reader = new FileReader(); 

/* First step. When the input changes, we will end up calling this
 function that will ultimately call the onload function. */
input.addEventListener('change', function (e) {
	// As soon as we read the text, we will call the following function.
	reader.onload = function() {

		// //First, ensure that the url is properly decoded
		// url = decodeURL(url);

		// // Parse the url from the reader
		var parsedFile = JSON.parse(reader.result);

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

// /* First step. When the input changes, we will end up calling this
//  function that will ultimately call the onload function. */
// function startGenerating() {

// 	//First, ensure that the url is properly decoded
// 	url = decodeURL(url);

// 	// Parse the url from the reader
// 	var parsedFile = JSON.parse(url);

// 	// Fetch the questions.
// 	var questionsList = parsedFile.questions;

// 	// Fetch the results.
// 	var results = parsedFile.results;

// 	// Display the user's results.
// 	displayQuestionsAndAnswers(questionsList);

// 	// (Leads to fifth step) display the recommendations
// 	displayRecommendations(results);
// }

/* Assumes that our URL input is encoded. Not only does this function
decode it, but it returns the JSON text that we can parse to get the answers from 
the user. */
function decodeURL(url) {
	// First, delete the unnecessary url
	var questionIndex = url.indexOf("?");
	url = url.substring(questionIndex + 1, url.length);
	url = decodeURIComponent(url);

	// Then, remove the other unnecessary comments
	var bracketSubstringIndex = url.indexOf("{");
	return url.substring(bracketSubstringIndex, url.length);
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
	if (haveSeenQuestion(question)) {
		return;
	}
	switch (question) {
		/* There is a bug where we have multiple redundant questions in the JSON file
		This function call should handle it. If we see the same question twice, then 
		we just return.
		*/
		case "qMostImportant":
			displayContainer.insertAdjacentHTML('beforeend', "<p>FIRST PAGE</p>");
			processQMostImportant(questionAndAnswerObject);
			haveSeen.qMostImportant = true;
			return;
		case "qRiskFactors":
			displayContainer.insertAdjacentHTML('beforeend', "<p>SECOND PAGE</p>");
			processQRiskFactors(questionAndAnswerObject);
			haveSeen.qRiskFactors = true;
			return;
			// If we say yes to the health problems, we then list out what the user inputted. The following does that
		case "qSeriousHealthProblems":
			healthProblemsContainer.insertAdjacentHTML('beforeend', "<p>HEALTH PROBLEMS</p>");
			processQSeriousHealthProblems(questionAndAnswerObject);
			haveSeen.qSeriousHealthProblems = true;
		case "qPeriodProblems":
			displayContainer.insertAdjacentHTML('beforeend', "<p>THIRD PAGE</p>");
			processQPeriodProblems(questionAndAnswerObject);
			haveSeen.qPeriodProblems = true;
			return;
		case "qWhichHaveYouUsed":
			displayContainer.insertAdjacentHTML('beforeend', "<p>FOURTH PAGE</p>");
			processQWhichHaveYouUsed(questionAndAnswerObject);
			haveSeen.qWhichHaveYouUsed = true;
			return;
			// Here we branch off if we encounter issues with contraceptives
		case "qMethodProblems/ocp": // OCP means birth control pills
			contraceptiveProblemsContainer.insertAdjacentHTML('beforeend', "<p>BIRTH CONTROL ISSUES</p>");
			processQMethodProblemsOCP(questionAndAnswerObject);
			return;
		case "qMethodProblems/ccap": // CCAP
			contraceptiveProblemsContainer.insertAdjacentHTML('beforeend', "<p>CCAP ISSUES</p>");
			processQMethodProblemsCCAP(questionAndAnswerObject);
			return;
		case "qMethodProblems/diaph": // Diaphragm 
			contraceptiveProblemsContainer.insertAdjacentHTML('beforeend', "<p>DIAPHGRAM ISSUES</p>");
			processQMethodProblemsDiaph(questionAndAnswerObject);
			return;
		case "qMethodProblems/sperm": 
			contraceptiveProblemsContainer.insertAdjacentHTML('beforeend', "<p>SPERM ISSUES</p>");
			processQMethodProblemsSperm(questionAndAnswerObject);
			return;
		case "qMethodProblems/pop": // Mini pills
			contraceptiveProblemsContainer.insertAdjacentHTML('beforeend', "<p>MINI PILLS ISSUES</p>");
			processQMethodProblemsPop(questionAndAnswerObject);
			return;
		case "qMethodProblems/nuvaring": //Nuva ring
			contraceptiveProblemsContainer.insertAdjacentHTML('beforeend', "<p>NUVA RING ISSUES</p>");
			processQMethodProblemsNuvaring(questionAndAnswerObject);
			return;
		case "qMethodProblems/depo": // Depo
			contraceptiveProblemsContainer.insertAdjacentHTML('beforeend', "<p>DEPO ISSUES</p>");
			processQMethodProblemsDepo(questionAndAnswerObject);
			return;
		case "qMethodProblems/nori": // Noristerat
			contraceptiveProblemsContainer.insertAdjacentHTML('beforeend', "<p>NORISTERAT ISSUES</p>");
			processQMethodProblemsNori(questionAndAnswerObject);
			return;
		case "qMethodProblems/cyclomess": // Cyclomess
			contraceptiveProblemsContainer.insertAdjacentHTML('beforeend', "<p>CYCLOFEM AND MESSYGNA PROBLEMS</p>");
			processQMethodProblemsCyclomess(questionAndAnswerObject);
			return;
		case "qMethodProblems/mcondom": // Male condom
			contraceptiveProblemsContainer.insertAdjacentHTML('beforeend', "<p>MALE CONDOM ISSUES</p>");
			processQMethodProblemsMCondom(questionAndAnswerObject);
			return;
		case "qMethodProblems/fcondom": // Female condom
			contraceptiveProblemsContainer.insertAdjacentHTML('beforeend', "<p>FEMALE CONDOM ISSUES</p>");
			processQMethodProblemsFCondom(questionAndAnswerObject);
			return;
		case "qMethodProblems/sponge": // Sponge
			contraceptiveProblemsContainer.insertAdjacentHTML('beforeend', "<p>SPONGE ISSUES</p>");
			processQMethodProblemsSponge(questionAndAnswerObject);
			return;
		case "qMethodProblems/paragard": // Paragard
			contraceptiveProblemsContainer.insertAdjacentHTML('beforeend', "<p>PARAGARD ISSUES</p>");
			processQMethodProblemsParagard(questionAndAnswerObject);
			return;
		case "qMethodProblems/implanon": // Implanon issues
			contraceptiveProblemsContainer.insertAdjacentHTML('beforeend', "<p>IMPLANON ISSUES</p>");
			processQMethodProblemsImplanon(questionAndAnswerObject);
			return;
		case "qMethodProblems/withd": // Withdrawal
			contraceptiveProblemsContainer.insertAdjacentHTML('beforeend', "<p>WITHDRAWAL ISSUES</p>");
			processQMethodProblemsWithdrawal(questionAndAnswerObject);
			return;
		case "qOtherMedications":
			displayContainer.insertAdjacentHTML('beforeend', "<p>FIFTH PAGE</p>");
			processQOtherMedications(questionAndAnswerObject);
			haveSeen.qOtherMedications = true;

			return;
		case "qOtherHealthIssues":
			displayContainer.insertAdjacentHTML('beforeend', "<p>SIXTH PAGE</p>");
			processQOtherHealthIssues(questionAndAnswerObject);
			haveSeen.qOtherHealthIssues = true;

			return;
		case "qWhenHaveChildren":
			displayContainer.insertAdjacentHTML('beforeend', "<p>SEVENTH PAGE</p>");
			processQWhenHaveChildren(questionAndAnswerObject);
			haveSeen.qWhenHaveChildren = true;

			return;
		case "qOtherQuestions":
			displayContainer.insertAdjacentHTML('beforeend', "<p>EIGHTH PAGE</p>");
			processQOtherQuestions(questionAndAnswerObject);
			haveSeen.qOtherQuestions = true;

			return;
		case "qMethodSpecific":
			displayContainer.insertAdjacentHTML('beforeend', "<p>NINTH PAGE</p>");
			processQMethodSpecific(questionAndAnswerObject);
			haveSeen.qMethodSpecific = true;

			return;
	}
}

/* Takes a questionAndAnswer object. If we have seen it, then in processQuestionAndAnswerObject
we just return out. This returns true if we have seen the questionAndAnswerObject.
*/
function haveSeenQuestion(question) {
	var code = 0;
	if (question == "qMostImportant") {
		return haveSeen.qMostImportant;
	} else if (question == "qRiskFactors") {
		return haveSeen.qRiskFactors;
	} else if (question == "qSeriousHealthProblems") {
		return haveSeen.qSeriousHealthProblems;
	} else if (question == "qPeriodProblems") {
		return haveSeen.qPeriodProblems;
	} else if (question == "qWhichHaveYouUsed") {
		return haveSeen.qWhichHaveYouUsed;
	} else if (question == "qOtherMedications") {
		return haveSeen.qOtherMedications;
	} else if (question == "qOtherHealthIssues") {
		return haveSeen.qOtherHealthIssues;
	} else if (question == "qWhenHaveChildren") {
		return haveSeen.qWhenHaveChildren;
	} else if (question == "qOtherQuestions") {
		return haveSeen.qOtherQuestions;
	} else if (question == "qMethodSpecific") {
		return haveSeen.qMethodSpecific;
	} else {
		console.log("Invalid question! Called from haveSeenQuestion");
		return;
	}
}

/* Data structure where we return true if we have seen the object.
*/
var haveSeen = {
	qMostImportant: false,
	qRiskFactors: false,
	qSeriousHealthProblems: false,
	qPeriodProblems: false,
	qWhichHaveYouUsed: false,
	// qMethodProblems/ocp: false,
	// qMethodProblems/ccap: false,
	// qMethodProblems/diaph: false,
	// qMethodProblems/sperm: false,
	// qMethodProblems/pop: false,
	// qMethodProblems/nuvaring: false,
	// qMethodProblems/depo: false,
	// qMethodProblems/nori: false,
	// qMethodProblems/cyclomess: false,
	// qMethodProblems/mcondom: false,
	// qMethodProblems/fcondom: false,
	// qMethodProblems/sponge: false,
	// qMethodProblems/paragard: false,
	// qMethodProblems/implanon: false,
	// qMethodProblems/withd: false,
	qOtherMedications: false,
	qOtherHealthIssues: false,
	qWhenHaveChildren: false,
	qOtherQuestions: false,
	qMethodSpecific: false
};

//===== Set of functions that display user response when user inputs issues with contraceptives =====//
/* OCP means birth controll pills */
function processQMethodProblemsOCP(questionAndAnswerObject) {
	var answers = questionAndAnswerObject.answers;
	// Variable to store question and answer pair.
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);
		switch(questionAnswerPair[0]) {
			case "bodyChanges-breast-tenderness":
				q="Breast Tenderness";
				break;
        	case "bodyChanges-hair-loss":
        		q="Hair loss";
        		break;
        	case "bodyChanges-depression":
        		q="Depression or mood swings that clearly became worse on the method";
        		break;
        	case "bodyChanges-nausea-vomiting":
        		q="Nausea or vomiting";
        		break;
        	case "bodyChanges-weight-gain":
        		q="Weight gain";
        		break;
        	case "bodyChanges-migraines":
        		q="Migraines or very bad headaches";
        		break;
        	case "bodyChanges-other":
        		q="Other changes to my body";
        		break;
        	case "using-getting-problems":
        		q="I had problems getting the birth control";
        		break;
        	case "using-forgot-doses":
        		q="I forgot to take it or missed too many doses";
        		break;
        	case "using-restart-after-period": 
        		q="I didn't restart after stopping for my period";
        		break;
        	case "using-got-pregnant": 
        		q="I got pregnant";
        		break;
        	case "using-other": 
        		q="Another health problem";
        		break;
        	case "periods-prolonged-bleeding": 
        		q="I didn't like the prolonged bleeding";
        		break;
        	case "periods-heavy-bleeding": 
        		q="I didn't like the heavy bleeding";
        		break;
        	case "periods-irregular-bleeding": 
        		q="I didn't like the irregular bleeding";
        		break;
        	case "periods-absence-bleeding": 
        		q="I didn't like the absence of bleeding";
        		break;
        	case "periods-other":
        		q="I didn't like something else about my period";
        		break;
		}
		renderHTMLForContraceptiveProblems(q, questionAnswerPair[1]);
	}
}

function processQMethodProblemsCCAP(questionAndAnswerObject) {
	var answers = questionAndAnswerObject.answers;
	// Variable to store question and answer pair.
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);	
		switch(questionAnswerPair[0]) {
		    case "bodyChanges-cramping-pain":
		    	q="Cramping or pain";
		    	break;
	        case "bodyChanges-discharge":
	        	q="Discharge";
	        	break;
	        case "bodyChanges-other":
	        	q="Other changes to my body";
	        	break;
	        case "using-getting-problems":
	        	q="I had problems getting the birth control";
	        	break;
	        case "using-forgot-doses":
	        	q="I forgot to use it";
	        	break;
	        case "using-restart-after-period":
	        	q="I didn't restart after stopping for my period";
	        	break;
	        case "using-not-always-use":
	        	q="I didn't use it every time I had sex";
	        	break;
	        case "using-other":
	        	q="I had another problem using it correctly";
	        	break;
	        case "using-got-pregnant":
	        	q="I got pregnant";
	        	break;
	    }
	    renderHTMLForContraceptiveProblems(q, questionAnswerPair[1]);
	}
}

function processQMethodProblemsDiaph(questionAndAnswerObject) {
	var answers = questionAndAnswerObject.answers;
	// Variable to store question and answer pair.
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);	
		switch(questionAnswerPair[0]) {
			case "bodyChanges-cramping-pain":
				q="Cramping or pain";
				break;
	        case "bodyChanges-discharge":
	        	q="Discharge";
	        	break;
	        case "using-forgot-doses":
	        	q="I forgot to put it in";
	        	break;
	        case "using-restart-after-period":
	        	q="I didn't restart after stopping for my period";
	        	break;
	        case "using-not-always-use":
	        	q="I didn't use it every time I had sex";
	        	break;
	        case "using-other":
	        	q="I had another problem using it correctly";
	        	break;
	        case "using-got-pregnant":
	        	q="I got pregnant";
	        	break;
	        case "using-partner-like":
	        	q="My partner didn't like it";
	        	break;
		}
		renderHTMLForContraceptiveProblems(q, questionAnswerPair[1]);
	}
}

function processQMethodProblemsSperm(questionAndAnswerObject) {
	var answers = questionAndAnswerObject.answers;
		// Variable to store question and answer pair.
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);	
		switch(questionAnswerPair[0]) {
			case "using-getting-problems":
				q="I had problems getting the birth control";
				break;
	        case "using-restart-after-period":
	        	q="I didn't restart after stopping for my period";
	        	break;
	        case "using-not-always-use":
	        	q="I didn't use it every time I had sex";
	        	break;
	        case "using-other-no":
	        	q="I had another problem using it correctly";
	        	break;
	        case "using-got-pregnant":
	        	q="I got pregnant";
	        	break;
	        case "using-other":
	        	q="I had another problem using it correctly";
	        	break;
	        case "using-partner-like":
	        	q="My partner didn't like it";
	        	break;
		}
		renderHTMLForContraceptiveProblems(q, questionAnswerPair[1]);
	}
}

/* Mini pills */
function processQMethodProblemsPop(questionAndAnswerObject) {
	var answers = questionAndAnswerObject.answers;
		// Variable to store question and answer pair.
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);	
		switch(questionAnswerPair[0]) {
			case "bodyChanges-breast-tenderness":
				q="Breast tenderness";
				break;
	        case "bodyChanges-hair-loss":
	        	q="Hair loss";
	        	break;
	        case "bodyChanges-depression":
	        	q="Depression or mood swings that clearly became worse on the method";
	        	break;
	        case "bodyChanges-nausea-vomiting":
	        	q="Nausea or vomiting";
	        	break;
			case "bodyChanges-migraines":
				q="Migraines or very bad headaches";
				break;
	        case "bodyChanges-other":
	        	q="Other changes to my body";
	        	break;
	        case "using-getting-problems":
	        	q="I had problems getting the birth control";
	        	break;
	        case "using-forgot-doses":
	        	q="I forgot to take it or missed too many doses";
	        	break;
	        case "using-restart-after-period":
	        	q="I didn't restart after stopping for my period";
	        	break;
	        case "using-got-pregnant":
	        	q="I got pregnant";
	        	break;
	        case "using-partner-like":
	        	q="My partner didn't like it";
	        	break;
	        case "using-other":
	        	q="Another health problem";
	        	break;
	        case "periods-prolonged-bleeding":
	        	q="I didn't like the prolonged bleeding";
	        	break;
	        case "periods-heavy-bleeding":
	        	q="I didn't like the heavy bleeding";
	        	break;
	        case "periods-irregular-bleeding":
	        	q="I didn't like the irregular bleeding";
	        	break;
	        case "periods-absence-bleeding":
	        	q="I didn't like the absence of bleeding";
	        	break;
	        case "periods-other":
	        	q="I didn't like something else about my period";
	        	break;
		}
		renderHTMLForContraceptiveProblems(q, questionAnswerPair[1]);
	}
}

function processQMethodProblemsNuvaring(questionAndAnswerObject) {
	var answers = questionAndAnswerObject.answers;
		// Variable to store question and answer pair.
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);	
		switch(questionAnswerPair[0]) {
        	case "bodyChanges-breast-tenderness":
        		q = "Breast tenderness";
        		break;
        	case "bodyChanges-hair-loss":
        		q = "Hair loss";
        		break;
        	case "bodyChanges-depression":
        		q = "Depression or mood swings that clearly became worse on the method";
        		break;
        	case "bodyChanges-nausea-vomiting":
        		q = "Nausea or vomiting";
        		break;
        	case "bodyChanges-weight-gain":
        		q = "Weight gain";
        		break;
        	case "bodyChanges-migraines":
        		q = "Migraines or very bad headaches";
        		break;
        	case "bodyChanges-discharge":
        		q = "Discharge";
        		break;
        	case "bodyChanges-other":
        		q = "Other changes to my body";
        		break;
        	case "using-getting-problems":
        		q = "I had problems getting the birth control";
        		break;
        	case "using-forgot-doses":
        		q = "I forgot to put it in";
        		break;
        	case "using-restart-after-period":
        		q = "I didn't restart after stopping for my period";
        		break;
        	case "using-other":
        		q = "I had another problem using it correctly";
        		break;
        	case "using-got-pregnant":
        		q = "I got pregnant";
        		break;
        	case "using-partner-like":
        		q = "Another health problem";
        		break;
        	case "periods-prolonged-bleeding":
        		q = "I didn't like the prolonged bleeding";
        		break;
        	case "periods-heavy-bleeding":
        		q = "I didn't like the heavy bleeding";
        		break;
        	case "periods-irregular-bleeding":
        		q = "I didn't like the irregular bleeding";
        		break;
        	case "periods-absence-bleeding":
        		q = "I didn't like the absence of bleeding";
        		break;
        	case "periods-other":
        		q = "I didn't like something else about my period";
        		break;
		}
		renderHTMLForContraceptiveProblems(q, questionAnswerPair[1]);
	}
}	

function processQMethodProblemsDepo(questionAndAnswerObject) {
	var answers = questionAndAnswerObject.answers;
		// Variable to store question and answer pair.
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);	
		switch(questionAnswerPair[0]) {
			case "bodyChanges-breast-tenderness":
				q = "Breast tenderness";
				break;
	        case "bodyChanges-hair-loss":
	        	q = "Hair loss";
	        	break;
	        case "bodyChanges-depression":
	        	q = "Depression or mood swings that clearly became worse on the method";
	        	break;
	        case "bodyChanges-weight-gain":
	        	q = "Weight gain";
	        	break;
	        case "bodyChanges-migraines":
	        	q = "Migraines or very bad headaches";
	        	break;
	        case "bodyChanges-other":
	        	q = "Other changes to my body";
	        	break;
	        case "using-getting-problems":
	        	q = "I had problems getting the birth control";
	        	break;
	        case "using-forgot-doses":
	        	q = "I didn't get my next injection";
	        	break;
	        case "using-got-pregnant":
	        	q = "I got pregnant";
	        	break;
	        case "health-high-blood-pressure":
	        	q = "High blood pressure";
	        	break;
	        case "health-blood-clot":
	        	q = "Blood clot in vein or lungs";
	        	break;
	        case "health-stroke-heart-attack":
	        	q = "Stroke or heart attack";
	        	break;
	        case "health-other":
	        	q = "Another health problem";
	        	break;
	        case "periods-prolonged-bleeding":
	        	q = "I didn't like the prolonged bleeding";
	        	break;
	        case "periods-heavy-bleeding":
	        	q = "I didn't like the heavy bleeding";
	        	break;
	        case "periods-irregular-bleeding":
	        	q = "I didn't like the irregular bleeding";
	        	break;
	        case "periods-absence-bleeding":
	        	q = "I didn't like the absence of bleeding";
	        	break;
	        case "periods-other":
	        	q = "I didn't like something else about my period";
	        	break;
		}
		renderHTMLForContraceptiveProblems(q, questionAnswerPair[1]);
	}
}

function processQMethodProblemsNori(questionAndAnswerObject) {
	var answers = questionAndAnswerObject.answers;
		// Variable to store question and answer pair.
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);	
		switch(questionAnswerPair[0]) {
			case "bodyChanges-breast-tenderness":
				q="Breast tenderness";
				break;
        	case "bodyChanges-hair-loss":
        		q="Hair loss";
        		break;
        	case "bodyChanges-depression":
        		q="Depression or mood swings that clearly became worse on the method";
        		break;
        	case "bodyChanges-weight-gain":
        		q="Weight gain";
        		break;
        	case "bodyChanges-migraines":
        		q="Migraines or very bad headaches";
        		break;
        	case "bodyChanges-other":
        		q="Other changes to my body";
        		break;
        	case "using-getting-problems":
        		q="I had problems getting the birth control";
        		break;
        	case "using-forgot-doses":
        		q="I forgot to get it";
        		break;
        	case "using-got-pregnant":
        		q="I got pregnant";
        		break;
        	case "using-other":
        		q="Another health problem";
        		break;
        	case "periods-prolonged-bleeding":
        		q="I didn't like the prolonged bleeding";
        		break;
        	case "periods-heavy-bleeding":
        		q="I didn't like the heavy bleeding";
        		break;
        	case "periods-irregular-bleeding":
        		q="I didn't like the irregular bleeding";
        		break;
        	case "periods-absence-bleeding":
        		q="I didn't like the absence of bleeding";
        		break;
        	case "periods-other":
        		q="I didn't like something else about my period";
        		break;
		}
		renderHTMLForContraceptiveProblems(q, questionAnswerPair[1]);
	}
}

function processQMethodProblemsCyclomess(questionAndAnswerObject) {
	var answers = questionAndAnswerObject.answers;
		// Variable to store question and answer pair.
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);	
		switch(questionAnswerPair[0]) {
	        case "bodyChanges-breast-tenderness":
	        	q="Breast tenderness";
	        	break;
	        case "bodyChanges-hair-loss":
	        	q="Hair loss";
	        	break;
	        case "bodyChanges-depression":
	        	q="Depression or mood swings that clearly became worse on the method";
	        	break;
	        case "bodyChanges-weight-gain":
	        	q="Weight gain";
	        	break;
	        case "bodyChanges-migraines":
	        	q="Migraines or very bad headaches";
	        	break;
	        case "bodyChanges-other":
	        	q="Other changes to my body";
	        	break;
	        case "using-getting-problems":
	        	q="I had problems getting the birth control";
	        	break;
	        case "using-forgot-doses":
	        	q="I didn't get my next injection";
	        	break;
	        case "using-got-pregnant":
	        	q="I got pregnant";
	        	break;
	        case "health-high-blood-pressure":
	        	q="High blood pressure";
	        	break;
	        case "health-blood-clot":
	        	q="Blood clot in vein or lungs";
	        	break;
	        case "health-stroke-heart-attack":
	        	q="Stroke or heart attack";
	        	break;
	        case "health-other":
	        	q="Another health problem";
	        	break;
	        case "periods-prolonged-bleeding":
	        	q="I didn't like the prolonged bleeding";
	        	break;
	        case "periods-heavy-bleeding":
	        	q="I didn't like the heavy bleeding";
	        	break;
	        case "periods-irregular-bleeding":
	        	q="I didn't like the irregular bleeding";
	        	break;
	        case "periods-absence-bleeding":
	        	q="I didn't like the absence of bleeding";
	        	break;
	        case "periods-other":
	        	q="I didn't like something else about my period";
	        	break;
		}
		renderHTMLForContraceptiveProblems(q, questionAnswerPair[1]);
	}
}

function processQMethodProblemsMCondom(questionAndAnswerObject) {
	var answers = questionAndAnswerObject.answers;
		// Variable to store question and answer pair.
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);	
		switch(questionAnswerPair[0]) {
			case "using-getting-problems":
				q="I had problems getting the birth control";
				break;
	        case "using-forgot-doses":
	        	q="I forgot to use it";
	        	break;
	        case "using-not-always-use":
	        	q="I didn't use it every time I had sex";
	        	break;
	        case "using-other":
	        	q="I had another problem using it correctly";
	        	break;
	        case "using-got-pregnant":
	        	q="I got pregnant";
	        	break;
	        case "using-partner-like":
	        	q="My partner didn't like it";
	        	break;
		}
		renderHTMLForContraceptiveProblems(q, questionAnswerPair[1]);
	}
}

function processQMethodProblemsFCondom(questionAndAnswerObject) {
	var answers = questionAndAnswerObject.answers;
		// Variable to store question and answer pair.
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);	
		switch(questionAnswerPair[0]) {
	        case "using-getting-problems":
	        	q = "I had problems getting the birth control";
	        	break;
	        case "using-forgot-doses":
	        	q = "I forgot to use it";
	        	break;
	        case "using-restart-after-period":
	        	q = "I didn't restart after stopping for my period";
	        	break;
	        case "using-not-always-use":
	        	q = "I didn't use it every time I had sex";
	        	break;
	        case "using-other":
	        	q = "I had another problem using it correctly";
	        	break;
	        case "using-got-pregnant":
	        	q = "I got pregnant";
	        	break;
	        case "using-partner-like":
	        	q = "My partner didn't like it";
	        	break;
		}
		renderHTMLForContraceptiveProblems(q, questionAnswerPair[1]);
	}
}

function processQMethodProblemsSponge(questionAndAnswerObject) {
	var answers = questionAndAnswerObject.answers;
		// Variable to store question and answer pair.
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);	
		switch(questionAnswerPair[0]) {
	        case "bodyChanges-cramping-pain":
	        	q="Cramping or pain";
	        	break;
	        case "bodyChanges-discharge":
	        	q="Discharge";
	        	break;
	        case "bodyChanges-other":
	        	q="Other changes to my body";
	        	break;
	        case "using-getting-problems":
	        	q="I had problems getting the birth control";
	        	break;
	        case "using-restart-after-period":
	        	q="I didn't restart after stopping for my period";
	        	break;
	        case "using-not-always-use":
	        	q="I didn't use it every time I had sex";
	        	break;
	        case "using-other":
	        	q="I had another problem using it correctly";
	        	break;
	        case "using-got-pregnant":
	        	q="I got pregnant";
	        	break;
	        case "using-partner-like":
	        	q="My partner didn't like it";
	        	break;
		}
		renderHTMLForContraceptiveProblems(q, questionAnswerPair[1]);
	}
}

function processQMethodProblemsParagard(questionAndAnswerObject) {
	var answers = questionAndAnswerObject.answers;
		// Variable to store question and answer pair.
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);	
		switch(questionAnswerPair[0]) {
	        case "bodyChanges-cramping-pain":
	        	q="Cramping or pain";
	        	break;
	        case "bodyChanges-discharge":
	        	q="Discharge";
	        	break;
	        case "bodyChanges-other":
	        	q="Other changes to my body";
	        	break;
	        case "using-got-pregnant":
	        	q="I got pregnant";
	        	break;
	        case "using-partner-like":
	        	q="My partner didn't like it";
	        	break;
	        case "periods-prolonged-bleeding":
	        	q="I didn't like the prolonged bleeding";
	        	break;
	        case "periods-heavy-bleeding":
	        	q="I didn't like the heavy bleeding";
	        	break;
	        case "periods-irregular-bleeding":
	        	q="I didn't like the irregular bleeding";
	        	break;
	        case "periods-other":
	        	q="I didn't like something else about my period";
	        	break;
		}
		renderHTMLForContraceptiveProblems(q, questionAnswerPair[1]);
	}
}

function processQMethodProblemsImplanon(questionAndAnswerObject) {
	var answers = questionAndAnswerObject.answers;
		// Variable to store question and answer pair.
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);	
		switch(questionAnswerPair[0]) {
	        case "bodyChanges-breast-tenderness":
	        	q="Breast tenderness";
	        	break;
	        case "bodyChanges-hair-loss":
	        	q="Hair loss";
	        	break;
	        case "bodyChanges-depression":
	        	q="Depression or mood swings that clearly became worse on the method";
	        	break;
	        case "bodyChanges-nausea-vomiting":
	        	q="Nausea or vomiting";
	        	break;
	        case "bodyChanges-weight-gain":
	        	q="Weight gain";
	        	break;
	        case "bodyChanges-migraines":
	        	q="Migraines or very bad headaches";
	        	break;
	        case "bodyChanges-other":
	        	q="Other changes to my body";
	        	break;
	        case "using-got-pregnant":
	        	q="I got pregnant";
	        	break;
	        case "using-other":
	        	q="Another health problem";
	        	break;
	        case "periods-prolonged-bleeding":
	        	q="I didn't like the prolonged bleeding";
	        	break;
	        case "periods-heavy-bleeding":
	        	q="I didn't like the heavy bleeding";
	        	break;
	        case "periods-irregular-bleeding":
	        	q="I didn't like the irregular bleeding";
	        	break;
	        case "periods-absence-bleeding":
	        	q="I didn't like the absence of bleeding";
	        	break;
	        case "periods-other":
	        	q="I didn't like something else about my period";
	        	break;
		}
		renderHTMLForContraceptiveProblems(q, questionAnswerPair[1]);
	}
} 

function processQMethodProblemsWithdrawal(questionAndAnswerObject) {
	var answers = questionAndAnswerObject.answers;
		// Variable to store question and answer pair.
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);	
		switch(questionAnswerPair[0]) {
	        case "using-not-always-use":
	        	q="I didn't use it every time I had sex";
	        	break;
	        case "using-other":
	        	q="I had another problem using it correctly";
	        	break;
	        case "using-got-pregnant":
	        	q="I got pregnant";
	        	break;
	        case "using-partner-like":
	        	q="My partner didn't like it";
	        	break;
		}
		renderHTMLForContraceptiveProblems(q, questionAnswerPair[1]);
	}
} 

//==========//

//===== Health issues =====//
function processQSeriousHealthProblems(questionAndAnswerObject) {
	var answers = questionAndAnswerObject.answers;
		// Variable to store question and answer pair.
	var q;

	for (var prop in answers) {
		var questionAnswerPair = getUserResponse(prop);	
		switch(questionAnswerPair[0]) {
			case "cancer":
				q="Cancer";
				break
	        case "cancer-breast-liver":
	        	q="Have you ever had breast cancer, liver tumors or liver cancer?";
	        	break
	        case "cancer-endometrial-ovarian-cervical":
	        	q="Have you ever had endometrial cancer, ovarian cancer, or cervical cancer?";
	        	break
	        case "anemia":
	        	q="Anemia or blood-clotting problems";
	        	break
	        case "anemia-clotting-disorder":
	        	q="Do you have a clotting disorder?";
	        	break
	        case "anemia-sickle-cell":
	        	q="Do you have sickle cell anemia?";
	        	break
	        case "diabetes":
	        	q="Diabetes";
	        	break
	        case "diabetes-kidneys-eyes-nerves":
	        	q="Do you have problems with your kidneys, eyes or nerves from your diabetes?";
	        	break
	        case "diabetes-20-years":
	        	q="Have you had diabetes for more than 20 years?";
	        	break
	        case "migraine":
	        	q="Migraine headaches";
	        	break
	        case "migraine-aura":
	        	q="When you have a migraine headache, do you see an aura? An aura means seeing spots or wavy lines before or during the migraine headache.";
	        	break
	        case "migraine-medicines":
	        	q="Do you take any of these medicines for migraines? Topiramate, Topamax";
	        	break
	        case "seizures":
	        	q="Seizures";
	        	break
	        case "tuberculosis":
	        	q="Tuberculosis";
	        	break
	        case "heart":
	        	q="Heart disease, high blood pressure, or stroke";
	        	break
	        case "kidney_gallbladder_liver":
	        	q="Kidney, gallbladder or liver disease";
	        	break
	        case "hiv":
	        	q="HIV";
	        	break
	        case "ectopic":
	        	q="Molar or ectopic pregnancy";
	        	break
		}
		renderHTMLForContraceptiveProblems(q, questionAnswerPair[1]);
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

/* Handles I think the types of contraceptives I've used. */
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





