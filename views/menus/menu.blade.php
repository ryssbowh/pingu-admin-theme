<nav class="navbar navbar-expand-lg navbar-main">
    <div class="container">
    	<a class="navbar-brand" href="{{ url('/admin') }}">
            {{ config('app.name', 'Laravel') }}
        </a>

        <div class="collapse navbar-collapse">
	    	<ul class="navbar-nav mr-auto">
		        <li class="nav-item"><a href="{{ route('admin.settings')}}">Settings</a></li>
		        <li class="nav-item"><a href="{{ route('admin.users')}}">Users</a></li>
		        <li class="nav-item"><a href="{{ route('admin.roles')}}">Roles</a></li>
		        <li class="nav-item"><a href="{{ route('admin.pages')}}">Pages</a></li>
		        <li class="nav-item"><a href="{{ route('admin.pageLayouts')}}">Layouts</a></li>
		    </ul>

		    <ul class="navbar-nav ml-auto">
		        <li class="nav-item dropdown">
		            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
		                Admin <span class="caret"></span>
		            </a>

		            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
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
		</div>
	</div>
</div>