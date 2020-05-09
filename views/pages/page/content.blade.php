@extends('layouts.card')

@section('title')
    <h1>{{ $page->name }}'s Content</h1>
@endsection

@section('primaryActions')
    <a href="{{ url()->previous() }}">Back</a>
@endsection

@section('content')
    <div class="page-blocks row" data-slug="{{ $page->machineName }}">

        @include('pages.page._includes.blocklist')
        @include('pages.page._includes.blocks')
        
    </div>
@endsection