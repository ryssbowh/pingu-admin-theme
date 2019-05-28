@extends('layouts.app')

@section('title')
Edit {{ ucfirst($section) }} Settings
@endsection

@section('content')
    {{ $form->render() }}
@endsection