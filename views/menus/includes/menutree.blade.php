@foreach($items as $item)
	@if($item->isVisible() )
		<li class="nav-item {{ $item->class }}">{!! $item->generateLink() !!}
		<?php $children = $item->getActiveChildren(); ?>
		@if(!$children->isEmpty())
			<ul class="list-group">
				@include('menus.includes.menutree', ['items' => $children])
			</ul>
		@endif
		</li>
	@endif
@endforeach
