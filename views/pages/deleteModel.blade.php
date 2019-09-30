@extends('layouts.card')

@section('title')
@if(isset($title))
	<h1>{{ $title }}</h1>
@else
	<h1>Confirm deletion of {{ $model::friendlyName() }}</h1>
@endif
@endsection

@section('content')
    <div class="deletePage delete-{{ kebab_case(strtolower($model::friendlyName())) }}">
    	<p><b>This action cannot be undone</b></p>
		{{ $form->render() }}
	</div>
@endsection