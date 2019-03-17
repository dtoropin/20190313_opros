/*
* Vendor js
*/

//= ../../node_modules/jquery/dist/jquery.js
//= ../../node_modules/bootstrap/dist/js/bootstrap.js

var runAjax = function (url, data) {
	return $.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: data
	})
};