<?php

class App
{
	private $url;
	private $is_ajax = false;
	private $page;
	private $request_data = [];
	private $response_data = [];

	function __construct()
	{
		$this->url = $_SERVER['REQUEST_URI'];

		if ($this->url === MAIN_PAGE) $this->page = MAIN_TEMPLATE;
		if ($this->url === ADMIN_PAGE) {
			$this->page = isset($_COOKIE['auth']) ? ADMIN_TEMPLATE : AUTH_TEMPLATE;
		}

		// если не главная и не админка
		if ($this->url != MAIN_PAGE && $this->url != ADMIN_PAGE) {
			$this->is_ajax = true;
		}
	}

	function render()
	{
		($this->is_ajax) ? $this->generateJson() : $this->generateHtml();
	}

	private function generateHtml()
	{
		$tpl = file_get_contents(SITE_ROOT . TPL_FOLDER . $this->page);
		echo $tpl;
	}

	private function generateJson()
	{
		$this->fileUrlAction();
		echo json_encode($this->response_data);
	}

	/**
	 * routing
	 */
	private function fileUrlAction()
	{
		$url_data = explode('/', $this->url);

		$this->request_data['controller'] = (isset($url_data[1])) ? ucfirst($url_data[1]) : 'main';
		$this->request_data['action'] = (isset($url_data[2])) ? $url_data[2] : 'get';
		$this->request_data['param'] = (isset($url_data[3])) ? $url_data[3] : null;

		$instance = new $this->request_data['controller'];
		$method = $this->request_data['action'];
		$param = $this->request_data['param'];

		$this->response_data = $instance->$method($param);
	}
}