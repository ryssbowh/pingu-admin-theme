@extends('layouts.app')

@section('title')
Add a setting
@endsection

@section('content')
    {{ $form->render() }}
@endsection