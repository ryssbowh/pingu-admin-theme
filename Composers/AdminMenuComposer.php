<?php

namespace Pingu\Themes\Admin\Composers;

use Pingu\Menu\Entities\Menu;
use Illuminate\View\View;

class AdminMenuComposer
{
    /**
     * Define the variable that will be available for that view.
     * 
     * @param View $view
     */
    public function compose(View  $view)
    {
        $view->with([
            'menu' => \Menus::menu('admin-menu')
        ]);
    }
}