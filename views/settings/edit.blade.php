@extends('layouts.app')

@section('content')
<div class="col-md-9">
    <div class="card">
        <div class="card-header">Edit Settings (public)</div>

        <div class="card-body">
            {{ $form->render() }}
        </div>
    </div>
</div>
@endsection