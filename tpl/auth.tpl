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

	<form class="auth">
		<div class="form-group">
			<label for="exampleInputPassword1">Авторизация</label>
			<input type="password"
						 name="passwd"
						 class="auth__input form-control"
						 placeholder="Password"
						 autofocus
			>
		</div>
		<button type="submit" class="auth__btn btn btn-secondary">Авторизоваться</button>
	</form>

</div><!-- .container -->
<footer class="small text-center">
	&copy;&nbsp;2019, Д.Торопин, вопросы&nbsp;-&nbsp;Ю.Леонтьева
</footer>
<script src="/js/vendor.min.js"></script>
<script src="/js/auth.min.js"></script>
</body>
</html>