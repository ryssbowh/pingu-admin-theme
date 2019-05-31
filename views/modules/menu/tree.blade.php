<ul class="list-group">
	@foreach($items as $item)
		<?php $class = $item->active ? '' : 'inactive'; ?> 
		<li class="list-group-item menu-item {{ $class }}" data-item="{{ $item->id }}">
	        <div class="header">
	         	<i class="fa fa-bars"></i>
	          	<span class="name">{{ $item->name }}</span>
	          	@can('delete menu items')
	        		<a href="{{ replaceUriSlugs($item::getAjaxUri('delete', true), [$item->id]) }}" class="js-delete float-right">Delete</a> 
	        	@endcan
	        	@can('edit menu items')
	            	<a href="{{ replaceUriSlugs($item::getAjaxUri('edit', true), [$item->id]) }}" class="js-edit float-right mr-1">Edit</a>
	            @endcan
	        </div>
	        @if(!$item->children->isEmpty())
				@include('menu::tree', ['items' => $item->children])
			@endif
      	</li>
	@endforeach
</ul>