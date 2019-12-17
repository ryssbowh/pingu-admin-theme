@extends('forms::field')

@section('inner')
	<div class="checkboxes-item pretty p-switch p-fill p-smooth">
		{{ FormFacade::hidden($field->getName(), 0, ['class' => 'noPopulation']) }}
        {{ FormFacade::checkbox($field->getName(), 1, $field->getValue(), $attributes->toArray()) }}
        <div class="state p-primary">
            <label for="{{ $field->getName().$field->getIndex() }}">
            @if($field->option('useLabel'))
                {{ $field->option('label') }}
            @endif
            </label>
        </div>
	</div>
@overwrite