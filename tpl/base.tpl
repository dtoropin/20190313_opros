<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="icon" href="/img/favicon.png">
	<title>Опрос</title>
	<link rel="stylesheet" href="/css/style.min.css">
</head>
<body>
<div class="container">
	<h2 class="container__head">Опрос по первой помощи.</h2>
	<hr>

	<form id="answerForm" class="answerForm">
		<div class="row">
			<div class="answerForm__item form-group col-lg-6 col-md-6">
				<label class="answerForm__item-label" for="inputname">Имя</label>
				<input type="text" name="name"
							 class="answerForm__item-input form-control text-capitalize"
							 id="inputname"
							 placeholder="Ваше имя"
				>
			</div><!-- .answerForm__item -->
			<div class="answerForm__item form-group col-lg-6 col-md-6">
				<label for="inputsurname">Фамилия</label>
				<input type="text" name="surname"
							 class="answerForm__item-input form-control text-capitalize"
							 id="inputsurname"
							 placeholder="Ваша фамилия"
				>
			</div><!-- .answerForm__item -->
		</div><!-- .row -->
		<hr>
		<h3 class="answerForm__head">Вопросы:</h3>
		<div class="questions" id="questions"></div>
		<input type="hidden" name="right" class="answerForm__right">
		<button type="submit" class="answerForm__btn btn btn-info btn-lg btn-block">
			Посмотреть результат
		</button>
	</form>
</div><!-- .container -->
<footer class="small text-center">
	&copy;&nbsp;2019, Д.Торопин, вопросы&nbsp;-&nbsp;Ю.Леонтьева
</footer>

<!-- Modal -->
<div class="modal fade" id="successModal" tabindex="-1" role="dialog">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Ваш результат</h5>
			</div>
			<div class="answer-block modal-body">
				<strong>Правильных ответов:
					<span class="answer-block__right display-4">78%</span>
				</strong>
			</div>
			<div class="modal-footer">
				<button type="button"
								class="answer-block__btn btn btn-outline-secondary"
								data-dismiss="modal"
				>
					Закрыть и посмотреть, где накосячили..
				</button>
			</div>
		</div><!-- .modal-content -->
	</div><!-- .modal-dialog -->
</div><!-- .modal -->

<script src="/js/vendor.min.js"></script>
<script src="/js/index.min.js"></script>
</body>
</html>