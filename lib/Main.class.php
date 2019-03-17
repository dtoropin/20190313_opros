<?php
require_once 'j4mie/idiorm.php';

class Main
{
	protected $data = [];

	function __construct()
	{
		ORM::configure('sqlite:../database/opros.sqlite');
	}

	function get()
	{
		$this->data['row'] = ORM::for_table('question')->find_array();
		return $this->data;
	}

	function save()
	{
		$saveFIOResult = ORM::for_table('usersanswer')->create();
		$saveFIOResult->name = trim(htmlentities(strtolower($_POST['name'])));
		$saveFIOResult->surname = trim(htmlentities(strtolower($_POST['surname'])));
		$saveFIOResult->right = htmlentities($_POST['right']);
		$saveFIOResult->save();

		return true;
	}

	function check()
	{
		$name = trim(htmlentities(strtolower($_POST['name'])));
		$surname = trim(htmlentities(strtolower($_POST['surname'])));
		$count = ORM::for_table('usersanswer')->where(array(
			'name' => $name,
			'surname' => $surname
		))->count();

		$this->data['count'] = ($count > 0) ? false : true;

		return $this->data;
	}
}