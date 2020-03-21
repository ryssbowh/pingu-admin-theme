<ul class="list-group">
    @foreach($items as $item)
        <?php $class = $item->active ? '' : 'inactive'; ?> 
        <?php $parent = $item->parent ? $item->parent->id : ''; ?>
        <li class="list-group-item menu-item {{ $class }}" data-item="{{ $item->id }}">
            <div class="header">
                <i class="fa fa-bars"></i>
                <span class="name">{{ $item->name }}</span>
                <input name="models[{{ $item->id }}][weight]" value="{{ $item->weight }}" type="hidden" class="weight">
                <input name="models[{{ $item->id }}][parent]" value="{{ $parent }}" type="hidden" class="parent">
                @if($item->deletable)
                    @ifperm('delete menu items')
                        <a href="{{ $item::uris()->make('delete', $item, adminPrefix()) }}" data-ajaxmethod="delete" data-confirmtitle="Delete item ?" class="js-ajax-confirm-link delete float-right" data-confirmmessage="This action cannot be undone">Delete</a> 
                    @endifperm
                @endif
                @ifperm('edit menu items')
                    <a href="{{ $item::uris()->make('edit', $item, adminPrefix()) }}" class="js-ajax-link-form edit float-right mr-1">Edit</a>
                @endifperm
            </div>
            <?php $children = $item->getChildren(); ?>
            @if(!$children->isEmpty())
                @include('pages.menu._includes.tree', ['items' => $children])
            @endif
        </li>
    @endforeach
</ul>