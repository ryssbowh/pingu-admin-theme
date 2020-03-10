<?php

namespace Pingu\Themes\Admin;

use Pingu\Themes\Admin\Composers\AdminMenuComposer;
use Pingu\Themes\Admin\Composers\ImageTransformations;

class Composer
{
    /**
     * Define here the composers for your theme
     * @see https://laravel.com/docs/5.8/views#view-composers
     * @return array
     */
    public static function getComposers()
    {
        return [
            AdminMenuComposer::class  => ['menus.menu'],
            ImageTransformations::class => ['pages.media.indexTransformations']
        ];
    }
}