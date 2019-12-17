@extends('layouts.card')

@section('title')
@if(isset($title))
	<h1>{{ $title }}</h1>
@else
	<h1>Edit {{ $entity::friendlyName() }}, revision {{ $revision->id() }}</h1>
@endif
<span class="float-right"><a href="{{ url()->previous() }}">Back</a></span>
@endsection

@section('content')
    <div class="editRevision edit-{{ kebab_case(strtolower($entity::friendlyName())) }}-revision">
		{{ $form->render() }}
	</div>
@endsection