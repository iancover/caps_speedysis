

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
		'<dl class="js-pgspeed-suggestions">' +
		'</dl>' +
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

function renderSuggestions(results) {
  	console.log('renderSuggestions running')
	var suggestResults = [];
	var ruleResults = results.formattedResults.ruleResults;

	for (var i in ruleResults) {
		var eachResult = ruleResults[i];
		console.log(eachResult);
		if (eachResult.ruleImpact < 3.0) continue;
			// if (eachResult.summary) { 
			// 	suggestResults.push({
			// 		name: eachResult.localizedRuleName,
			// 		impact: eachResult.ruleImpact,
			// 		summary: parseSummary(eachResult.summary)
			// 	});	
			// } else {
				suggestResults.push({
					name: eachResult.localizedRuleName,
					impact: eachResult.ruleImpact,
				});	
			}
	// } 

 
	// function parseSummary(summary, results) {
	// 	var numScripts = results.pageStats.numberJsResources;
	// 	var numCss = esults.pageStats.numberCssResources;
	// 	return summary
	// 	.replace('{{NUM_SCRIPTS}}', numScripts)
	// 	.replace('{{NUM_CSS}}', numCSs)
	// }
	
	console.log(suggestResults);
	suggestResults.sort(function(a,b) {
	  	return b.impact - a.impact;
	});

	var listTemplate = $(HTML_SUGGESTIONS_TEMP);
	var resultList = listTemplate.find('.js-pgspeed-suggestions');

	for (var i = 0; i < suggestResults.length; ++i) {
		var impactScoreLong = suggestResults[i].impact;
		var impactScoreFixed = impactScoreLong.toFixed(2); // limits score 2 decimals
		console.log(suggestResults[i]);
		// var summary = ((suggestResults[i].summary && suggestResults[i].summary.format) ? '<dd>' + suggestResults[i].summary.format + '</dd><br>' : '');
		var resultListItem = (
			'<dt>' + suggestResults[i].name + '</dt><br>' +
			'<dd>Impact Score: <span class="js-impact-score">' + impactScoreFixed + '</span></dd><br>' 
			// + summary
			);

		resultList.append(resultListItem);
	}
 	if (resultList[0].hasChildNodes()) {
 		resultList.show();
  	} else {
    	$('.js-suggestions-temp').html('No high impact suggestions. Good job!');
  	}
  	console.log(listTemplate);
  	return listTemplate;
}

function renderChart(results) {
	console.log('renderChart is running')
	var charTemp = $(HTML_SCORE_CHART_TEMP);
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
  	charTemp.find('.js-score-chart').attr('src', imgSRC);

  	console.log(charTemp);
  	return charTemp;

// *** ALTERNATIVE TO PREVIOUS LOOP ***
	// var impactScore = eachResult.ruleImpact > 3.0;
	// var eachResultDetails = {
	// 		name: eachResult.localizedRuleName,
	// 		impact: eachResult.ruleImpact,
	// 		summary: eachResult.summary.format
	// }

	// results.filter() {
	// 	for (impactScore in results) {
	// 		return eachResultDetails;
	// 	}
	// };
}

function displayApiData(data) {
	console.log('displayApiData running');
	console.log(data);
	if (data.error) {
    	var errorDisplay = data.error.errors.message;
    	$('form').find('.js-error-msg').show().val(errorDisplay);
    } else {
		var charTemp = renderChart(data);
		var listTemplate = renderSuggestions(data);

		$('.js-results').html(charTemp);
    	$('.js-results').append(listTemplate);
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