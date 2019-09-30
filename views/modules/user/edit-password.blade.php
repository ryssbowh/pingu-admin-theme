@extends('layouts.card')

@section('title')
	<h1>Change password</h1>
@endsection

@section('content')
    {!! $form->render() !!}
@endsection