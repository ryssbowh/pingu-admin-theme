@extends('layouts.app')

@section('title')
{{ $page->name }}'s Blocks
@endsection

@section('content')
    <div class="page-regions">

        @include('core::contextualLinks')

        <div class="row">

            <li id="blockSkeleton" class="list-group-item d-none block">
                <i class="fa fa-bars"></i>
                <span class="provider"></span> :
                <span class="name"></span>
                <a href="#" class="js-delete-from-region float-right"><i class="fa fa-times"></i></a>
            </li>

            <div class="col-3 js-block-list">
                <div class="card">
                    <div class="card-header">Add a block</div>
                    <div class="card-body" id="block-list">
                        @if($providers)
                            <div class="text-left" id="providers-accordion">
                            @foreach($providers as $index => $provider)
                                @if($provider['blocks'])
                                    <div class="card js-provider" data-name="{{ $provider['name'] }}">
                                        <div class="card-header">
                                            <h5 class="mb-0">
                                                <button data-target="#list-{{ $index }}" data-toggle="collapse" class="font-weight-bold btn btn-link">{{ $provider['name'] }}</button>
                                                <span class="badge badge-primary badge-pill">{{ $provider['blocks']->count() }}</span>
                                            </h5>
                                        </div>

                                        <div id="list-{{ $index }}" class="collapse @if($index==0) show @endif" data-parent="#providers-accordion">
                                            <div class="card-body list-group">
                                            @foreach($provider['blocks'] as $block)
                                                <li class="list-group-item text-left js-block" type="button" data-id="{{ $block->block_id }}"><span class="name">{{ $block->name }}</span>
                                                    <div class="dropdown float-right">
                                                        <a id="block-{{ $block->id }}-dropdown" href="#" data-toggle="dropdown"><i class="fa fa-plus"></i></a>
                                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                            @foreach($regions as $region)
                                                                <a class="dropdown-item js-add-to-region" data-region="{{ $region->id }}" href="#">Add to {{ $region->name }}</a>
                                                            @endforeach
                                                        </div>
                                                    </div>
                                                </li>
                                            @endforeach
                                            </div>
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
                        @foreach($providers as $provider)
                            <a class="dropdown-item js-add-block" data-provider="{{ $provider['id'] }}" href="#">{{ $provider['name'] }}</a>
                        @endforeach
                    </div>
                </div>
            </div>

            <div class="col-9 region-list">
                <div id="page-container" class="page js-page">
                    @foreach($regions as $region)
                        <div data-region-id="{{ $region->id }}" class="region" style="width:calc({{ $region->width }}% - 20px);min-height:{{ $region->height }}px">
                            <p class="name">{{ $region->name }}</p>
                            <ul class="list-group"></ul>
                        </div>
                    @endforeach
                </div>

                <div class="actions float-right">
                	<a href="#" class="btn btn-primary js-save">Save</a>
                </div>
            </div>
        </div>
    </div>
@endsection

