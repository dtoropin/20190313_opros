<?php
require_once './j4mie/idiorm.php';

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
}