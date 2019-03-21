<?php
require_once 'j4mie/idiorm.php';

class Auth
{
	function __construct()
	{
		ORM::configure('sqlite:../database/opros.sqlite');
	}

	function check()
	{
		$result = ORM::for_table('auth')
			->where('passwd', md5(trim(htmlentities($_POST['passwd']))))
			->count();
		if ($result === 1) {
			// пишем 'auth' в cookie на 10 min :)
			setcookie('auth', true, time() + 600, '/');
			return true;
		} else {
			return false;
		}
	}
}