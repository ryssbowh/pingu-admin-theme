@extends('layouts.app')

@section('main')
	<div class="card-layout">
        <div class="layout-header">
            <div class="row">
                <div class="col-10">
                    @yield('title')
                    @yield('helper')
                </div>
                <div class="col-2 primary-actions">
                    @yield('primaryActions')
                </div>
            </div>
            <div class="row mt-2">
                @include('core@contextualLinks')
            </div>
        </div>

        <div class="layout-body">
            @yield('content')
        </div>
    </div>
@endsection