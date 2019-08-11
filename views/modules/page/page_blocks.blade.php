@extends('layouts.card')

@section('title')
{{ $page->name }}'s Blocks
@endsection

@section('content')
    <div class="page-blocks" data-page="{{ $page->id }}" data-listblocksuri="{{ $listBlocksUri }}">

        @include('core::contextualLinks')

        <div class="row">

            <li id="blockSkeleton" class="list-group-item d-none block">
                <i class="fa fa-bars"></i>
                <span class="section"></span> :
                <span class="name"></span>
                @can('manage page blocks')
                    <a href="#" class="js-delete-from-region float-right"><i class="fa fa-times"></i></a>
                @endcan
            </li>

            @can('manage page blocks')
                <div class="col-3 js-block-list">
                    <div class="card">
                        <div class="card-header">Add a block</div>
                        <div class="card-body" id="block-list">
                            @if($blocks)
                                <div class="text-left" id="sections-accordion">
                                @foreach($blocks as $section => $blockList) 
                                    <div class="card js-section">
                                        <div class="card-header">
                                            <h5 class="mb-0">
                                                <button data-target="#list-{{Str::studly($section)}}" data-toggle="collapse" class="font-weight-bold btn btn-link">{{ $section }}</button>
                                                <span class="badge badge-primary badge-pill">{{ sizeof($blockList) }}</span>
                                            </h5>
                                        </div>

                                        <div id="list-{{Str::studly($section)}}" class="collapse" data-parent="#sections-accordion">
                                            <ul class="card-body list-group">
                                            @foreach($blockList as $block)
                                                <li class="list-group-item text-left js-block" type="button" data-id="{{ $block->block()->id }}" data-section="{{ $section }}"><span class="name">{{ $block->getBlockName() }}</span>
                                                    <div class="dropdown float-right">
                                                        <a id="block-{{ $block->block()->id }}-dropdown" class="dropdown-toggler float-right" href="#" data-toggle="dropdown"><i class="fa fa-plus"></i></a>
                                                        @if($block->blockIsEditable())
                                                            <a href="" class="js-edit float-right mr-2"><i class="fa fa-edit"></i></a>
                                                        @endif
                                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                            @foreach($regions as $region)
                                                                <a class="dropdown-item js-add-to-region" data-region="{{ $region->id }}" href="#">Add to {{ $region->name }}</a>
                                                            @endforeach
                                                        </div>
                                                    </div>
                                                </li>
                                            @endforeach
                                            </ul>
                                        </div>
                                    </div>
                                @endforeach
                                </div>
                            @else
                                No blocks
                            @endif
                        </div>
                    </div>
                    <div class="dropdown">
                        <a href="#" class="dropdown-toggle" id="createBlockDropdown" data-toggle="dropdown">Create a block</a>
                        <div class="dropdown-menu" aria-labelledby="createBlockDropdown">
                            @foreach($creators as $slug => $class)
                                <a class="dropdown-item js-add-block" href="{{ \BlockCreator::transformUri('create', $slug,  config('core.adminPrefix')) }}?redirect={{\Request::path()}}">{{ $class::getBlockSection() }}</a>
                            @endforeach
                        </div>
                    </div>
                </div>
            @endcan

            <div class="col-9 region-list">
                <div id="page-container" class="page js-page">
                    @foreach($regions as $region)
                        <div data-region-id="{{ $region->id }}" class="region" style="width:calc({{ $region->width }}% - 20px);min-height:{{ $region->height }}px">
                            <p class="name">{{ $region->name }}</p>
                            <ul class="list-group"></ul>
                        </div>
                    @endforeach
                </div>

                @can('manage page blocks')
                    <div class="actions float-right">
                    	<a href="{{ $patchUrl }}" class="btn btn-primary js-save disabled">Save</a>
                    </div>
                @endcan
            </div>
        </div>
    </div>
@endsection

