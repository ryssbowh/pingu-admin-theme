@extends('layouts.card')

@section('title')
    @if(isset($title))
    	<h1>{{ $title }}</h1>
    @else
    	<h1>{{ $entity::friendlyName() }} {{ $entity->getDescription() }}</h1>
    @endif
@endsection

@section('primaryActions')
    <a href="{{ $indexUrl }}">Back</a>
@endsection


@section('content')
    <div class="edit-entity edit-{{ $entity->identifier() }}">
		{!! $form->render() !!}
	</div>
@endsection