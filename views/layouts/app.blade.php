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

    <div class="modal fade" tabindex="-1" role="dialog" id="messageModal">
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
                    <button type="button" class="btn btn-primary confirm" data-dismiss="modal">Confirm</button>
                    <button type="button" class="btn btn-secondary cancel" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" tabindex="-1" role="dialog" id="modalSkeleton">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            </div>
        </div>
    </div>

    <div id="js-global-spinner">
        <div class="loading-spinner"></div>
    </div>

    <div id="app">
        
        @if(app()->isDownForMaintenance())
            <div class="maintenance-mode-on">You're using {{ config('app.name') }} in maintenance mode</div>
        @endif

        <nav class="navbar navbar-main">
            <a class="navbar-brand" href="{{ url('/') }}">
                {{ config('app.name', 'Laravel') }}
            </a>

            {!! \Menus::menu('admin-menu')->render() !!}

            <ul class="navbar-nav ml-auto user-form">
                <li class="btn-group dropup">
                    <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                        Admin <span class="caret"></span>
                    </a>

                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="{{ route('user.logout') }}"
                           onclick="event.preventDefault();
                                         document.getElementById('logout-form').submit();">
                            {{ __('Logout') }}
                        </a>

                        <form id="logout-form" action="{{ route('user.logout') }}" method="POST" style="display: none;">
                            @csrf
                        </form>
                    </div>
                </li>
            </ul>
        </nav>

        <main class="py-4 @if(env('APP_ENV') == 'production') showOnLoad @endif">
            <div class="container">
                @include('core@notify')
                
                @yield('main')
            </div>
        </main>
    </div>

    <!-- Scripts -->
    @include('core@jsconfig')
    {!! Asset::container('vendor')->scripts() !!}
    {!! Asset::container('modules')->scripts() !!}
    {!! Asset::container('theme')->scripts() !!}
    
</body>
</html>
