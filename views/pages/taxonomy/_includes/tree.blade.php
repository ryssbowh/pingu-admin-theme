@foreach($items as $item)
    <li class="list-group-item taxonomy-item" data-item="{{ $item->id }}">
        <div class="header">
            <input type="hidden" name="models[{{ $item->id }}][weight]" value="{{ $item->weight }}">
            <i class="fa fa-bars"></i>
            <span class="name">{{ $item->name }}</span>
            @can('delete taxonomy terms')
                <a href="{{ $item->uris()->make('confirmDelete', [$item], adminPrefix()) }}" data-ajaxmethod="delete" class="js-delete float-right js-ajax-confirm-link" data-confirmmessage="This action cannot be undone">Delete</a> 
            @endcan
            @can('edit taxonomy terms')
                <a href="{{ $item->uris()->make('edit', [$item], adminPrefix()) }}" class="js-edit js-ajax-link-form float-right mr-1">Edit</a>
            @endcan
        </div>
        <?php $children = $item->children; ?>
        @if(!$children->isEmpty())
            <ul class="list-group">
                @include('pages.taxonomy._includes.tree', ['items' => $children])
            </ul>
        @endif
    </li>
@endforeach
