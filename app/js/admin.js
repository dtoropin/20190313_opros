(function () {

	var _addInput = $('.addAnswer'),
		_buttonClose = $('.close'),
		_buttonSubmit = $('.modal-btn'),
		_addForm = $('.tab-questions__add'),
		_tableQuestion = $('.tab-questions__show'),
		_accordion = $('.accordion'),
		_form = $('#questionForm'),
		_formTitle = $('.modal-title'),
		_badge = $('.tab-pane__badge'),
		_countAllAnswers = null,
		_countRightAnswer = 87,
		_url = '/admin/',
		_numberAnswer = null;

	var init = function () {
		_getAnswer();
		_getQuestions();
		_setUpListners();
		_getNewAnswers();
	};

	// заполняем таблицу ответов
	var _getAnswer = function () {
		var url = _url + 'answer/';

		runAjax(url, null).done(function (result) {
			_countAllAnswers = result.row.length;

			var th = '<div class="accordion__row">' +
				'<div class="accordion__number">#</div>' +
				'<div class="accordion__FIO">ФИО</div>' +
				'<div class="accordion__right">Пра&shy;виль&shy;ных отве&shy;тов</div>' +
				'</div>';
			_accordion.append(th);

			$.each(result.row, function (i, answer) {
				var tr = '<div class="accordion__row-answer accordion__row-answer--' + ((answer.right >= _countRightAnswer) ? 'success' : 'danger') + '">' +
					'<div class="accordion__number">' + (i + 1) + '</div>' +
					'<div class="accordion__FIO">' + answer.surname + ' ' + answer.name + '</div>' +
					'<div class="accordion__right">' + answer.right + '%</div>' +
					'</div>' +
					'<div class="accordion__collapse">';

				if (answer.wrong !== '') {
					var wrong = answer.wrong.indexOf(';') > -1
						? answer.wrong.split(';')
						: Array(answer.wrong);

					$.each(wrong, function (j, wrongAns) {
						var wrongBlock = wrongAns.split('||');
						tr += '<p class="text-black-50">' + (j + 1) + '.&nbsp;' + wrongBlock[0] + ':</p>' +
							'<p class="accordion__text-success text-success">&nbsp;- ' + wrongBlock[1] + '</p>' +
							'<p class="accordion__text-danger text-danger">&nbsp;- ' + wrongBlock[2] + '</p>';
					});
				}

				tr += '</div>';
				_accordion.append(tr);
			});
		})
			.fail(function () {
				var tr = '<div class="accordion__row">Ответов пока нет..</div>';
				_accordion.append(tr);
			});
	};

	// заполняем таблицу вопросов
	var _getQuestions = function () {
		_tableQuestion.empty();

		var url = _url + 'question/';

		runAjax(url, null).done(function (result) {
			var th = '<div class="tab-questions__show-row">' +
				'<div class="tab-questions__show-number">#</div>' +
				'<div class="tab-questions__show-question">Вопрос</div>' +
				'<div class="tab-questions__show-answer">Ответы</div>' +
				'<div class="tab-questions__show-right">Прав. ответ (№)</div>' +
				'<div class="tab-questions__show-action">Act.</div>' +
				'</div>';
			_tableQuestion.append(th);

			$.each(result.row, function (i, question) {
				var tr = '<div class="tab-questions__show-row">' +
					'<div class="tab-questions__show-number">#' + (i + 1) + '</div>' +
					'<div class="tab-questions__show-question">' + question.questions + '</div>' +
					'<div class="tab-questions__show-answer">';

				$.each(question.answers.split(';'), function (j, answer) {
					tr += '<p>' + (j + 1) + '.&nbsp;' + answer + '</p>';
				});
				tr += '</div>' +
					'<div class="tab-questions__show-right">' + question.right + '</div>' +
					'<div class="tab-questions__show-action">' +
					'<img src="img/edit.png" class="modal__edit" alt="edit" data-id="' + question.id + '" data-toggle="modal" data-target="#questionModal">' +
					'<img src="img/trash.png" class="modal__delete" alt="recycle" data-id="' + question.id + '">' +
					'</div>' +
					'</div>';
				_tableQuestion.append(tr);
			});
		})
			.fail(function () {
				var tr = '<div class="tab-questions__show-row">Вопросов пока нет..</div>';
				_tableQuestion.append(tr);
			});
	};

	// события
	var _setUpListners = function () {
		_buttonSubmit.on('click', _buttonActionSubmit);
		_buttonClose.on('click', _resetForm);
		_addInput.on('click', _addAnswer);
		_tableQuestion.on('click', '.modal__delete', _deleteQuestion);
		_tableQuestion.on('click', '.modal__edit', _editModalInput);
		_addForm.on('click', _addFormInput);
		_accordion.on('click', '.accordion__row-answer', _accordionShow);
		_badge.on('click', _updateAnswer);
	};

	// get count new answers
	var _getNewAnswers = function () {
		setInterval(function () {
			var url = _url + 'countall/';

			runAjax(url, null).done(function (result) {
				if (result.countall > _countAllAnswers) {
					_badge.text(result.countall - _countAllAnswers).show();
				}
			})
				.fail(function () {
					console.log('error');
				});
		}, 30000);
	};

	// update answers
	var _updateAnswer = function () {
		_badge.text('').hide();
		_accordion.empty();
		_getAnswer();
	};

	// accordion wrongAnswers
	var _accordionShow = function () {
		$(this).next('.accordion__collapse')
			.slideToggle().siblings('.accordion__collapse:visible')
			.slideUp();
	};

	// выбор действия с формой
	var _buttonActionSubmit = function (e) {
		e.preventDefault();
		if (_buttonSubmit.hasClass('modal-edit')) _questionEdit();
		if (_buttonSubmit.hasClass('modal-save')) _questionSubmit();
	};

	// добавление поля ответа для вызванного модального окна
	var _addFormInput = function () {
		_addInputFunc(1);
		_buttonSubmit.addClass('modal-save');
		_formTitle.text('Добавление вопроса');
	};

	// добавление поля ответа
	var _addAnswer = function (e) {
		e.preventDefault();
		_addInputFunc(_numberAnswer);
	};

	// добавление поля ответа (function)
	var _addInputFunc = function (number) {
		if (number === 6) {
			_addInput.prop('disabled', true);
			return false;
		} else {
			_addInput.prop('disabled', false);
			var text = '<div class="form-group answer">' +
				'<label>Ответ ' + number +
				'<input type="text" name="answer' + number + '"	class="form-control" placeholder="Ответ на вопрос">' +
				'</label>' +
				'</div>';
			$('.rowanswer').append(text);
			_numberAnswer = number + 1;
		}
	};

	// удаление вопроса
	var _deleteQuestion = function (e) {
		if (!confirm('Подтвердите удаление.')) return false;
		var id = $(e.target).attr('data-id'),
			url = _url + 'delete/' + id;

		runAjax(url, null).done(function () {
			_getQuestions();
		})
			.fail(function () {
				console.log('error');
			});
	};

	// сохранение вопроса
	var _questionSubmit = function () {
		var url = _url + 'add/',
			data = _form.serialize();

		runAjax(url, data).done(function () {
			_getQuestions();
			_resetForm();
			$('#questionModal').modal('hide');
		})
			.fail(function () {
				console.log('error');
			});
	};

	// очистка формы
	var _resetForm = function () {
		$('#questionForm').trigger('reset');
		$('.answer').remove();
		_buttonSubmit.removeClass('modal-save modal-edit');
		_numberAnswer = null;
		_addInput.prop('disabled', false);
	};

	// вывод модального окна для редактирования вопроса
	var _editModalInput = function (e) {
		_buttonSubmit.addClass('modal-edit');
		_formTitle.text('Редактирование вопроса');

		var rowanswer = $('.rowanswer'),
			textarea = $('.modal-question'),
			answerright = $('.modal-answerright'),
			id = $(e.target).attr('data-id'),
			url = _url + 'getOne/' + id;

		runAjax(url, null).done(function (result) {
			$('.modal-id').val(result.question[0].id);
			textarea.val(result.question[0].questions);
			var _answers = result.question[0].answers.split(';');

			$.each(_answers, function (i, answer) {
				var answerBlock = '<div class="form-group answer">' +
					'<label>Ответ ' + (i + 1) +
					'<input type="text" ' +
					'name="answer' + (i + 1) + '"	' +
					'class="form-control" ' +
					'placeholder="Ответ на вопрос" ' +
					'value="' + answer + '"' +
					'>' +
					'</label>' +
					'</div>';
				rowanswer.append(answerBlock);
				_numberAnswer = i + 2;
			});
			answerright.val(result.question[0].right);
		})
			.fail(function () {
				console.log('error');
			});
	};

	// сохранение отредактированного вопроса
	var _questionEdit = function () {
		var url = _url + 'edit/',
			data = _form.serialize();

		runAjax(url, data).done(function () {
			_getQuestions();
			_resetForm();
			$('#questionModal').modal('hide');
		})
			.fail(function () {
				console.log('error');
			});
	};

	return init();
})();