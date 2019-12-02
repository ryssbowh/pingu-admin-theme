<?php

namespace Pingu\Themes\Admin\Composers;

use Illuminate\View\View;

class ImageTransformations
{
    /**
     * Define the variable that will be available for that view.
     * 
     * @param View $view
     */
    public function compose(View $view)
    {
        $form = $view->getData()['addForm'];
        $form->isAjax();
    }
}