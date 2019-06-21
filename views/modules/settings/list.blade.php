@extends('layouts.card')

@section('title')
{{ ucfirst($section) }} Settings
@endsection

@section('content')
    <div class="settings-list">
    @if($settings)
        <table class="table">
            <thead>
                <tr><th>Setting</th><th>Value</th></tr>
            </thead>
            <tbody>
                @foreach($settings as $setting)
                    <tr>
                        <td>{{ $setting->title }}
                            @if($setting->helper)
                                <small>  ({{ $setting->helper }})</small>
                            @endif
                        </td>
                        <td>{{ $setting->value }} {{ $setting->unit }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @else
    	<div>No Settings found</div>
    @endif
    @if($canEdit)
        <a class="btn btn-primary" href="{{ $editUri }}">Edit</a>
    @endif
    </div>
@endsection