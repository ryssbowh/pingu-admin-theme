@extends('layouts.card')

@section('title')
    <h1>Edit {{ ucfirst($section) }} Settings</h1>
@endsection

@section('content')
    {{ $form->render() }}
@endsection