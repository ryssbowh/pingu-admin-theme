@extends('layouts.card')

@section('title')
@if(isset($title))
	<h1>{{ $title }}</h1>
@else
	<h1>Confirm deletion of field {{ $field->instance->name }}</h1>
@endif
<span class="float-right"><a href="{{ url()->previous() }}">Back</a></span>
@endsection

@section('content')
    <div class="delete-bundle-field">
    	<p><b>This action cannot be undone</b></p>
		{{ $form->render() }}
	</div>
@endsection