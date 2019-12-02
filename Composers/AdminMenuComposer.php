<?php

namespace Pingu\Themes\Admin\Composers;

use Pingu\Menu\Entities\Menu;

class AdminMenuComposer
{
    /**
     * Define the variable that will be available for that view.
     * 
     * @param $view [description]
     */
    public function compose($view)
    {
        $view->with([
            'menu' => \Menus::menu('admin-menu')
        ]);
    }
}