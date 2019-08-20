@extends('layouts.card')

@section('title')
@if(isset($title))
	<h1>{{ $title }}</h1>
@else
	<h1>Edit {{ $model::friendlyName() }}</h1>
@endif
@endsection

@section('content')
    <div class="editPage edit-{{ kebab_case(strtolower($model::friendlyName())) }}">
		{{ $form->render() }}
	</div>
@endsection