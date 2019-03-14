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
			<a href="#home" class="nav-link active" aria-controls="home" role="tab" data-toggle="tab">Вопросы</a>
		</li>
		<li role="presentation" class="nav-item">
			<a href="#profile" class="nav-link" aria-controls="profile" role="tab" data-toggle="tab">Ответы</a>
		</li>
	</ul>

	<!-- Tab panes -->
	<div class="tab-content">
		<div role="tabpanel" class="tab-pane active" id="home">
			<h2>Список вопросов:</h2>
			<div class="add">
				<img src="/img/plus.png" alt="add" data-toggle="modal" data-target="#myModal">
			</div>
			<table class="table table-striped" id="table1"></table>
		</div><!-- .tab-pane -->

		<div role="tabpanel" class="tab-pane" id="profile">
			<h2>Прошли опрос:</h2>
			<table class="table table-striped" id="table2"></table>
		</div><!-- .tab-pane -->
	</div><!-- .tab-content -->
</div><!-- .container -->
<footer class="small text-center">
	&copy; 2019, D.Toropin
</footer>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">Добавление вопроса</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
						aria-hidden="true">&times;</span></button>
			</div>
			<form id="questionForm">
				<div class="modal-body">
					<div class="form-group">
						<label>Вопрос:
							<textarea type="text" name="question"
												class="form-control"
												placeholder="Ваш вопрос"
							></textarea>
						</label>
					</div>
					<div class="rowanswer"></div>
					<span class="btn btn-outline-secondary addQuestion">Добавить ответ</span>
					<div class="form-group">
						<label>Номер правильного ответа
							<input type="number" name="answerright"
										 min="1"
										 max="5"
										 class="form-control"
										 placeholder="Номер правильного ответа"
							>
						</label>
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-primary">Сохранить</button>
				</div>
			</form>
		</div>
	</div>
</div><!-- .modal -->

<script src="/js/vendor.min.js"></script>
<script src="/js/admin.min.js"></script>
</body>
</html>