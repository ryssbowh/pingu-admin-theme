@extends('layouts.card')

@section('title')
	<h1>Edit field {{ $field->instance->name }}</h1>
	<span class="float-right"><a href="{{ url()->previous() }}">Back</a></span>
@endsection

@section('content')
    <div class="edit-bundle-field">
  		{!! $form->render() !!}
	</div>
@endsection