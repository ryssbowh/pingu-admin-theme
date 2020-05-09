<li id="blockSkeleton" class="list-group-item d-none block">
    <i class="fa fa-bars"></i>
    <span class="title"></span>
    <input type="hidden" class="weight" name="blocks[][weight]">
    <input type="hidden" class="id" name="blocks[][id]">
        <a href="#" class="js-delete float-right"><i class="fa fa-times"></i></a>
        <a href="#" class="js-edit float-right mr-3">Edit</a>
</li>

<div class="col-9">
    {{ FormFacade::open(['url' => $saveBlocksUri, 'method' => 'patch', 'class' => 'js-show-message js-ajax-form']) }}
        <div class="block-list">
             <p class="name">Blocks</p>
            <ul class="js-block-list">
                @foreach(\Pages::blocks($page) as $block)
                    <li class="list-group-item block">
                        <i class="fa fa-bars"></i>
                        <span class="title @if(!$block->active) disabled @endif">{{ $block->instance()->title() }}</span>
                        <input type="hidden" class="id" name="blocks[][id]" value="{{ $block->id }}">
                        <input type="hidden" class="weight" name="blocks[][weight]">
                        @can('delete', $block)
                            <a href="{{ $page::uris()->make('deleteBlock', [$page, $block], adminPrefix()) }}" class="js-delete float-right"><i class="fa fa-times"></i></a>
                        @endcan
                        @can('edit', $block)
                            <a href="" class="js-edit float-right mr-3">Edit</a>
                        @endcan
                    </li>
                @endforeach
            </ul>
        </div>
        {{ FormFacade::submit('Save', ['class' => 'js-save btn btn-primary float-right d-none mt-3']) }}
    {{ FormFacade::close() }}
</div>