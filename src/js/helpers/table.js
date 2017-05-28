'use strict';

var _ = require('underscore');

exports.moveDataToTable = function(table, data) {
	var body = table.getElementsByTagName('tbody')[0],
		rows = body.getElementsByTagName('tr');

	if (rows.length) {
		_(rows).each(function() {
			table.deleteRow(1);
		});
	}

	_(data).each(function(set, item) {
		var row = body.insertRow(-1);

		row.insertCell(0).innerHTML = item;
		row.insertCell(1).innerHTML = set.join(', ');
	});
};
