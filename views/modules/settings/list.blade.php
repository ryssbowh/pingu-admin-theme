@extends('layouts.app')

@section('title')
Settings
@endsection

@section('content')
    @if($settings)
        <div class="row">
    	@foreach($settings as $group => $list)
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header bg-secondary text-light">{{ $group }}</div>
                    <div class="card-body">
                    @foreach($list as $setting)
                        <div class="row">
                            <div class="col-md-6">{{ $setting->title }}</div>
                            <div class="col-md-6">{{ $setting->value }}</div>
                        </div>
                    @endforeach
                    </div>
                </div>
            </div>
    	@endforeach
        </div>
    @else
    	<div>No Settings found</div>
    @endif
    <a href="{{ route('settings.admin.edit') }}">Edit</a>
@endsection