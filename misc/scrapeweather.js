/**
 * Created by letty on 11.04.17.
 */

var async = require('async');
var fs = require('fs');
var request = require('request');

async.times(31, function (n, next) {
	var day = n+1;
	if (day < 10) day = '0' + day;
	request.get({
			url: 'http://api.wunderground.com/api/API_KEY_GOES_HERE/history_201603' + day + '//q/zmw:00000.1.10382.json',
			json: true
		},
		function (error, response, body) {
			var d = body.history.dailysummary[0];
			next(0, {
				date: {
					year: d.date.year,
					month: d.date.mon,
					day: d.date.mday
				},
				rain: d.rain,
				temp: d.meantempm,
				maxtemp: d.maxtempm,
				mintemp: d.mintempm,
				humidity: d.humidity,
				minhumidity: d.minhumidity,
				maxhumidity: d.maxhumidity
			})
		});

}, function (err, days) {
	fs.writeFile('berlinweather.json', JSON.stringify(days, null, '\t'), function (err) {
		if (err) throw err;
		console.log('The file has been saved!');
	});
});
