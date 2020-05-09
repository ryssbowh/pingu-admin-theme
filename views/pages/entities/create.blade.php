@extends('layouts.card')

@section('title')
    @if(isset($title))
    	<h1>{{ $title }}</h1>
    @else
    	<h1>Add a {{ $model::friendlyName() }}</h1>
    @endif
@endsection

@section('primaryActions')
    <a href="{{ $indexUrl }}">Back</a>
@endsection


@section('content')
    <div class="create-model create-{{ $model->identifier() }}">
		{!! $form->render() !!}
	</div>
@endsection