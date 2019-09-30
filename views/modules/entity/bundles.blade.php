@extends('layouts.card')

@section('title')
    <h1>Bundle management</h1>
@endsection

@section('content')
    <div class="bundles">
    	@if($bundles)
            <ul class="list-group">
            @foreach($bundles as $section => $bundleList)
                @if(sizeof($bundleList) > 1)
                    <li class="list-group-item"><b>{{ $section }}</b>
                        <ul class="list-group mt-3">
                            @foreach($bundleList as $bundle)
                                <li class="list-group-item">{{ $bundle->bundleFriendlyname() }}
                                    <div class="btn-group float-right">
                                        <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
                                        <div class="dropdown-menu">
                                            @foreach($bundle->actions()->get() as $action)
                                                <a class="dropdown-item btn btn-primary" href="{{ $action['url'] }}">{{ $action['label'] }}</a>
                                            @endforeach
                                        </div>
                                    </div>
                                </li>
                            @endforeach
                        </ul>
                    </li>
                @else
                    <li class="list-group-item">{{ $bundleList[0]->bundleFriendlyname() }}
                        <div class="btn-group float-right">
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
                            <div class="dropdown-menu">
                                @foreach($bundleList[0]->actions()->get() as $action)
                                    <a class="dropdown-item btn btn-primary" href="{{ $action['url'] }}">{{ $action['label'] }}</a>
                                @endforeach
                            </div>
                        </div>
                    </li>
                @endif
            @endforeach
            </ul>
    	@else
    	   <p>No bundles</p>
    	@endif
    </div>
@endsection