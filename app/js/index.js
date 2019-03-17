(function () {

	var _content = $('.container'),
		_questions = $('#questions'),
		_answer = $('.answer-block'),
		_answerRight = $('.answer-block__right'),
		_btnSubmit = $('.answerForm__btn'),
		_inputFIO = $('.answerForm__item-input'),
		_rightAnswers = [],
		_countRightAnswer = 80,
		_url = '/main/';

	var init = function () {
		_setUpListners();
	};

	// События
	var _setUpListners = function () {
		$('#answerForm').on('submit', _answerSubmit);
		$('.answerForm__checkFIO').on('click', _checkFIO);
	};

	// проверка FIO в bd
	var _checkFIO = function (e) {
		e.preventDefault();
		var url = _url + 'check/',
			name = $('#inputname'),
			surname = $('#inputsurname');

		name.on('keyup', _removeInvalid);
		surname.on('keyup', _removeInvalid);

		if (name.val() === '') {
			name.addClass('is-invalid');
			return false;
		}
		if (surname.val() === '') {
			surname.addClass('is-invalid');
			return false;
		}

		var data = 'name=' + name.val()
			+ '&surname=' + surname.val();

		runAjax(url, data).done(function (result) {
			if (result.count) {
				$('.answerForm__checkFIO').hide();
				$('.answerForm__question').show();
				_showQuestions();
			} else {
				_content.html('<div class="alert alert-danger">' +
					'Вы уже проходили опрос...' +
					'</div>');
				return false;
			}
		})
			.fail(function () {
				_content.html('<div class="alert alert-danger">' +
					'Непредвиденный сбой сервера, попробуйте позже...' +
					'</div>');
				return false;
			});
	};

	var _removeInvalid = function (e) {
		$(e.target).removeClass('is-invalid');
	};

	// Выводим вопросы
	var _showQuestions = function () {
		var url = _url + 'get/';

		runAjax(url, null).done(function (result) {
			$.each(result.row, function (i, item) {
				_rightAnswers.push(item.right);
				var question = item.questions,
					answer = item.answers.split(';');

				var div = '<div class="form-group jumbotron">' +
					'<b>#' + (i + 1) + '</b>' +
					'<p>' + question + '?</p>';

				$.each(answer, function (j, radio) {
					div += '<div class="radio">' +
						'<label>' +
						'<input type="radio" class="questions__radio" name="question'
						+ (i + 1) + '" value="'
						+ (j + 1) + '">'
						+ radio +
						'</label>' +
						'</div>';
				});
				div += '</div><!-- .form-group jumbotron -->';
				_questions.append(div);
			});
			_btnSubmit.prop('hidden', false);
			$('.answerForm__head').prop('hidden', false);
		})
			.fail(function () {
				var div = '<div class="form-group jumbotron">' +
					'Вопросов пока не напечатали :(' +
					'</div>';
				_questions.append(div);
				_btnSubmit.prop('disabled', true);
			});
	};

	var _answerSubmit = function (e) {
		e.preventDefault();

		// подсчет правильных ответов и подсветка
		var count = 0;
		$.each(_rightAnswers, function (i, value) {
			var checked = $('.questions__radio[name="question' + (i + 1) + '"]:checked');
			// красим правильный ответ в зеленый
			$('.questions__radio[name="question' + (i + 1) + '"][value=' + value + ']')
				.parent()
				.css({color: 'green', fontWeight: 'bold'});
			if (checked.val() === value) {
				count++;
			} else {
				// красим неправильный ответ
				checked
					.parent()
					.css({color: 'red', fontWeight: 'bold'})
			}
		});
		$('.questions__radio').prop('disabled', true);
		var rightAnswer = count / _rightAnswers.length * 100;
		$('.answerForm__right').val(rightAnswer);

		// отправка данных и вывод результата
		var url = _url + 'save/',
			data = $(this).serialize();

		runAjax(url, data).done(function () {
			_answer.addClass(
				(rightAnswer > _countRightAnswer) ? 'bg-success' : 'bg-danger'
			);
			_answerRight.text(rightAnswer + '%');
			$('#successModal').modal('show');
			_btnSubmit.prop('disabled', true);
			_inputFIO.prop('disabled', true);
		})
			.fail(function () {
				_content.html('<div class="alert alert-danger">' +
					'Непредвиденный сбой сервера, попробуйте позже...' +
					'</div>');
				return false;
			});
	};

	return init();
})();