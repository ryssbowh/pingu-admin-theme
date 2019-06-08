@extends('layouts.app')

@section('title')
{{ $page->name }}'s Blocks
@endsection

@section('content')
    <div class="page-regions" data-page="{{ $page->id }}" data-blockindexuri="{{ $blockIndexUri }}">

        @include('core::contextualLinks')

        <div class="row">

            <li id="blockSkeleton" class="list-group-item d-none block">
                <i class="fa fa-bars"></i>
                <span class="provider"></span> :
                <span class="name"></span>
                @can('manage pages blocks')
                    <a href="#" class="js-delete-from-region float-right"><i class="fa fa-times"></i></a>
                @endcan
            </li>

            @can('manage pages blocks')
                <div class="col-3 js-block-list">
                    <div class="card">
                        <div class="card-header">Add a block</div>
                        <div class="card-body" id="block-list">
                            @if($providers)
                                <div class="text-left" id="providers-accordion">
                                @foreach($providers as $index => $provider)
                                    @if(!$provider->blocks->isEmpty())
                                        <div class="card js-provider" data-name="{{ $provider->name }}" data-provider="{{ $provider->id }}">
                                            <div class="card-header">
                                                <h5 class="mb-0">
                                                    <button data-target="#list-{{ $index }}" data-toggle="collapse" class="font-weight-bold btn btn-link">{{ $provider->name }}</button>
                                                    <span class="badge badge-primary badge-pill">{{ $provider->blocks->count() }}</span>
                                                </h5>
                                            </div>

                                            <div id="list-{{ $index }}" class="collapse @if($index==0) show @endif" data-parent="#providers-accordion">
                                                <ul class="card-body list-group">
                                                @foreach($provider->blocks as $block)
                                                    <li class="list-group-item text-left js-block" type="button" data-id="{{ $block->id }}"><span class="name">{{ $block->instance->name }}</span>
                                                        <div class="dropdown float-right">
                                                            <a id="block-{{ $block->id }}-dropdown" class="dropdown-toggler float-right" href="#" data-toggle="dropdown"><i class="fa fa-plus"></i></a>
                                                            <a href="{{ $blockClass::transformAjaxUri('edit', [$block], true) }}" class="js-edit float-right mr-2"><i class="fa fa-edit"></i></a>
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
                                    @endif
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
                            @foreach($providers->where('system', false)->all() as $provider)
                                <a class="dropdown-item js-add-block" data-provider="{{ $provider->id }}" href="{{ $blockClass::transformAjaxUri('create', [$provider], true) }}">{{ $provider->name }}</a>
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

                @can('manage pages blocks')
                    <div class="actions float-right">
                    	<a href="{{ $blockClass::getAjaxUri('patch', true) }}" class="btn btn-primary js-save disabled">Save</a>
                    </div>
                @endcan
            </div>
        </div>
    </div>
@endsection

