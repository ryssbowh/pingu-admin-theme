@extends('layouts.card')

@section('title')
{{ $repository->section() }} Settings
@endsection

@section('content')
    <div class="settings-list">
    @if($keys = $repository->keys())
        <table class="table">
            <thead>
                <tr><th>Setting</th><th>Value</th></tr>
            </thead>
            <tbody>
                @foreach($keys as $name)
                    <tr>
                        <td>{{ $repository->title($name) }}
                            @if($helper = $repository->helper($name))
                                <small>  ({{ $helper }})</small>
                            @endif
                        </td>
                        <td>{{ $repository->friendlyValue($name) }} {{ $repository->unit($name) }}</td>
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