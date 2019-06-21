@extends('layouts.card')

@section('title')
Add a setting
@endsection

@section('content')
    {{ $form->render() }}
@endsection