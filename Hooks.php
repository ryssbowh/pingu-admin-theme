<?php

namespace Pingu\Themes\Admin;

use Pingu\Core\Contracts\RendererContract; 
use Pingu\Forms\Support\Field;
use Pingu\Forms\Support\Form;
use Pingu\Forms\Support\FormGroup;

class Hooks
{
    public static $ajaxForms = ['block-options-form', 'edit-field-display-options', 'edit-form-layout-options', 'create-bundle-field', 'edit-bundle-field', 'create-model-taxonomy-item', 'edit-model-taxonomy-item', 'edit-model-menu-item', 'create-model-menu-item', 'add-bundle-field', 'create-model-view-mode', 'edit-model-view-mode'];

    public static $modalForms = ['block-options-form', 'edit-field-display-options', 'edit-form-layout-options', 'create-bundle-field', 'edit-bundle-field', 'create-model-taxonomy-item', 'edit-model-taxonomy-item', 'edit-model-menu-item', 'create-model-menu-item', 'create-model-view-mode', 'edit-model-view-mode'];

    /**
     * This will be called before every forms related hook
     * 
     * @param string           $name
     * @param Form             $form
     * @param RendererContract $renderer
     */
    public static function form(string $name, Form $form, RendererContract $renderer)
    {   
        if (in_array($name, static::$ajaxForms)) {
            $renderer->classes->add('js-ajax-form');
        }

        if (in_array($name, static::$modalForms)) {
            $renderer->prependView('forms.modal');
        }

        if ($name == 'edit-bundle-field' or $name == 'create-bundle-field') {
            $form->removeElement('weight');
        }
    }

    public static function formField(string $name, Field $field, $renderer)
    {
        if ($from = $field->option('dashifyFrom')) {
            $renderer->classes->add('js-dashify');
            $renderer->attributes->put('data-dashifyfrom', 'name');
        }
    }
}