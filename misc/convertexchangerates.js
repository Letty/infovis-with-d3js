/**
 * Created by letty on 19.04.17.
 */

var async = require('async');
var fs = require('fs');
var converter = require('json-2-csv');

var keys = ["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "GBP", "HKD", "HRK",
	"HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN",
	"RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"];

async.waterfall([
	function (cb) {
		fs.readFile('exchangerates.json', function (error, data) {
			if (error) cb(error);
			cb(null, JSON.parse(data));
		})
	},
	function (data, cb) {

		async.each(keys,
			function (key, callback) {
				converter.json2csv(data,
					function(er, csv){
						fs.writeFile('exchange-'+key+'.csv', csv,
							function (err) {
								if (err) throw err;
								console.log('The file '+key+' has been saved!');
								callback();
							})
					}
					, {keys: ['date', 'rates.'+key]});
			},
			function (error) {
			console.log('all files are saved');
			cb(null, 'done')
			})

	}
], function (err, res) {
	console.log('everything converted');
});