@extends('forms@field')

@section('inner')
	<div class="checkbox-item">
		{{ FormFacade::hidden($field->getHtmlName(), 0, ['class' => 'noPopulation']) }}
        {{ FormFacade::checkbox($field->getHtmlName(), 1, $field->getValue(), $attributes->toArray()) }}
        <div class="checkbox-label">
            <label for="{{ $field->getName().$field->option('index') }}">
            @if($field->option('useLabel'))
                {{ $field->option('label') }}
            @endif
            </label>
        </div>
	</div>
@overwrite