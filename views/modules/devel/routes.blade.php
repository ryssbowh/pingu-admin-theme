@extends('layouts.card')

@section('title')
Routes
@endsection

@section('content')
    @include('jsgrid::list', $jsgrid)
@endsection