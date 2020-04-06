@extends('layouts.card')

@section('title')
    @if(isset($title))
    	<h1>{{ $title }}</h1>
    @else
    	<h1>Confirm deletion of {{ $entity::friendlyName() }} {{ $entity->getDescription() }}</h1>
    @endif
@endsection

@section('primaryActions')
    <a href="{{ url()->previous() }}">Back</a>
@endsection

@section('content')
    <div class="delete-entity delete-{{ $entity->identifier() }}">
    	<p><b>This action cannot be undone</b></p>
		{!! $form->render() !!}
	</div>
@endsection