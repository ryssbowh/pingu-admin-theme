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
	    		'textinput' => 'form-control col-md-8',
		        'select' => 'form-control col-md-8',
		        'password' => 'form-control col-md-8',
		        'datetime' => 'form-control js-datepicker col-md-8',
		        'email' => 'form-control col-md-8',
		        'textarea' => 'form-control col-md-8',
		        'checkbox' => 'form-check form-check-inline',
		        'radio' => 'form-check form-check-inline',
		        'submit' => 'btn btn-primary'
		    ]
	    ],
	    /**
	     * Extra classes for fields
	     */
	    'field-default-classes' => 'field-inner col-md-8',
	    /**
	     * Classes for labels, index by field name
	     */
	    'label-classes' => [],
	    /**
	     * Default classes for label
	     */
	    'label-default-classes' => 'label col-md-4',
	    /**
	     * Field wrapper classes index by field name
	     */
	    'wrapper-classes' => [],
	    /**
	     * field wrapper default classes
	     */
	    'wrapper-default-classes' => 'field form-group row',
	]
];