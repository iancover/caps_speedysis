
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
	var suggestResults = [];
	var ruleResults = results.formattedResults.ruleResults;
	for (var i in ruleResults) {
		var eachResult = ruleResults[i];
		console.log(eachResult);
		if (eachResult.ruleImpact < 3.0) continue;
				suggestResults.push({
					name: eachResult.localizedRuleName,
					impact: eachResult.ruleImpact,
				});	
			}
	// console.log(suggestResults);
	suggestResults.sort(function(a,b) {
	  	return b.impact - a.impact;
	});
	var listTemplate = $(HTML_SUGGESTIONS_TEMP);
	var listTempInsert = listTemplate.find('.js-pgspeed-suggestions');
	// console.log(listTemplate);
	for (var i = 0; i < suggestResults.length; ++i) {
		var impactScoreLong = suggestResults[i].impact;
		var impactScoreFixed = impactScoreLong.toFixed(2); 
		// console.log(suggestResults[i]);
		// if summary option...goes here	
		var resultListItem = (
			'<tr>' +
				'<td> Rule </td>' +
				'<td><a class="suggested-link" target="_blank">' + suggestResults[i].name + '</td>' +
				'<td>Impact Score: <span class="js-impact-score">' + impactScoreFixed + '</span></td><br>'  +
			'</tr>'
			);

		console.log(suggestResults);

		if (ruleResults == 'AvoidLandingPageRedirects') {
			console.log('AvoidLandingPageRedirects');
			var linkA = 'https://developers.google.com/speed/docs/insights/AvoidRedirects';
			resultListItem.find('.suggested-link').addAttr('href', linkA);
			// path: suggestResults.AvoidLandingPageRedirects.summary.args.0.value
		}

		if (ruleResults == 'EnableGzipCompression') {
			console.log('EnableGzipCompression');
			var linkB = 'https://developers.google.com/speed/docs/insights/EnableCompression';
			resultListItem.find('.suggested-link').addAttr('href', linkB);
			// path: suggestResults.EnableGzipCompression.summary.args.0.value
		}

		if (ruleResults == 'LeverageBrowserCaching') {
			console.log('LeverageBrowserCaching');
			var linkC = 'https://developers.google.com/speed/docs/insights/LeverageBrowserCaching';
			resultListItem.find('.suggested-link').addAttr('href', linkC);
			// path: suggestResults.LeverageBrowserCaching.urlBlocks.0.header.args.0.value
		}

		if (ruleResults == 'MainResourceServerResponseTime') {
			console.log('MainResourceServerResponseTime');
			var linkD = 'https://developers.google.com/speed/docs/insights/Server';
			resultListItem.find('.suggested-link').addAttr('href', linkD);
			// path: suggestResults.MainResourceServerResponseTime.urlBlocks.0.header.args.1.value
		}

		if (ruleResults == 'MinifyCss') {
			console.log('MinifyCss');
			var linkE = 'https://developers.google.com/speed/docs/insights/MinifyResources';
			resultListItem.find('.suggested-link').addAttr('href', linkE);
			// path: suggestResults.MinifyCss.summary.args.0.value
		}

		if (ruleResults == 'MinifyHTML') {
			console.log('MinifyHTML');
			var linkF = 'https://developers.google.com/speed/docs/insights/MinifyResources';
			resultListItem.find('.suggested-link').addAttr('href', linkF);
			// path: suggestResults.MinifyHTML.urlBlocks.0.header.args.0.value
		}

		if (ruleResults == 'MinifyJavaScript') {
			console.log('MinifyJavaScript');
			var linkG = 'https://developers.google.com/speed/docs/insights/MinifyResources';
			resultListItem.find('.suggested-link').addAttr('href', linkG);
			// path: suggestResults.MinifyJavaScript.summary.args.0.value 
		}

		if (ruleResults == 'MinimizeRenderBlockingResources') {
			console.log('MinimizeRenderBlockingResources');
			var linkH = 'https://developers.google.com/speed/docs/insights/BlockingJS';
			resultListItem.find('.suggested-link').addAttr('href', linkH);
			// path: suggestResults.MinimizeRenderBlockingResources.urlBlocks.1.args.0.value
		}

		if (ruleResults == 'suggestResults.OptimizeImages') {
			console.log('OptimizeImages');
			var linkI = 'https://developers.google.com/speed/docs/insights/OptimizeImages';
			resultListItem.find('.suggested-link').addAttr('href', linkI);
			// path: suggestResults.OptimizeImages.urlBlocks.0.header.args.0.value
		}

		if (ruleResults == 'PrioritizeVisibleContent') {
			console.log('PrioritizeVisibleContent');
			var linkJ= 'https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent';
			resultListItem.find('.suggested-link').addAttr('href', linkJ);
			// path: suggestResults.PrioritizeVisibleContent.urlBlocks.0.header.args.0.value
		}

		listTempInsert.append(resultListItem);
	}
  	// console.log(listTemplate);
  	return listTemplate;
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
		var targetURL = 'http://www.' + inputURL.val();
		inputURL.val("");
		// console.log('watchSubmit running'); 
		getDataApi(targetURL, displayApiData);
	});
}

$(formSubmit);
















// *** Additional for Summary Option

	// Line 54 aprox

	// if (eachResult.summary) { 
	// 	suggestResults.push({
	// 		name: eachResult.localizedRuleName,
	// 		impact: eachResult.ruleImpact,
	// 		summary: parseSummary(eachResult.summary)
	// 	});	
	// } else {

// var summary = ((suggestResults[i].summary && suggestResults[i].summary.format) ? '<dd>' + suggestResults[i].summary.format + '</dd><br>' : '');
























 