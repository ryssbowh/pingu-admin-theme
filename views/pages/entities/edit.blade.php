@extends('layouts.card')

@section('title')
    @if(isset($title))
    	<h1>{{ $title }}</h1>
    @else
    	<h1>{{ $model::friendlyName() }} {{ $model->getDescription() }}</h1>
    @endif
@endsection

@section('primaryActions')
    <a href="{{ $indexUrl }}">Back</a>
@endsection


@section('content')
    <div class="edit-model edit-{{ $model->identifier() }}">
		{!! $form->render() !!}
	</div>
@endsection