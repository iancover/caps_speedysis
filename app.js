

var GOOGLE_API_URL = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?callback=?';

var API_KEY = 'AIzaSyD01Sfue8NJalRTGWxfP5UpjpqBoCW2LG4';

var CHART_API_URL = 'http://chart.apis.google.com/chart?';

var HTML_SCORE_CHART_TEMP = (
	'<div class="js-score-temp">' +
		'<img class="js-score-chart" src="">' +			
	'</div>'	
);

var HTML_SUGGESTIONS_TEMP = (
	'<div class="js-suggestions-temp">' +
		'<ul class="js-pgspeed-suggestions" hidden>' +
		'</ul>' +
	'</div>'
);

function getDataApi(searchURL, callback) {
	var query = {
	  	url: searchURL,
	  	key: API_KEY,
	};

	console.log('getDataApi running');
	$.getJSON(GOOGLE_API_URL, query, callback);
}

function renderResults(results) {
	var charTemp = $(HTML_SCORE_CHART_TEMP);
	var listTemplate = $(HTML_SUGGESTIONS_TEMP);

  	var speedScore = results.ruleGroups.SPEED.score;
  	var chartQuery = [
	    'chtt=Page+Speed+score:+' + speedScore,
	    'chs=180x100',
	    'cht=gom',
	    'chd=t:' + speedScore,
	    'chxt=x,y',
	    'chxl=0:|' + speedScore,
	  ].join('&');

  	var imgSRC = CHART_API_URL + chartQuery;
	
	var resultList = listTemplate.find('.js-pgspeed-suggestions');

	var suggestResults = [];
	var ruleResults = suggestResults.formattedResults.ruleResults;

	for (var i in ruleResults) {
		var ruleResult = ruleResults[i];
		if (ruleResult.ruleImpact < 3.0) continue;
			suggestResults.push({
				name: ruleResult.localizedRuleName,
				impact: ruleResult.ruleImpact,
				summary: ruleResult.summary.format
				});
	} 
	console.log('Suggestions Rendering')
	console.log(suggestResults);

	suggestResults.sort(function(a,b) {
	  	return b.impact - a.impact;
	});
	
	for (var i = 0; i < results.length; ++i) {
		var resultListItem = '<li>' + suggestResults[i].name + '</li>'; // need to add impact + summary
		resultList.append(resultItem);
	}
 	if (resultList.hasChildNodes()) {
 		resultList.show();
  	} else {
    	$('.js-suggestions-temp').html('No high impact suggestions. Good job!');
  	}

  	console.log('renderResults running');

  	charTemp.find('.js-score-chart').attr('src', imgSRC);
	$('.js-results').html(charTemp);

// *** ALTERNATIVE TO PREVIOUS LOOP ***
	// var impactScore = ruleResult.ruleImpact > 3.0;
	// var ruleResultDetails = {
	// 		name: ruleResult.localizedRuleName,
	// 		impact: ruleResult.ruleImpact,
	// 		summary: ruleResult.summary.format
	// }

	// results.filter() {
	// 	for (impactScore in results) {
	// 		return ruleResultDetails;
	// 	}
	// };
}

function displayApiData(data) {
	if (data.error) {
    	var errorDisplay = data.error.errors.message;
    	$('form').find('.js-error-msg').show().val(errorDisplay);
    } else {
		var results = data.map(function(item, index) {	
			console.log('displayApiData running');
			return renderResults(results);
		});
    }
}

function formSubmit() {
	$('.js-searchform').submit(function(event) {
		event.preventDefault();
		$('#js-results-container').removeAttr('class');

		var inputURL = $(document).find('.js-url-input');
		var targetURL = 'http://www.' + inputURL.val() + '.com';
		inputURL.val("");

		console.log('watchSubmit running');
		getDataApi(targetURL, displayApiData);
	});
}

$(formSubmit);









// var GOOGLE_API_URL = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?';
// // for JSONP --> 'callback=?'

// var CHART_API_URL = 'http://chart.apis.google.com/chart?';

// var API_KEY = 'AIzaSyD01Sfue8NJalRTGWxfP5UpjpqBoCW2LG4';


// var HTML_SCORE_CHART_TEMP = (
// 	'<div class="js-score-temp">' +
// 		'<img class="js-score-chart" src="">' +			
// 	'</div>'	
// );




// function runPageSpeed(targetURL) {
//   var s = document.createElement('script');
//   s.type = 'text/javascript';
//   s.async = true;
//   var query = [
//     'url=' + targetURL,
//     'callback=runPagespeedCallbacks',
//     'key=' + API_KEY,
//   ].join('&');
//   s.src = GOOGLE_API_URL + query;

//   console.log('runPagespeed running');
//   console.log(query);
//   document.head.insertBefore(s, null);
// }

// function runPagespeedCallbacks(result) { 
// 	console.log('runPagespeed running');
// }


// function watchSubmit() {
// 	$('.js-searchform').submit(function(event) {
// 		event.preventDefault();

// 		var inputURL = $(document).find('.js-url-input');
// 		var targetURL = 'http://www.' + inputURL.val() + '.com';
// 		inputURL.val("");

// 		$('#js-results-container').removeAttr('class');

// 		console.log('watchSubmit running');

// 		runPageSpeed(targetURL);
// 	});
// }


// $(watchSubmit);































// 