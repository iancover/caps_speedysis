


var GOOGLE_API_URL = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?callback=?';
// note: 'callback=?' tells your requestin JSONP

var CHART_API_URL = 'http://chart.apis.google.com/chart?';
var API_KEY: 'AIzaSyD01Sfue8NJalRTGWxfP5UpjpqBoCW2LG4';

var HTML_TEMPLATE = {
	// need to finish html template
};


getApiData(searchURL, callback) {
  var query = {
    url: searchURL,
    key: API_KEY,
    prettyprint: true,
  };

	console.log('getApiData running');
	console.log(query);

	$getJSON(GOOGLE_API_URL, query, displayApiData);
}

renderResults(results) {
	var template = $(HTML_TEMPLATE);
	// find each element and insert values
	return template;
}

displayApiData(data) {
	var results = data.items.map(function(item, index) {
		return renderResults;
	});
	$('.js-results').html(results);
}

function watchSubmit() {
	$('.js-searchform').submit(function(event) {
		event.preventDefault();
		var valueURL = $(event).find('').val();
		var targetURL = valueURL.val();
		valueURL.val("");
		$('.results-container').show();

		console.log('watchSubmit');
		getApiData(targetURL, displayApiData);
	});
}

$(watchSubmit);

var callbacks = {}



// Our JSONP callback. Checks for errors, then invokes our callback handlers.
function runPagespeedCallbacks(result) {
  if (result.error) {
    var errors = result.error.errors;
    for (var i = 0, len = errors.length; i < len; ++i) {
      if (errors[i].reason == 'badRequest' && API_KEY == 'yourAPIKey') {
        alert('Please specify your Google API key in the API_KEY variable.');
      } else {
        // NOTE: your real production app should use a better
        // mechanism than alert() to communicate the error to the user.
        alert(errors[i].message);
      }
    }
    return;
  }

  // Dispatch to each function on the callbacks object.
  for (var fn in callbacks) {
    var f = callbacks[fn];
    if (typeof f == 'function') {
      callbacks[fn](result);
    }
  }
}

// Invoke the callback that fetches results. Async here so we're sure
// to discover any callbacks registered below, but this can be
// synchronous in your code.
setTimeout(runPagespeed, 0);
//  PageSpeed Insights:
// 		overview: https://developers.google.com/speed/docs/insights/about
//		info returned:
//				score - 0-100 'speed' and 'usability'
//				rule - 

// parameters: 
//			prettyprint: true - returns reponse in human readable format
//			url: string - use to fetch and analyze
//			strategy: string (acceptable values: 'desktop' or 'mobile')
//			locale: 'en';

// paths: 
// 		for speed and usability scores:
//					data.usability.score & data.speed.score
//		
//

//	API INFO:
//  	endpoint: https://www.googleapis.com/pagespeedonline/v1/
//		
// 		

// Display PageSpeed as Google-O-Meter

// callbacks.displayPageSpeedScore = function(result) {
//   var score = result.score;
//   // Construct the query to send to the Google Chart Tools.
//   var query = [
//     'chtt=Page+Speed+score:+' + score,
//     'chs=180x100',
//     'cht=gom',
//     'chd=t:' + score,
//     'chxt=x,y',
//     'chxl=0:|' + score,
//   ].join('&');
//   var i = document.createElement('img');
//   i.src = CHART_API_URL + query;
//   document.body.insertBefore(i, null);
// };

// // Display Top Page Speed Suggestions:

// callbacks.displayTopPageSpeedSuggestions = function(result) {
//   var results = [];
//   var ruleResults = result.formattedResults.ruleResults;
//   for (var i in ruleResults) {
//     var ruleResult = ruleResults[i];
//     // Don't display lower-impact suggestions.
//     if (ruleResult.ruleImpact < 3.0) continue;
//     results.push({name: ruleResult.localizedRuleName,
//                   impact: ruleResult.ruleImpact});
//   }
//   results.sort(sortByImpact);
//   var ul = document.createElement('ul');
//   for (var i = 0, len = results.length; i < len; ++i) {
//     var r = document.createElement('li');
//     r.innerHTML = results[i].name;
//     ul.insertBefore(r, null);
//   }
//   if (ul.hasChildNodes()) {
//     document.body.insertBefore(ul, null);
//   } else {
//     var div = document.createElement('div');
//     div.innerHTML = 'No high impact suggestions. Good job!';
//     document.body.insertBefore(div, null);
//   }
// };

// // Helper function that sorts results in order of impact.
// function sortByImpact(a, b) { return b.impact - a.impact; }


// // Display resource size breakdown pie chart

// var RESOURCE_TYPE_INFO = [
//   {label: 'JavaScript', field: 'javascriptResponseBytes', color: 'e2192c'},
//   {label: 'Images', field: 'imageResponseBytes', color: 'f3ed4a'},
//   {label: 'CSS', field: 'cssResponseBytes', color: 'ff7008'},
//   {label: 'HTML', field: 'htmlResponseBytes', color: '43c121'},
//   {label: 'Flash', field: 'flashResponseBytes', color: 'f8ce44'},
//   {label: 'Text', field: 'textResponseBytes', color: 'ad6bc5'},
//   {label: 'Other', field: 'otherResponseBytes', color: '1051e8'},
// ];

// callbacks.displayResourceSizeBreakdown = function(result) {
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
//   // Construct the query to send to the Google Chart Tools.
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