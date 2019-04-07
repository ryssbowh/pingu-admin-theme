@extends('layouts.app')

@section('content')
<div class="col-md-9">
    <div class="card">
        <div class="card-header">Settings</div>

        <div class="card-body">
            @if($settings)
            	@foreach($settings as $key=>$setting)
            		<div class="col-md-6">{{ $setting->title }}</div>
            		<div class="col-md-6">{{ $setting->value }}</div>
            	@endforeach
            @else
            	<div>No Settings found</div>
            @endif
            <a href="{{ route('admin.settings.edit') }}">Edit</a>
        </div>
    </div>
</div>
@endsection