<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    {!! Asset::container('modules')->styles() !!}
    {!! Asset::container('theme')->styles() !!}
</head>
<body>

    <div class="modal fade" tabindex="-1" role="dialog" id="globalModal">
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div id="app">
        
        @if(app()->isDownForMaintenance())
            <div class="maintenance-mode-on">You're using {{ config('app.name') }} in maintenance mode</div>
        @endif

        @include('menus.menu')

        <main class="py-4">
            @include('core::notify')
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">@yield('title')</div>

                            <div class="card-body">
                                @yield('content')
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Scripts -->
    {!! Asset::container('vendor')->scripts() !!}
    {!! Asset::container('modules')->scripts() !!}
    {!! Asset::container('theme')->scripts() !!}
    
</body>
</html>
