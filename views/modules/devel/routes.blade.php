@extends('layouts.card')

@section('title')
	<h1>Routes</h1>
@endsection

@section('content')
    @include('jsgrid::list', $jsgrid)
@endsection