<?php
define('WEB_ROOT', $_SERVER['DOCUMENT_ROOT']);
define('SITE_ROOT', WEB_ROOT . '/..');

define('LIB_FOLDER', '/lib/');
define('TPL_FOLDER', '/tpl/');

define('MAIN_PAGE', '/');
define('ADMIN_PAGE', '/admin');
define('MAIN_TEMPLATE', 'base.tpl');
define('ADMIN_TEMPLATE', 'admin.tpl');

spl_autoload_register(function ($class_name) {
	require_once SITE_ROOT . LIB_FOLDER . ucfirst(strtolower($class_name)) . '.class.php';
});
