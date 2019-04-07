@if( $messages = session()->pull('messages'))
	<div class="py-4 messages">
    	<div class="container">
    		<div class="alert alert-success">
		        <ul>
		            @foreach ($messages as $message)
		                <li>{{ $message }}</li>
		            @endforeach
		        </ul>
		    </div>
    	</div>
	</div>
@endif
 