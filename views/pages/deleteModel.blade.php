@extends('layouts.card')

@section('title')
	<h1>Confirm deletion of {{ $model::friendlyName() }}</h1>
@endsection

@section('content')
    <div class="deletePage delete-{{ kebab_case(strtolower($model::friendlyName())) }}">
    	<p><b>This action cannot be undone</b></p>
		{{ $form->render() }}
	</div>
@endsection