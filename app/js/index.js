(function () {

	var _radio = $('input[type="radio"]'),
		_content = $('.container')[0],
		_vopros = $('#vopros'),
		_otvet = $('.otvet')[0],
		_otvetDiv = $('.otvet-div')[0],
		_url = '/main/';

	var init = function () {
		_showAnswer();
		_setUpListners();
	};

	// Выводим вопросы
	var _showAnswer = function () {
		var url = _url + 'get/';
		_vopros.empty();

		runAjax(url, null).done(function (res) {
			console.log(res.row);
			for (var i = 0; i <= res.row.length; i++) {
				var div = '<div class="form-group jumbotron"><b>#'
					+ (i + 1) + '</b><p>'
					+ res.row.ques + '?</p>';
				for (var j = 0; j <= res.row.ans.length; j++) {
					div += '<div class="radio"><label><input type="radio" name="question1" value="answer'
						+ (j + 1) + '">'
						+ res.row.ans[j]
						+ '</label></div>';
				}
				div += '</div><!-- .form-group jumbotron -->';
				_vopros.append(div);
			}
		})
			.fail(function () {
				var div = '<div class="form-group jumbotron">Вопросов пока не напечатали :(</div>';
				_vopros.append(div);
				$('button[type="submit"]').attr('disabled', 'disabled');
				console.log('error');
			});
	};

	// События
	var _setUpListners = function () {
		_radio.on('click', _radioDisabled);
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
		var url = _url + 'save/',
			data = $(this).serialize();
		runAjax(url, data).done(function (res) {
			_otvetDiv.addClass(
				(res.ans > 80) ? 'bg-success' : 'bg-danger'
			);
			_otvet.innerText = res.ans + '%';
			$('#successModal').modal('show');
			$('button[type="submit"]').attr('disabled', 'disabled');
			console.log("success");
		})
			.fail(function () {
				_content.innerHTML = '<div class="alert alert-danger">Непредвиденный сбой сервера, попробуйте позже...</div>';
				console.log("error");
			});
	};

	return init();
})();