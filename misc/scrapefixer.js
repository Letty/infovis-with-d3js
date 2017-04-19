/**
 * Created by letty on 18.04.17.
 */


var async = require('async');
var fs = require('fs');
var request = require('request');

var actDate = {
	year: 2016,
	month: 4,
	day: 1
};

var endDate = {
	year: 2017,
	month: 4,
	day: 1
};

var data = [];
var dateLookup = {};

async.until(
	function () {
		return compareDates(actDate, endDate);
	}
	, function (next) {

		var date = actDate.year + '-' + (actDate.month < 10 ? '0' + actDate.month : actDate.month) + '-' + (actDate.day < 10 ? '0' + actDate.day : actDate.day)
		request.get({
				url: 'http://api.fixer.io/' + date,
				json: true
			},
			function (error, response, body) {
				console.log('data has been scraped for date: '+actDate.year+' - '+actDate.month+' - '+actDate.day);
				if (error) console.log(error);
				if (actDate.month === 2) {
					if (actDate.year % 100 === 0 || actDate.year % 4 === 0) {
						checkDateCondition(29, 'day', 'month');
					} else {
						checkDateCondition(28, 'day', 'month');
					}
				} else if (actDate.month === 4 || actDate.month === 6 || actDate.month === 9 || actDate.month === 11) {
					checkDateCondition(30, 'day', 'month');
				} else {
					if (actDate.day < 31) {
						actDate.day++;
					} else {
						actDate.day = 1;
						checkDateCondition(12, 'month', 'year');
					}
				}
				if (dateLookup[body.date] === undefined) {
					dateLookup[body.date] = true;
					data.push(body);
				}
				next(null, 'done');
			});
	}
	, function (error, result) {
		if (error) console.log(error);
		fs.writeFile('exchangerates.json', JSON.stringify(data, null, '\t'), function (err) {
			if (err) throw err;
			console.log('The file has been saved!');
		});
	});

function compareDates(date1, date2) {
	var result = false;
	if (date1.year === date2.year && date1.month === date2.month && date1.day === date2.day) {
		result = true;
	}
	return result
}

function checkDateCondition(number, id1, id2) {
	if (actDate[id1] < number) {
		actDate[id1]++;
	} else {
		actDate[id1] = 1;
		actDate[id2]++;
	}
}