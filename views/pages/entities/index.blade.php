@extends('layouts.card')

@section('title')
    <h1>{{ $entity::friendlyNames() }}</h1>
    @can('create', get_class($entity))
        <span class="float-right"><a href="{{ $createUrl }}">New</a></span>
    @endcan
@endsection

@section('content')
    <div class="list-entity list-entity-{{ $entity->entityType() }}">
    	@if(!$entities->isEmpty()) 
        <table class="table">
            <thead>
                <tr>
                    @foreach($entities[0]->adminListFields as $field)
                        <th scope="col">{{ $entity::getFriendlyFieldName($field) }}</th>
                    @endforeach
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
    		@foreach($entities as $entity)
                <tr>
                    @foreach($entity->adminListFields as $field)
                        <td>{!! $entity->getFriendlyValue($field) !!}</td>
                    @endforeach
                    <td>
                        @if($actions = $entity::actions()->make($entity))
                            <div class="btn-group">
                                <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
                                <div class="dropdown-menu">
                                    @foreach($actions as $action)
                                        <a class="dropdown-item btn btn-primary" href="{{ $action['url'] }}">{{ $action['label'] }}</a>
                                    @endforeach
                                </div>
                            </div>
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