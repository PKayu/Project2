const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// tell it to use the public directory as one where static files live
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// set up a rule that says requests to "/math" should be handled by the
// handleMath function below
app.get('/math', handleMath);

// start the server listening
app.listen(port, function() {
  console.log('Node app is running on port', port);
});


/**********************************************************************
 * Ideally the functions below here would go into a different file
 * but for ease of reading this example and seeing all of the pieces
 * they are listed here.
 **********************************************************************/

function handleMath(request, response) {
	const postage = request.query.postage;
	const weight = Number(request.query.weight);

	calculatePostage(response, postage, weight);
}

function calculatePostage(response, postage, weight) {
	let result = 0;

	if (postage == "Letters (Stamped)") {
		if(weight <= 1){
			result = .55;
		}else if(weight <=2 ) {
			result = .70;
		}else if(weight <= 3) {
			result = .85;
		} else {
			result = 1;
		}
	} else if (postage == "Letters (Metered)") {
		if(weight <= 1){
			result = .50;
		}else if(weight <=2 ) {
			result = .65;
		}else if(weight <= 3) {
			result = .80;
		} else {
			result = .95;
		}
	} else if (postage == "Large Envelopes (Flats)") {
		if(weight <= 1){
			result = 1;
		} else {
			result = 1 + ((Math.round(weight) * .15) - .15);
		}
	} else if (postage == "First-Class Package Service—Retail") {
		if(weight <= 4){
			result = 3.66;
		}else if(weight <= 8) {
			result = 4.39;
		}else if(weight <= 12) {
			result = 5.19;
		} else {
			result = 5.71;
		}
	} else {
		//unknown
	}
	result = result.toPrecision(2);

	// Set up a JSON object of the values we want to pass along to the EJS result page
	const params = {postage: postage, weight: weight, result: result};

	// Render the response, using the EJS page "result.ejs" in the pages directory
	// Makes sure to pass it the parameters we need.
	response.render('pages/result', params);

}

