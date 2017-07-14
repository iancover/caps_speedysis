


var GOOGLE_API_URL = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?';
// for JSONP --> 'callback=?'

var CHART_API_URL = 'http://chart.apis.google.com/chart?';

var API_KEY = 'AIzaSyD01Sfue8NJalRTGWxfP5UpjpqBoCW2LG4';


var HTML_SCORE_CHART_TEMP = (
	'<div class="js-score-temp">' +
		'<img class="js-score-chart" src="">' +			
	'</div>'	
);




function runPageSpeed(targetURL) {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  var query = [
    'url=' + targetURL,
    'callback=runPagespeedCallbacks',
    'key=' + API_KEY,
  ].join('&');
  s.src = GOOGLE_API_URL + query;

  console.log('runPagespeed running');
  console.log(query);
  document.head.insertBefore(s, null);
}

function runPagespeedCallbacks(result) { 
	console.log('runPagespeed running');
}


function watchSubmit() {
	$('.js-searchform').submit(function(event) {
		event.preventDefault();

		var inputURL = $(document).find('.js-url-input');
		var targetURL = 'http://www.' + inputURL.val() + '.com';
		inputURL.val("");

		$('.results-container').show();

		console.log('watchSubmit running');

		runPageSpeed(targetURL);
	});
}


$(watchSubmit);


// *** PREVIOUS SCRIPT

// function getDataApi(searchURL, callback) {
// 	var query = {
// 	  	url: searchURL,
// 	  	key: API_KEY,
// 	  	callback: callback
// 	};

// 	console.log('getDataApi running');
// 	$.getJSON(GOOGLE_API_URL, query);
// }

// function renderResults(results) {
//   	var score = results.score;
//   	var query = [
// 	    'chtt=Page+Speed+score:+' + score,
// 	    'chs=180x100',
// 	    'cht=gom',
// 	    'chd=t:' + score,
// 	    'chxt=x,y',
// 	    'chxl=0:|' + score,
// 	  ].join('&');

//   	var imgSRC = CHART_API_URL + query;

// 	var template = $(HTML_SCORE_CHART_TEMP);
// 	template.find('.js-score-chart').attr('src', imgSRC)

// 	console.log('renderResults running');
// 	return template;
// }

// function displayApiData(data) {
// 	var results = data.map(function(item, index) {
// 		return renderResults;
// 	});

// 	console.log('displayApiData running');
// 	$('.js-results').html(results);
// }





// *** SUGGESTIONS ****


// var HTML_SUGGESTIONS_TEMP = (
// 	'<div class="js-suggestions-temp">' +
// 		'<ul class="js-pgspeed-suggestions">' +
// 		'</ul>' +
// 	'</div>'
// );

// function displayTopPageSpeedSuggestions(result) {
//   var listTemplate = $(HTML_SUGGESTIONS_TEMP);
//   var resultList = listTemplate.find('.js-pgspeed-suggestions').val();

//   var results = [];
//   var ruleResults = result.formattedResults.ruleResults;
// 	  for (var i in ruleResults) {
// 	    var ruleResult = ruleResults[i];
// 	    if (ruleResult.ruleImpact < 3.0) continue;
// 	    results.push({name: ruleResult.localizedRuleName,
// 	                  impact: ruleResult.ruleImpact});
// 	  }
// 	  results.sort(function(a,b) {
// 	  	return b.impact - a.impact;
// 	  });

//   var resultList = listTemplate.();

//   for (var i = 0; i < results.length; ++i) {
//   	var resultItem = '<li>' + results[i].name '</li>';
//  	resultList.append(resultItem);
//   }

//   if (resultList.hasChildNodes()) {

//   } else {
//     var noHighImpact = '<div>No high impact suggestions. Good job!</div>' +
//     $('.js-suggestions-temp').html(noHighImpact);
//   }

// };





// *** RESOURCE BREAKDOWN CHART ****


// var HTML_BREAKDOWN_CHART_TEMP = (
// 	'<div class="js-breakdown-temp">' +
// 		'<img class="js-breakdown-chart" src="">' +
// 	'</div>'
// 	);

// var RESOURCE_TYPE_INFO = [
//   {label: 'JavaScript', field: 'javascriptResponseBytes', color: 'e2192c'},
//   {label: 'Images', field: 'imageResponseBytes', color: 'f3ed4a'},
//   {label: 'CSS', field: 'cssResponseBytes', color: 'ff7008'},
//   {label: 'HTML', field: 'htmlResponseBytes', color: '43c121'},
//   {label: 'Flash', field: 'flashResponseBytes', color: 'f8ce44'},
//   {label: 'Text', field: 'textResponseBytes', color: 'ad6bc5'},
//   {label: 'Other', field: 'otherResponseBytes', color: '1051e8'},
// ];

// function displayResourceSizeBreakdown(result) {
//   var stats = result.pageStats;
//   var labels = [];
//   var data = [];
//   var colors = [];
//   var totalBytes = 0;
//   var largestSingleCategory = 0;
//   for (var i = 0, len = RESOURCE_TYPE_INFO.length; i < len; ++i) {
//     var label = RESOURCE_TYPE_INFO[i].label;
//     var field = RESOURCE_TYPE_INFO[i].field;
//     var color = RESOURCE_TYPE_INFO[i].color;
//     if (field in stats) {
//       var val = Number(stats[field]);
//       totalBytes += val;
//       if (val > largestSingleCategory) largestSingleCategory = val;
//       labels.push(label);
//       data.push(val);
//       colors.push(color);
//     }
//   }

//   var query = [
//     'chs=300x140',
//     'cht=p3',
//     'chts=' + ['000000', 16].join(','),
//     'chco=' + colors.join('|'),
//     'chd=t:' + data.join(','),
//     'chdl=' + labels.join('|'),
//     'chdls=000000,14',
//     'chp=1.6',
//     'chds=0,' + largestSingleCategory,
//   ].join('&');
//   var i = document.createElement('img'); // use jquery
//   i.src = 'http://chart.apis.google.com/chart?' + query;
//   document.body.insertBefore(i, null);
// };




























// 