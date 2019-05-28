<?php

namespace Pingu\Themes\Admin;

use Pingu\Themes\Admin\Composers\AdminMenuComposer;

class Composer
{
	/**
	 * Define here the composers for your theme
	 * @see https://laravel.com/docs/5.8/views#view-composers
	 * @return array
	 */
	public static function getComposers(){

        return [
        	AdminMenuComposer::class  => ['menus.menu']
        ];

    }
}