<?php

return [
	'forms' => [
        /**
	     * Classes for forms, indexed by the name of the form
	     */
	    'classes' => [
    		'edit-content' => 'edit-content-form content-form',
    		'create-content' => 'create-content-form content-form',
    		'add-content-type-field' => 'form mt-4 pt-4 border-top'
	    ],
	    /**
	     * default classes for form
	     */
	    'default-classes' => 'form',
	    /**
	     * Classes for fields, index by field name
	     */
	    'field-classes' => [
	    	'default' => [
	    		'textinput' => 'form-control',
	    		'numberinput' => 'form-control',
		        'select' => 'form-control',
		        'password' => 'form-control',
		        'datetime' => 'form-control js-datetimepicker',
		        'email' => 'form-control',
		        'textarea' => 'form-control',
		        'checkbox' => 'form-check form-check-inline',
		        'radio' => 'form-check form-check-inline',
		        'submit' => 'btn btn-primary',
		        'link' => 'btn btn-secondary'
		    ]
	    ],
	    /**
	     * Extra classes for fields
	     */
	    'field-default-classes' => 'field-inner',
	    /**
	     * Classes for labels, index by field name
	     */
	    'label-classes' => [],
	    /**
	     * Default classes for label
	     */
	    'label-default-classes' => 'label',
	    /**
	     * Field wrapper classes index by field name
	     */
	    'wrapper-classes' => [],
	    /**
	     * field wrapper default classes
	     */
	    'wrapper-default-classes' => 'field form-group',
	]
];