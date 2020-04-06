@extends('layouts.card')

@section('title')
    @if(isset($title))
    	<h1>{{ $title }}</h1>
    @else
    	<h1>Add a {{ $entity::friendlyName() }}</h1>
    @endif
@endsection

@section('primaryActions')
    <a href="{{ $indexUrl }}">Back</a>
@endsection


@section('content')
    <div class="create-entity create-{{ $entity->identifier() }}">
		{!! $form->render() !!}
	</div>
@endsection