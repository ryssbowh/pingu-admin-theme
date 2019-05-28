@foreach($items as $item)
	@if($item->isVisible() )
		<li class="nav-item {{ $item->class }}">{!! $item->generateLink() !!}
		@if($item->hasChildren())
			<ul class="list-group">
				@include('menus.includes.menutree', ['items' => $item->children])
			</ul>
		@endif
		</li>
	@endif
@endforeach
