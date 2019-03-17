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
//		$saveFIOResult = ORM::for_table('person')->create();
//		$saveFIOResult->name = trim(htmlspecialchars($_POST['name']));
//		$saveFIOResult->surname = trim(htmlspecialchars($_POST['surname']));
//		$saveFIOResult->right = htmlspecialchars($_POST['right']);
//		$saveFIOResult->save();

		$this->data['right'] = 79;

		return $this->data;
	}
}