<?php

namespace Pingu\Themes\Admin;

use Pingu\Core\Contracts\RendererContract;
use Pingu\Field\Entities\entity;
use Pingu\Forms\Support\Field;
use Pingu\Forms\Support\Form;
use Pingu\Forms\Support\FormGroup;

class Hooks
{
    public static $ajaxForms = ['create-block-options-form', 'edit-block-options-form', 'edit-field-display-options', 'edit-form-layout-options', 'create-bundle-field', 'edit-bundle-field', 'create-entity-taxonomyitem', 'edit-entity-taxonomyitem', 'edit-model-menu-item', 'create-model-menu-item', 'add-bundle-field', 'create-entity-viewmode', 'edit-entity-viewmode', 'media-transformer-create', 'media-add-transformer', 'create-entity-menuitem', 'edit-entity-menuitem','create-entity-block'];

    public static $modalForms = ['create-block-options-form', 'edit-block-options-form', 'edit-field-display-options', 'edit-form-layout-options', 'create-bundle-field', 'edit-bundle-field', 'create-entity-taxonomyitem', 'edit-entity-taxonomyitem', 'edit-model-menu-item', 'create-model-menu-item', 'create-entity-viewmode', 'edit-entity-viewmode', 'media-add-transformer', 'create-entity-menuitem', 'edit-entity-menuitem', 'create-entity-block'];

    public static $noWeightForms = ['edit-bundle-field', 'create-bundle-field', 'edit-model-menu-item', 'create-model-menu-item'];

    /**
     * Form hook
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

        if (request()->ajax() && in_array($name, static::$noWeightForms)) {
            $form->removeElement('weight');
        }
    }

    public static function formField(string $name, Field $field, $renderer)
    {
        if ($from = $field->option('dashifyFrom')) {
            $renderer->classes->add('js-dashify');
            $renderer->attributes->put('data-dashifyfrom', $from);
        }
    }
}