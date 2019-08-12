<ul class="list-group">
	@foreach($items as $item)
		<li class="list-group-item taxonomy-item" data-item="{{ $item->id }}">
	        <div class="header">
	         	<i class="fa fa-bars"></i>
	          	<span class="name">{{ $item->name }}</span>
	          	@can('delete taxonomy terms')
	        		<a href="{{ $item::transformUri('delete', [$item], config('core.ajaxPrefix')) }}" class="js-delete float-right">Delete</a> 
	        	@endcan
	        	@can('edit taxonomy terms')
	            	<a href="{{ $item::transformUri('edit', [$item], config('core.ajaxPrefix')) }}" class="js-edit float-right mr-1">Edit</a>
	            @endcan
	        </div>
	        <?php $children = $item->children; ?>
	        @if(!$children->isEmpty())
				@include('taxonomy::tree', ['items' => $children])
			@endif
      	</li>
	@endforeach
</ul>