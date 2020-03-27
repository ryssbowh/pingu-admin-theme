@if($links = ContextualLinks::get() and sizeof($links) > 1)
	<div class="contextualLinks">
		<ul>
			@foreach($links as $name => $details)
				<li @if($name ==  ContextualLinks::getActiveLink()) class="active"@endif><a href="{{ $details['url'] }}">{{ $details['label'] }}</a></li>
			@endforeach
		</ul>
	</div>
@endif
