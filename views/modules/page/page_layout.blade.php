@extends('layouts.card')

@section('title')
{{ $page->name }}'s Regions
@endsection

@section('content')
    <div class="page-layout" data-id="{{ $page->id }}">

        @include('core::contextualLinks')

        <?php 
        $inputDisabled = '';
        if(Auth::user()->cannot('manage layouts regions')) $inputDisabled = 'disabled';
        ?>
        <div class="region js-region skeleton d-none">
            <div class="inner">
                <input type="text" {{ $inputDisabled }} name="">
                @can('manage page layouts')
                    <a href="{{ $deleteRegionUri }}" class="js-delete">Delete</a>
                @endcan
            </div>
        </div>

        <div id="page-container" class="page js-page">
            @if($regions)
                @foreach($regions as $index => $region)
                    <div class="region js-region" style="width:calc({{ $region->width }}% - 20px);height:{{ $region->height }}px" data-width="{{ $region->width }}" data-height="{{ $region->height }}" data-id="{{ $region->id }}">
                        <div class="inner">
                            <input type="text" {{ $inputDisabled }} name="regions[{{ $region->id }}][name]" value="{{ $region->name }}">
                            @can('manage page layouts')
                                <a href="{{ $region::transformUri('delete', [$region], config('core.ajaxPrefix')) }}" class="js-delete">Delete</a>
                            @endcan
                        </div>
                    </div>
                @endforeach
            @endif
        </div>

        @can('manage page layouts')
            <div class="actions">
                <a href="{{ $addRegionUri }}" class="js-add-region">Add a region</a>
                <a href="{{ $saveRegionUri }}" class="js-save btn btn-primary float-right disabled">Save</a>
            </div>
        @endcan

    </div>
@endsection

