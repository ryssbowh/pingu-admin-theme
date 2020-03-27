@extends('layouts.card')

@section('title')
    {{ $page->name }}'s Blocks
@endsection

@section('primaryActions')
    <a href="{{ url()->previous() }}">Back</a>
@endsection

@section('content')
    <div class="page-blocks row" data-slug="{{ $page->slug }}">

        <li id="blockSkeleton" class="list-group-item d-none block">
            <i class="fa fa-bars"></i>
            <span class="title"></span>
            <input type="hidden" class="weight" name="blocks[][weight]">
                <a href="#" class="js-delete float-right"><i class="fa fa-times"></i></a>
                <a href="#" class="js-edit float-right mr-3">Edit</a>
        </li>

        @can('create', $blockModel)
        <div class="block-available col-3">
            @if($blocks)
                <div class="text-left" id="sections-accordion">
                <?php $index = 0; ?>
                @foreach($blocks as $section => $list)
                    <?php $index++; ?>
                    <div class="card js-section">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <button data-target="#list-{{$index}}" data-toggle="collapse" class="font-weight-bold btn btn-link">{{ $section }}</button>
                                <span class="badge badge-primary badge-pill">{{ sizeof($list) }}</span>
                            </h5>
                        </div>

                        <div id="list-{{$index}}" class="collapse {{ $index == 1 ? 'show' : '' }}" data-parent="#sections-accordion">
                            <ul class="card-body list-group">
                            @foreach($list as $block)
                                <li class="list-group-item text-left js-block" type="button" data-hasoptions="{!! $block->hasOptions() !!}" data-machinename="{{ $block->fullMachineName() }}">
                                    <span class="name">{{ $block->name() }}</span>
                                    <i class="fa fa-plus float-right mt-1"></i>
                                </li>
                            @endforeach
                            </ul>
                        </div>
                    </div>
                @endforeach
                </div>
            @else
                <p>No blocks available</p>
            @endif
        </div>
        @endcan

        <div class="col-9">
            {{ FormFacade::open(['url' => $saveBlocksUri, 'method' => 'patch', 'class' => 'js-show-message js-ajax-form']) }}
                <div class="block-list">
                     <p class="name">Blocks</p>
                    <ul class="js-block-list">
                        @foreach(\Pages::blocks($page) as $block)
                            <li id="blockSkeleton" class="list-group-item block" data-id="{{ $block->id }}">
                                <i class="fa fa-bars"></i>
                                <span class="title @if(!$block->active) disabled @endif">{{ $block->instance()->title() }}</span>
                                <input type="hidden" class="weight" name="blocks[{{ $block->id }}][weight]">
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
    </div>
@endsection