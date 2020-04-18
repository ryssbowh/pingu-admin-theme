<?php

namespace Pingu\Themes\Admin;

use Pingu\Themes\Admin\Composers\AdminMenuComposer;
use Pingu\Themes\Admin\Composers\ImageTransformations;
use Pingu\Themes\Admin\Composers\MediaFolders;

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
            MediaFolders::class => ['pages.entities.media._includes.folderTree']
        ];
    }
}