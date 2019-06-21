@extends('layouts.card')

@section('title')
@if(isset($title))
	<h1>{{ $title }}</h1>
@else
	<h1>Add a {{ $model::friendlyName() }}</h1>
@endif
@endsection

@section('content')
    <div class="addPage add-{{ kebab_case(strtolower($model::friendlyName())) }}">
		{{ $form->render() }}
	</div>
@endsection