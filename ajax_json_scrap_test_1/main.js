console.log("Hello, world!");
debugger;
// Fetches the button from the document
var btn = document.getElementById("demo");

var animalContainer = document.getElementById("animal-info");

btn.addEventListener("click", function() {
	// Fetches the file online
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-1.json');

	// Logs the data onto the console
	ourRequest.onload = function() {
		var ourData = JSON.parse(ourRequest.responseText);
		renderHTML(ourData);
	}

	ourRequest.send();
});

// Function is to have a sole job to log onto HTML.
function renderHTML(data) {
	var htmlString = "";

	for (i = 0; i < data.length; i ++) {
		htmpString += "<p>" + data[i].name + " is a " + data[i].species + ".</p>";
	}

	animalContainer.insertAdjacentHTML('beforeend', htmlString);
}
