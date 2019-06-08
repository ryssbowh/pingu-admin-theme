<ul class="list-group">
	@foreach($items as $item)
		<?php $class = $item->active ? '' : 'inactive'; ?> 
		<li class="list-group-item menu-item {{ $class }}" data-item="{{ $item->id }}">
	        <div class="header">
	         	<i class="fa fa-bars"></i>
	          	<span class="name">{{ $item->name }}</span>
	          	@if($item->deletable)
		          	@can('delete menu items')
		        		<a href="{{ $item::transformAjaxUri('delete', [$item], true) }}" class="js-delete float-right">Delete</a> 
		        	@endcan
		        @endif
	        	@can('edit menu items')
	            	<a href="{{ $item::transformAjaxUri('edit', [$item], true) }}" class="js-edit float-right mr-1">Edit</a>
	            @endcan
	        </div>
	        <?php $children = $item->getChildren(); ?>
	        @if(!$children->isEmpty())
				@include('menu::tree', ['items' => $children])
			@endif
      	</li>
	@endforeach
</ul>