@extends('layouts.card')

@section('title')
	<h1>Add a {{ $fieldType::friendlyName() }} field to {{ $bundle->bundleFriendlyName() }}</h1>
@endsection

@section('primaryActions')
    <a href="{{ url()->previous() }}">Back</a>
@endsection

@section('content')
    <div class="add-bundle-field">
  		{!! $form->render() !!}
	</div>
@endsection