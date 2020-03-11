@extends('forms@field')

@section('inner')
    <div class="checkboxes-items">
    	@foreach( $field->getItems()->getItems() as $item)
    		<div class="pretty p-default p-curve p-smooth">
    			{{ FormFacade::checkbox($field->getHtmlName(), $item->getKey(), in_array($item->getKey(), $field->getValue()), $item->getAttributes()) }}
    			<div class="state p-primary">
                    <label for="{{ $item->getId() }}">{{ $item->getLabel() }}</label>
                </div>
    		</div>
    	@endforeach
    </div>
@overwrite