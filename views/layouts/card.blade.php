@extends('layouts.app')

@section('main')
	<div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">@yield('title')</div>

                    <div class="card-body">
                        @include('core::contextualLinks')
                        @yield('content')
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection