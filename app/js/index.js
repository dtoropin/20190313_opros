(function () {

	var radio = $('input[type="radio"]'),
		content = $('.container')[0];

	var init = function () {
		_setUpListners();
	};

	var _setUpListners = function () {
		radio.on('click', _radioDisabled);
		$('#answerForm').on('submit', _answerSubmit);
	};

	var _radioDisabled = function (e) {
		var elements = $.find('input[name="' + e.target.name + '"]');
		elements.forEach(function (e) {
			e.setAttribute('disabled', 'disabled');
		});
	};

	var _answerSubmit = function (e) {
		e.preventDefault();
		$.ajax({
			url: '',
			type: 'POST',
			dataType: 'json',
			data: $(this).serialize()
		})
		.done(function() {
			content.innerHTML = '<div class="alert alert-success">Правильных ответов: 50%</div>';
			console.log("success");
		})
		.fail(function() {
			content.innerHTML = '<div class="alert alert-success">Правильных ответов: 50%</div>';
			// content.innerHTML = '<div class="alert alert-danger">Непредвиденный сбой сервера, попробуйте позже...</div>';
			console.log("error");
		});
	};

	return init();
})();