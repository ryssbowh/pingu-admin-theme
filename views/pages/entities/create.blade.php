@extends('layouts.card')

@section('title')
    @if(isset($title))
    	<h1>{{ $title }}</h1>
    @else
    	<h1>Add a {{ $entity::friendlyName() }}</h1>
    @endif
@endsection

@section('primaryActions')
    <a href="{{ url()->previous() }}">Back</a>
@endsection


@section('content')
    <div class="addPage add-{{ kebab_case(strtolower($entity::friendlyName())) }}">
		{{ $form->render() }}
	</div>
@endsection