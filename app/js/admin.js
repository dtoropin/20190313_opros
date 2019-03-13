(function () {

	var addInput = $('.addQuestion'),
		buttonClose = $('button[data-dismiss="modal"]'),
		add = $('img[alt="add"]'),
		edit = $('img[alt="edit"]'),
		del = $('img[alt="recycle"]'),
		url = 'question.php',
		_number = null;

	var init = function () {
		_setUpListners();
	};

	var _setUpListners = function () {
		$('#questionForm').on('submit', _questionSubmit);
		buttonClose.on('click', _resetForm);
		addInput.on('click', _addQuestion);
		edit.on('click', _editModalInput);
		add.on('click', _addFormInput);
		del.on('click', _deleteQuestion);
	};

	_addFormInput = function () {
		_addInput(1);
	};

	var _deleteQuestion = function (e) {
		var id = $(e.target).attr('data-id');
		$.ajax({
			url: url + '?del=' + id,
			type: 'POST',
			dataType: 'json'
		})
		.done(function() {
			window.location.href = '/admin.html';
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		});
	};

	var _addInput = function (number) {
		var text = '<div class="form-group answer"><label>Ответ '
			+ number + '<input type="text" name="answer'
			+ number + '"	class="form-control" placeholder="Ответ на вопрос"></label></div>';
			$('.rowanswer').append(text);
			_number = number + 1;
	};

	var _questionSubmit = function (e) {
		e.preventDefault();
		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: $(this).serialize()
		})
		.done(function() {
			window.location.href = '/admin.html';
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
		_addInput(_number);
	};

	var _editModalInput = function (e) {
		var modal = $('#editModal'),
			rowanswer = $('.rowanswer'),
			textarea = modal.find('textarea'),
			answernumber = $('input[name="answerright"]'),
			id = $(e.target).attr('data-id');
			_number = 1;

		$.ajax({
			url: url + '?edit=' + id,
			type: 'POST',
			dataType: 'json'
		})
		.done(function(res) {
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