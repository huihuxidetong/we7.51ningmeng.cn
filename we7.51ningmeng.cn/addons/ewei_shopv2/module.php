<?php
/**
 * 本破解程序由资源邦提供
 * 资源邦www.wazyb.com
 * QQ:993424780  承接网站建设、公众号搭建、小程序建设、企业网站
 */
if (!(defined('IN_IA'))) {
	exit('Access Denied');
}


require_once IA_ROOT . '/addons/ewei_shopv2/version.php';
require_once IA_ROOT . '/addons/ewei_shopv2/defines.php';
require_once EWEI_SHOPV2_INC . 'functions.php';
class Ewei_shopv2Module extends WeModule
{
	public function welcomeDisplay()
	{
		header('location: ' . webUrl());
		exit();
	}
}


?>