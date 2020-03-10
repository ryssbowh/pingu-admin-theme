@extends('layouts.card')

@section('title')
@if(isset($title))
	<h1>{{ $title }}</h1>
@else
	<h1>Edit {{ $entity::friendlyName() }}</h1>
@endif
<span class="float-right"><a href="{{ url()->previous() }}">Back</a></span>
@endsection

@section('content')
    <div class="editPage edit-{{ kebab_case(strtolower($entity::friendlyName())) }}">
		{{ $form->render() }}
	</div>
@endsection