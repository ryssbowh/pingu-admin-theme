@extends('layouts.card')

@section('title')
    <h1>{{ $model::friendlyNames() }}</h1>
@endsection

@section('primaryActions')
    @can('create', get_class($model))
        <a href="{{ $createUrl }}">New</a>
    @endcan
@endsection

@section('content')
    <div class="index-model index-{{ $model->identifier() }}">
    	@if(!$models->isEmpty()) 
        <table class="table">
            <thead>
                <tr>
                    @foreach($models[0]->adminListFields as $field)
                        <th scope="col">{{ $model::getFriendlyFieldName($field) }}</th>
                    @endforeach
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
    		@foreach($models as $model)
                <tr>
                    @foreach($model->adminListFields as $field)
                        <td>{!! $model->getFriendlyValue($field) !!}</td>
                    @endforeach
                    <td>
                        @if($actions = $model::actions()->make($model, adminPrefix()))
                            @if(sizeof($actions) > 1)
                                <div class="btn-group">
                                    <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
                                    <div class="dropdown-menu">
                                        @foreach($actions as $action)
                                            <a class="dropdown-item" href="{{ $action['url'] }}">{{ $action['label'] }}</a>
                                        @endforeach
                                    </div>
                                </div>
                            @else
                                <?php
                                $index = array_keys($actions)[0];
                                ?>
                                <a class="btn btn-secondary" href="{{ $actions[$index]['url'] }}">{{ $actions[$index]['label'] }}</a>
                            @endif
                        @endif
                    </td>
                </tr>
            @endforeach
            </tbody>
    	</table>
    	@else
    	   <p>No results</p>
    	@endif
    </div>
@endsection