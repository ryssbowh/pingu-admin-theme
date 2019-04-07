@extends('layouts.app')

@section('content')
<div class="col-md-9">
    <div class="card">
        <div class="card-header">Add a {{ $object }}</div>

        <div class="card-body">
            @include('core::includes.addObject')
        </div>
    </div>
</div>
@endsection