@extends('layouts.card')

@section('title')
{{ $page->name }}'s Regions
@endsection

@section('content')
    <div class="page-layout" data-id="{{ $page->id }}">

        <?php 
        $inputDisabled = '';
        if(Auth::user()->cannot('manage layouts regions')) $inputDisabled = 'disabled';
        ?>
        <div class="region js-region skeleton d-none">
            <div class="inner">
                <input type="text" class="name" {{ $inputDisabled }}>
                <input type="hidden" class="width" {{ $inputDisabled }}>
                <input type="hidden" class="height" {{ $inputDisabled }}>
                @can('manage page layouts')
                    <a href="{{ $deleteRegionUri }}" data-confirmmessage="This action cannot be undone" class="delete js-ajax-confirm-link" data-ajaxmethod="delete" data-confirmtitle="Delete region ?">Delete</a>
                @endcan
            </div>
        </div>

        {{ FormFacade::open(['url' => $saveRegionUri, 'method' => 'patch', 'class' => 'js-ajax-form']) }}
        <div id="page-container" class="page js-page">
            @if($regions)
                @foreach($regions as $index => $region)
                    <div class="region js-region" style="width:calc({{ $region->width }}% - 20px);height:{{ $region->height }}px" data-width="{{ $region->width }}" data-height="{{ $region->height }}" data-id="{{ $region->id }}">
                        <div class="inner">
                            <input type="text" class="name" {{ $inputDisabled }} name="models[{{ $region->id }}][name]" value="{{ $region->name }}">
                            <input type="hidden" class="width" {{ $inputDisabled }} name="models[{{ $region->id }}][width]" value="{{ $region->width }}">
                            <input type="hidden" class="height" {{ $inputDisabled }} name="models[{{ $region->id }}][height]" value="{{ $region->height }}">
                            @can('manage page layouts')
                                <a href="{{ $region::makeUri('delete', [$region], adminPrefix()) }}" class="js-ajax-confirm-link delete" data-confirmtitle="Delete region ?" data-ajaxmethod="delete" data-confirmmessage="This action cannot be undone">Delete</a>
                            @endcan
                        </div>
                    </div>
                @endforeach
            @endif
        </div>

        @can('manage page layouts')
            <div class="actions">
                <a href="{{ $addRegionUri }}" class="add-region js-ajax-link-form">Add a region</a>
                {{ FormFacade::submit('Save', ['class' => 'js-save btn btn-primary float-right']) }}
            </div>
        @endcan
        {{ FormFacade::close() }}

    </div>
@endsection

