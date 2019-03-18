(function () {

	var _addInput = $('.addAnswer'),
		_buttonClose = $('.close'),
		_buttonSubmit = $('.modal-btn'),
		_addForm = $('.tab-questions__add'),
		_tableAnswer = $('#tableAnswers'),
		_tableQuestion = $('#tableQuestions'),
		_form = $('#questionForm'),
		_formTitle = $('.modal-title'),
		_countRightAnswer = 80,
		_url = '/admin/',
		_numberAnswer = null;

	var init = function () {
		_getAnswer();
		_getQuestions();
		_setUpListners();
	};

	// заполняем таблицу ответов
	var _getAnswer = function () {
		var url = _url + 'answer/';

		runAjax(url, null).done(function (result) {
			var th = '<tr>' +
				'<th>#</th>' +
				'<th class="table-FIO">ФИО</th>' +
				'<th>Правильных ответов</th>' +
				'</tr>';
			_tableAnswer.append(th);

			$.each(result.row, function (i, answer) {
				var tr = '<tr class="table-' + ((answer.right >= _countRightAnswer) ? 'success' : 'danger') + '">' +
					'<td>' + (i + 1) + '</td>' +
					'<td class="text-capitalize">' + answer.surname + ' ' + answer.name + '</td>' +
					'<td>' + answer.right + '%</td>' +
					'</tr>';
				_tableAnswer.append(tr);
			});
		})
			.fail(function () {
				var tr = '<tr><td colspan="3">Ответов пока нет..</td></tr>';
				_tableAnswer.append(tr);
			});
	};

	// заполняем таблицу вопросов
	var _getQuestions = function () {
		_tableQuestion.empty();

		var url = _url + 'question/';

		runAjax(url, null).done(function (result) {
			var th = '<tr>' +
				'<th>#</th>' +
				'<th>Вопрос</th>' +
				'<th>Ответы</th>' +
				'<th>Правильный ответ (№)</th>' +
				'<th>Act.</th>' +
				'</tr>';
			_tableQuestion.append(th);

			$.each(result.row, function (i, question) {
				var tr = '<tr>' +
					'<td>' + (i + 1) + '</td>' +
					'<td>' + question.questions + '</td>' +
					'<td>';

				$.each(question.answers.split(';'), function (j, answer) {
					tr += '<p>' + (j + 1) + '. ' + answer + '</p>';
				});
				tr += '</td>' +
					'<td>' + question.right + '</td>' +
					'<td>' +
					'<img src="img/edit.png" class="modal__edit" alt="edit" data-id="' + question.id + '" data-toggle="modal" data-target="#questionModal">' +
					'<img src="img/trash.png" class="modal__delete" alt="recycle" data-id="' + question.id + '">' +
					'</td>' +
					'</tr>';
				_tableQuestion.append(tr);
			});
		})
			.fail(function () {
				var tr = '<tr><td colspan="5">Вопросов пока нет..</td></tr>';
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
				console.log("error");
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
				console.log("error");
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
				console.log("error");
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
				console.log("error");
			});
	};

	return init();
})();