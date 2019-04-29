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
    <div id="app">
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
