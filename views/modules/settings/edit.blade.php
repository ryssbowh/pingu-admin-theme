@extends('layouts.app')

@section('title')
Edit Settings
@endsection

@section('content')
    {{ $form->render() }}
@endsection