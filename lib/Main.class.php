<?php
require_once 'j4mie/idiorm.php';

class Main
{
	protected $data = [];
	protected $countQuestion = 2;

	function __construct()
	{
		ORM::configure('sqlite:../database/opros.sqlite');
	}

	function get()
	{
		$selectedQuestion = [];
		$arrayID = ORM::for_table('question')->select('id')->find_array();
		while (count($selectedQuestion) < $this->countQuestion) {
			$numberID = $arrayID[rand(0, (count($arrayID) - 1))]['id'];
			if (!in_array($numberID, $selectedQuestion)) {
				$selectedQuestion[] = $numberID;
			} else {
				continue;
			}
		}

		$this->data['row'] = ORM::for_table('question')->where_id_in($selectedQuestion)->find_array();
		return $this->data;
	}

	function save()
	{
		$saveFIOResult = ORM::for_table('usersanswer')->create();
		$saveFIOResult->name = trim(htmlentities(mb_strtolower($_POST['name'])));
		$saveFIOResult->surname = trim(htmlentities(mb_strtolower($_POST['surname'])));
		$saveFIOResult->right = htmlentities($_POST['right']);
		$saveFIOResult->wrong = htmlspecialchars($_POST['wrongAnsw']);
		$saveFIOResult->save();

		return true;
	}

	function check()
	{
		$name = trim(htmlentities(mb_strtolower($_POST['name'])));
		$surname = trim(htmlentities(mb_strtolower($_POST['surname'])));
		$count = ORM::for_table('usersanswer')->where(array(
			'name' => $name,
			'surname' => $surname
		))->count();

		$this->data['count'] = ($count > 0) ? false : true;

		return $this->data;
	}
}