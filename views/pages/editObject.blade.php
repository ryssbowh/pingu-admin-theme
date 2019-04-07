@extends('layouts.app')

@section('content')
<div class="col-md-9">
    <div class="card">
        <div class="card-header">Edit {{ $object }}</div>

        <div class="card-body">
            @include('core::includes.contextualLinks')
            @include('core::includes.editObject')
        </div>
    </div>
</div>
@endsection