(function () {

	var _addInput = $('.addAnswer'),
		_buttonClose = $('button[data-dismiss="modal"]'),
		_add = $('.tab-questions__add'),
		_edit = $('.modal__edit'),
		_tableAnswer = $('#tableAnswers'),
		_tableQuestion = $('#tableQuestions'),
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
			var th = '<tr><th>#</th><th>ФИО</th><th>Правильных ответов</th></tr>';
			_tableAnswer.append(th);

			$.each(result.row, function (i, answer) {
				var tr = '<tr class="table-' +
					((answer.right >= _countRightAnswer) ? 'success' : 'danger') + '">' +
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
			var th = '<tr><th>#</th><th>Вопрос</th><th>Ответы</th><th>Правильный ответ (№)</th><th>Act.</th></tr>';
			_tableQuestion.append(th);

			$.each(result.row, function (i, question) {
				var tr = '<tr>' +
					'<td>' + (i + 1) + '</td>' +
					'<td>' + question.questions + '</td>' +
					'<td>';

				$.each(question.answers.split(';'), function (j, answer) {
					tr += '<p>' + (j + 1) + ' ' + answer + '</p>';
				});
				tr += '</td>' +
					'<td>' + question.right + '</td>' +
					'<td>' +
					'<img src="img/edit.png" class="modal__edit" alt="edit" data-id="' + question.id + '" data-toggle="modal" data-target="#questionModal">' +
					'<img src="img/trash.png" class="modal__delete" alt="recycle" data-id="' +  question.id +'">' +
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
		$('#questionForm').on('submit', _questionSubmit);
		_buttonClose.on('click', _resetForm);
		_addInput.on('click', _addAnswer);
		_edit.on('click', _editModalInput);
		_add.on('click', _addFormInput);
		$('.modal__delete').on('click', _deleteQuestion);
	};

	// добавление поля ответа для вызванного модального окна
	_addFormInput = function () {
		_addInputFunc(1);
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
		console.log('delete');
		var id = $(e.target).attr('data-id'),
			url = _url + 'delete/' + id;
		console.log(id, ' ', url);

		runAjax(url, null).done(function () {
			_getQuestions();
		})
			.fail(function () {
				console.log("error");
			});
	};

	// сохранение вопроса
	var _questionSubmit = function (e) {
		e.preventDefault();
		var url = _url + 'add/',
			data = $(this).serialize();
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
	};

	////////////////////////
	// редактирование вопроса
	var _editModalInput = function (e) {
		var modal = $('#editModal'),
			rowanswer = $('.rowanswer'),
			textarea = modal.find('textarea'),
			answernumber = $('input[name="answerright"]'),
			id = $(e.target).attr('data-id'),
			url = _url + '?edit=' + id;
		_number = 1;

		runAjax(url, null).done(function (res) {
			textarea.value(res.question.textarea);
			for (var i = 0; i <= res.answer.lenght; i++) {
				_number = i + 1;
				var text = '<div class="form-group answer"><label>Ответ '
					+ (i + 1) + '<input type="text" name="answer'
					+ (i + 1) + '"	class="form-control" placeholder="Ответ на вопрос"></label></div>';
				rowanswer.append(text).val(res.answer.value);
			}
			answernumber.value(res.answer.number);
		})
			.fail(function () {
				console.log("error");
			});
	};

	return init();
})();