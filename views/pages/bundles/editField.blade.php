@extends('layouts.card')

@section('title')
	<h1>Edit field {{ $field->instance->name }}</h1>
@endsection

@section('primaryActions')
    <a href="{{ url()->previous() }}">Back</a>
@endsection

@section('content')
    <div class="edit-bundle-field">
  		{!! $form->render() !!}
	</div>
@endsection