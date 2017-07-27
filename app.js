
var GOOGLE_API_URL = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?callback=?';

var CHART_API_URL = 'http://chart.apis.google.com/chart?';

var API_KEY = 'AIzaSyD01Sfue8NJalRTGWxfP5UpjpqBoCW2LG4';

var HTML_SCORE_CHART_TEMP = (
	'<div class="js-score-temp">' +
		'<img class="js-score-chart" src="">'  +		
	'</div>'	+
	'<br>'
);

var HTML_SUGGESTIONS_TEMP = (
	'<div id="table-results">' +
		'<h3>Results Table</h3>' +
		// '<h4>For additional info click the link.</h4>' +
		'<div class="table-wrapper">' +
			'<table>' +
				'<thead>' +
					'<tr>' +
						'<th>Rule</th>' +
						'<th>Suggestions</th>' +
						'<th>Score</th>' +
					'</tr>' +
				'</thead>' +
				'<tbody class="js-pgspeed-suggestions">' +
				'</tbody>'  +
			'</table>' +
		'</div>' +
	'</div>'
);


function getDataApi(searchURL, callback) {
	var query = {
	  	url: searchURL,
	  	key: API_KEY,
	};
	// console.log('getDataApi running');
	$.getJSON(GOOGLE_API_URL, query, callback);
}

function renderSuggestions(results) {
  	// console.log('renderSuggestions running')
	var suggestResult = [];
	var ruleResults = results.formattedResults.ruleResults;
	for (var i in ruleResults) {
		var eachResult = ruleResults[i];
		if (eachResult.ruleImpact < 3.0) continue;
			suggestResult.push({
				name: eachResult.localizedRuleName,
				impact: eachResult.ruleImpact,
				href: getLink(i, ruleResults)
			});	
	}
	// console.log(suggestResult);
	suggestResult.sort(function(a,b) {
	  	return b.impact - a.impact;
	});
	var listTemplate = $(HTML_SUGGESTIONS_TEMP);
	var listTempInsert = listTemplate.find('.js-pgspeed-suggestions');
	// console.log(listTemplate);
	for (var i = 0; i < suggestResult.length; ++i) {
		var impactScoreLong = suggestResult[i].impact;
		var impactScoreFixed = impactScoreLong.toFixed(2); 	
		var resultListItem = (
			'<tr>' +
				'<td> Rule </td>' +
				'<td><a href="' + suggestResult[i].href + '" target="_blank">' + suggestResult[i].name + '</td>' +
				'<td>Impact Score: <span class="js-impact-score">' + impactScoreFixed + '</span></td><br>'  +
			'</tr>'
			);

		listTempInsert.append(resultListItem);
	}
  	return listTemplate;
}

function getLink(ruleName, ruleNameResult) {
	var linkA = 'https://developers.google.com/speed/docs/insights/AvoidRedirects';
	var linkB = 'https://developers.google.com/speed/docs/insights/EnableCompression';
	var linkC = 'https://developers.google.com/speed/docs/insights/LeverageBrowserCaching';
	var linkD = 'https://developers.google.com/speed/docs/insights/Server';
	var linkE = 'https://developers.google.com/speed/docs/insights/MinifyResources';
	var linkF = 'https://developers.google.com/speed/docs/insights/MinifyResources';
	var linkG = 'https://developers.google.com/speed/docs/insights/MinifyResources';
	var linkH = 'https://developers.google.com/speed/docs/insights/BlockingJS';
	var linkI = 'https://developers.google.com/speed/docs/insights/OptimizeImages';
	var linkJ= 'https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent';
		
	switch(ruleName) {
		case 'AvoidLandingPageRedirects':
		return linkA;

		case 'EnableGzipCompression':
		return linkB;

		case 'LeverageBrowserCaching':
		return linkC;

		case 'MainResourceServerResponseTime':
		return linkD;

		case 'MinifyCss':
		return linkE;

		case 'MinifyHTML':
		return linkF;

		case 'MinifyJavaScript':
		return linkG;

		case 'MinimizeRenderBlockingResources':
		return linkH;

		case 'OptimizeImages':
		return linkI;

		case 'PrioritizeVisibleContent':
		return linkJ;
	}
}

function renderChart(results) {
	// console.log('renderChart is running');
	var charTemplate = $(HTML_SCORE_CHART_TEMP);
	var charTempImg = charTemplate.find('.js-score-chart');
  	var speedScore = results.ruleGroups.SPEED.score;
  	var chartQuery = [
	    'chtt=Page+Speed+score:+' + speedScore,
	    'chs=200x120',
	    'cht=gom',
	    'chd=t:' + speedScore,
	    'chxt=x,y',
	    'chxl=0:|' + speedScore,
	  ].join('&');
  	var imgSRC = CHART_API_URL + chartQuery;
  	charTempImg.attr('src', imgSRC);
  	// console.log(charTemplate);
  	return charTemplate;
}

function displayApiData(data) {
	// console.log('displayApiData running');
	// console.log(data);
	$(document).ready(function() {
		$('#loader').hide();
		// console.log('loader hide');
	});

	if (data.error) {
    		var errorDisplay = data.error.message;
    		$('form').find('.js-error-msg').show().val(errorDisplay);
    	} else {
		var charTemp = renderChart(data);
		var listTemplate = renderSuggestions(data);

	$('.content').append(charTemp);
    	$('.content').append(listTemplate);
    }
}

function formSubmit() {
	$('.search-bar_button').submit(function(event) {
		event.preventDefault();
		$("body").scrollTop(2000);
		$('#loader').show();
		$('.content').html('');
		$('#landing-info').hide();
		var inputURL = $(document).find('#query');
		var passURL = inputURL.val();
		inputURL.val("");
		// console.log('watchSubmit running'); 
		getDataApi(passURL, displayApiData);
	});
}

$(document).ready(function() {
	$(this).scrollTop(0);
});

$(formSubmit);


 