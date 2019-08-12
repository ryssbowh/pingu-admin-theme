@extends('layouts.app')

@section('main')
	<div class="container infos">
        <h1>Infos</h1>
        <div class="row">
            @foreach($providers as $provider)
                <div class="cold-sm">
                    <div class="card">
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