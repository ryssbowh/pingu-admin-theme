@extends('layouts.app')

@section('title')
{{ $section }} Settings
@endsection

@section('content')
    @if($settings)
        @foreach($settings as $setting)
            <div class="row">
                <div class="col-md-6">{{ $setting->title }}</div>
                <div class="col-md-6">{{ $setting->value }}</div>
            </div>
        @endforeach
    @else
    	<div>No Settings found</div>
    @endif
    @if($canEdit)
        <a href="{{ $editUri }}">Edit</a>
    @endif
@endsection