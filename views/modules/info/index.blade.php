@extends('layouts.card')

@section('title')
    <h1>Infos</h1>
@endsection

@section('content')
	<div class="container infos">
        <div class="row">
            @foreach($providers as $provider)
                <div class="col-4 p-1">
                    <div class="card mb-1">
                        <div class="card-header">{{ $provider::title() }}</div>

                        <div class="card-body">
                            {!! $provider->render() !!}
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endsection