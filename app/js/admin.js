(function () {

	var _addInput = $('.addQuestion'),
		_buttonClose = $('button[data-dismiss="modal"]'),
		_add = $('img[alt="add"]'),
		_edit = $('img[alt="edit"]'),
		_del = $('img[alt="recycle"]'),
		_tableAns = $('#table2'),
		_tableQues = $('#table1'),
		_url = 'question.php',
		_number = null;

	var init = function () {
		_getAnswer();
		_getQuestions();
		_setUpListners();
	};

	// заполняем таблицу ответов
	var _getAnswer = function () {
		var url = _url + '?get=ans',
			th = '<tr><th>#</th><th>ФИО</th><th>Правильных ответов</th></tr>';

		runAjax(url, null).done(function (res) {
			var tr = th;
			for(var i = 0; i <= res.row.lenght; i++) {
				tr += '<tr class="table-'
					+ (res.row.ans > 70) ? 'success' : 'danger'
					+ '"><td>' + (i + 1) + '</td><td>'
					+ res.row.name + '</td><td>'
					+ res.row.ans + '%</td></tr>';
				_tableAns.append(tr);
			}
		})
		.fail(function() {
			var tr = '<tr><td colspan="3">Ответов пока нет..</td></tr>';
			_tableAns.append(tr);
			console.log("error");
		});
	};

	// заполняем таблицу вопросов
	var _getQuestions = function () {
		var url = _url + '?get=ques',
			th = '<tr><th>#</th><th>Вопрос</th><th>Ответы</th><th>Правильный ответ (№)</th><th>Act.</th></tr>';
			_tableQues.empty();

		runAjax(url, null).done(function (res) {
			var tr = th;
			for(var i = 0; i <= res.row.lenght; i++) {
				tr += '<tr><td>' + (i + 1)
					+ '</td><td>'
					+ res.row.question
					+ '</td><td>'
					for(var j = 0; j <= res.row.ans.lenght; j++) {
						'<p>' + (j + 1) + ' ' + res.row.ans[j] + '</p>'
					}
					+ '</td><td>'
					+ res.row.right
					+ '</td><td><img src="img/edit.png" alt="edit" data-id="1" data-toggle="modal" data-target="#myModal">'
					+ '<img src="img/trash.png" alt="recycle" data-id="1"></td></tr>';
				_tableQues.append(tr);
			}
		})
		.fail(function() {
			var tr = '<tr><td colspan="5">Вопросов пока нет..</td></tr>';
			_tableQues.append(tr);
			console.log("error");
		});
	};

	// события
	var _setUpListners = function () {
		$('#questionForm').on('submit', _questionSubmit);
		_buttonClose.on('click', _resetForm);
		_addInput.on('click', _addQuestion);
		_edit.on('click', _editModalInput);
		_add.on('click', _addFormInput);
		_del.on('click', _deleteQuestion);
	};

	_addFormInput = function () {
		_addInputFunc(1);
	};

	var _deleteQuestion = function (e) {
		var id = $(e.target).attr('data-id'),
			url = _url + '?del=' + id;

		runAjax(url, null).done(function() {
			_getQuestions();
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		});
	};

	var _addInputFunc = function (number) {
		if (number === 6) {
			_addInput.attr('disabled', 'disabled');
			return false;
		} else {
			_addInput.removeAttr('disabled');
			var text = '<div class="form-group answer"><label>Ответ '
				+ number + '<input type="text" name="answer'
				+ number + '"	class="form-control" placeholder="Ответ на вопрос"></label></div>';
			$('.rowanswer').append(text);
			_number = number + 1;
		}
	};

	var _questionSubmit = function (e) {
		e.preventDefault();
		var url = _url + '?add',
			data = $(this).serialize();
		runAjax(url, data).done(function() {
			_getQuestions();
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		});
	};

	var _resetForm = function () {
		var form = $('#questionForm').trigger('reset');
		$('.answer').remove();
	};

	var _addQuestion = function (e) {
		_addInputFunc(_number);
	};

	var _editModalInput = function (e) {
		var modal = $('#editModal'),
			rowanswer = $('.rowanswer'),
			textarea = modal.find('textarea'),
			answernumber = $('input[name="answerright"]'),
			id = $(e.target).attr('data-id'),
			url = _url + '?edit=' + id;
			_number = 1;

		runAjax(url, null).done(function(res) {
			textarea.value(res.question.textarea);
			for(var i = 0; i <= res.answer.lenght; i++) {
				_number = i + 1;
				var text = '<div class="form-group answer"><label>Ответ '
					+ (i + 1) + '<input type="text" name="answer'
					+ (i + 1) + '"	class="form-control" placeholder="Ответ на вопрос"></label></div>';
				rowanswer.append(text).val(res.answer.value);
			}
			answernumber.value(res.answer.number);
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		});
	};

	return init();
})();