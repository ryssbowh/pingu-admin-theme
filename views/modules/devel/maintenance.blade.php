@extends('layouts.card')

@section('title')
<h1>Maintenance mode</h1>
@endsection

@section('content')
    {{ $form->render() }}
@endsection