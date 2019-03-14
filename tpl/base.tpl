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
	<h2>Опрос по первой помощи.</h2>
	<hr>

	<form id="answerForm">
		<div class="row">
			<div class="form-group col-lg-6 col-md-6">
				<label for="inputname">Имя</label>
				<input type="text" name="name"
							 class="form-control text-capitalize" id="inputname"
							 placeholder="Ваше имя" required
				>
			</div>
			<div class="form-group col-lg-6 col-md-6">
				<label for="inputsurname">Фамилия</label>
				<input type="text" name="surname"
							 class="form-control text-capitalize" id="inputsurname"
							 placeholder="Ваша фамилия" required
				>
			</div>
		</div>
		<hr>
		<h3>Вопросы:</h3>
		<div id="vopros"></div>
		<button type="submit" class="btn btn-info btn-lg btn-block">Посмотреть результат</button>
	</form>
</div><!-- .container -->
<footer class="small text-center">
	&copy; 2019, D.Toropin
</footer>

<!-- Modal -->
<div class="modal fade" id="successModal" tabindex="-1" role="dialog">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Ваш результат</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="otvet-div modal-body">
				<strong>Правильных ответов: <span class="otvet display-4">78%</span></strong>
			</div>
		</div>
	</div>
</div><!-- .modal -->

<script src="/js/vendor.min.js"></script>
<script src="/js/index.min.js"></script>
</body>
</html>