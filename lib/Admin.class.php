<?php
require_once 'j4mie/idiorm.php';

class Admin
{
	protected $data = [];

	function __construct()
	{
		ORM::configure('sqlite:../database/opros.sqlite');
	}

	function answer()
	{
		$this->data['row'] = ORM::for_table('usersanswer')->find_array();
		return $this->data;
	}

	function question()
	{
		$this->data['row'] = ORM::for_table('question')->find_array();
		return $this->data;
	}

	function add()
	{
		$answer = [];
		for ($i = 1; $i <= 5; $i++) {
			if (isset($_POST['answer' . $i])) {
				$answer[] = trim(htmlentities($_POST['answer' . $i]));
			} else break;
		}
		$answer = implode(';', $answer);

		$questionSave = ORM::for_table('question')->create();
		$questionSave->questions = trim(htmlentities($_POST['question']));
		$questionSave->answers = $answer;
		$questionSave->right = htmlentities($_POST['answerright']);
		$questionSave->save();

		return true;
	}

	function delete($param)
	{
		$deleteQuestion = ORM::for_table('question')->find_one($param);
		$deleteQuestion->delete();

		return true;
	}
}