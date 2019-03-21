(function () {

	var _content = $('.container'),
		_input = $('.auth__input'),
		_form = $('.auth'),
		_url = '/auth/';

	var init = function () {
		_setUpListners();
	};

	// События
	var _setUpListners = function () {
		_form.on('submit', _checkPass);
	};

	var _checkPass = function (e) {
		e.preventDefault();

		var url = _url + 'check/',
			data = $(this).serialize();

		runAjax(url, data).done(function (result) {
			result
				? window.location.href = '/admin'
				: _input.addClass('is-invalid').val('');
		})
			.fail(function (result) {
				_content.html('<div class="alert alert-danger">' +
					'Непредвиденный сбой сервера, попробуйте позже...' +
					'</div>');
				return false;
			});
	};

	return init();
})();