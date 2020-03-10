@extends('layouts.card')

@section('title')
	<h1>Add a {{ $fieldType::friendlyName() }} field to {{ $bundle->bundleFriendlyName() }}</h1>
	<span class="float-right"><a href="{{ url()->previous() }}">Back</a></span>
@endsection

@section('content')
    <div class="add-bundle-field">
  		{!! $form->render() !!}
	</div>
@endsection