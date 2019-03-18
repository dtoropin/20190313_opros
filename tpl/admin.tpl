<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="icon" href="/img/favicon.png">
	<title>Опрос || Админка</title>
	<link rel="stylesheet" href="/css/style.min.css">
</head>
<body>
<div class="container">
	<!-- Nav tabs -->
	<ul class="nav nav-tabs" role="tablist">
		<li role="presentation" class="nav-item active">
			<a href="#profile" class="nav-link active" aria-controls="profile" role="tab" data-toggle="tab">Ответы</a>
		</li>
		<li role="presentation" class="nav-item">
			<a href="#home" class="nav-link" aria-controls="home" role="tab" data-toggle="tab">Вопросы</a>
		</li>
	</ul>

	<!-- Tab panes -->
	<div class="tab-content">
		<div role="tabpanel" class="tab-answers tab-pane active" id="profile">
			<h2>Прошли опрос:</h2>
			<table class="table" id="tableAnswers"></table>
		</div><!-- .tab-pane -->

		<div role="tabpanel" class="tab-questions tab-pane" id="home">
			<h2>Список вопросов:</h2>
			<div class="add">
				<img src="/img/plus.png" class="tab-questions__add" alt="add" data-toggle="modal" data-target="#questionModal">
			</div>
			<table class="table table-striped" id="tableQuestions"></table>
		</div><!-- .tab-pane -->
	</div><!-- .tab-content -->
</div><!-- .container -->
<footer class="small text-center">
	&copy; 2019, D.Toropin
</footer>

<!-- Modal -->
<div class="modal fade" id="questionModal" tabindex="-1" role="dialog">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="questionModalLabel"></h4>
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span></button>
			</div>
			<form id="questionForm">
				<div class="modal-body">
					<input type="hidden" name="id" class="modal-id">
					<div class="form-group">
						<label>Вопрос:
							<textarea type="text" name="question"
												class="form-control modal-question"
												placeholder="Ваш вопрос"
							></textarea>
						</label>
					</div>
					<div class="rowanswer"></div>
					<button class="btn btn-outline-secondary addAnswer">Добавить ответ</button>
					<div class="form-group">
						<label>Номер правильного ответа
							<input type="number" name="answerright"
										 min="1"
										 max="5"
										 class="form-control modal-answerright"
										 placeholder="Номер правильного ответа"
							>
						</label>
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="modal-btn btn btn-primary">
						Сохранить
					</button>
				</div>
			</form>
		</div>
	</div>
</div><!-- .modal -->

<script src="/js/vendor.min.js"></script>
<script src="/js/admin.min.js"></script>
</body>
</html>