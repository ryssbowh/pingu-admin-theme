@extends('layouts.card')

@section('title')
Change password
@endsection

@section('content')
	@include('core::contextualLinks')
    {{ $form->render() }}
@endsection