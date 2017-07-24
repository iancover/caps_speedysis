
var GOOGLE_API_URL = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?callback=?';

var CHART_API_URL = 'http://chart.apis.google.com/chart?';

var API_KEY = 'AIzaSyD01Sfue8NJalRTGWxfP5UpjpqBoCW2LG4';



var HTML_SCORE_CHART_TEMP = (
	'<div class="js-score-temp">' +
		'<img class="js-score-chart" src="">' +			
	'</div>'	
);

var HTML_SUGGESTIONS_TEMP = (
		'<tbody="js-pgspeed-suggestions">' +
		'</tbody>' 
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
			'<tr>' +
				'<td> Rule </td>' +
				'<td>' + suggestResults[i].name + '</td>' +
				'<td>Impact Score: <span class="js-impact-score">' + impactScoreFixed + '</span></td><br>'  +
			'</tr>'
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
}

function displayApiData(data) {
	console.log('displayApiData running');
	console.log(data);

	$(document).ready(function() {
	$('#loader').hide();
	console.log('loader hide/show working');

	$('#table-results').removeAttr('hidden');
 	console.log('results container displaying');
	});
	if (data.error) {
    		var errorDisplay = data.error.message;
    		console.log(data.error);
    		console.log(data.error.message);
    		console.log(errorDisplay);
    		$('form').find('.js-error-msg').show().val(errorDisplay);
    	} else {
		var charTemp = renderChart(data);
		var listTemplate = renderSuggestions(data);

		console.log(listTemplate);
	$('.content').prepend(charTemp);
    	$('table').append(listTemplate);
    }
}

function formSubmit() {
	$('.search-bar_button').submit(function(event) {
		event.preventDefault();

		$('#loader').show();
		$('#landing-info').hide();

		var inputURL = $(document).find('#query');
		var targetURL = 'http://' + inputURL.val();    //  or this-->.  'http://www.' + inputURL.val() + '.com';
		inputURL.val("");

		console.log('watchSubmit running');
		getDataApi(targetURL, displayApiData);
	});
}



$(formSubmit);

















































 