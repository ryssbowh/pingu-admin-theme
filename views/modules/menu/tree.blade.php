<ul class="list-group">
	@foreach($items as $item)
		<?php $class = $item->active ? '' : 'inactive'; ?> 
		<li class="list-group-item menu-item {{ $class }}" data-item="{{ $item->id }}">
	        <div class="header">
	         	<i class="fa fa-bars"></i>
	          	<span class="name">{{ $item->name }}</span>
	          	<input name="models[{{ $item->id }}][weight]" value="{{ $item->weight }}" type="hidden">
	          	@if($item->deletable)
		          	@can('delete menu items')
		        		<a href="{{ $item::makeUri('delete', $item, adminPrefix()) }}" data-ajaxmethod="delete" data-confirmtitle="Delete item ?" class="js-ajax-confirm-link delete float-right" data-confirmmessage="This action cannot be undone">Delete</a> 
		        	@endcan
		        @endif
	        	@can('edit menu items')
	            	<a href="{{ $item::makeUri('edit', $item, adminPrefix()) }}" class="js-ajax-link-form edit float-right mr-1">Edit</a>
	            @endcan
	        </div>
	        <?php $children = $item->getChildren(); ?>
	        @if(!$children->isEmpty())
				@include('menu::tree', ['items' => $children])
			@endif
      	</li>
	@endforeach
</ul>