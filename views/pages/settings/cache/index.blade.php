@extends('layouts.card')

@section('title')
    <h1>Cache</h1>
@endsection

@section('content')
    {{ FormFacade::open(['url' => adminPrefix().'/settings/cache', 'method' => 'post']) }}
    <div class="mb-3">
        <h2>Application cache</h2>
        @foreach($caches as $name => $cache)
            <div class="row">
                <div class="col">
                    <div class="checkbox-item">
                        {{ FormFacade::checkbox('caches[]', $name) }}
                        <div class="checkbox-label"><label>{{ $cache['name'] }}</label></div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
    {{ FormFacade::submit('Clear cache') }}
    {{ FormFacade::close() }}
    <div class="mt-3">
        <h2>Route cache</h2>
        <p>Caching the routes will make your application run faster. You can rebuild the cache if you encounter problems with pages not found.</p><p><b>@if($routesAreCached) The current cache was created the {{ date('d/m/Y, H:i', $cachedSince) }}. @else Routes are not cache now. @endif</b></p>
        {{ FormFacade::open(['url' => adminPrefix().'/settings/route_cache', 'method' => 'post']) }}
        <div class="checkbox-item">
            {{ FormFacade::checkbox('cacheRoutes', 1, $routesAreCached) }}
            <div class="checkbox-label"><label>Cache routes</label></div>
        </div>
        {{ FormFacade::submit('Save') }}
        {{ FormFacade::close() }}

        {{ FormFacade::open(['url' => adminPrefix().'/settings/rebuild_route_cache', 'method' => 'post', 'class' => 'mt-3']) }}
        {{ FormFacade::submit('Rebuild route cache') }}
        {{ FormFacade::close() }}
    </div>
@endsection