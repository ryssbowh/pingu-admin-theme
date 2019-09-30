@extends('layouts.card')

@section('title')
    <h1>{{ $entity::friendlyNames() }}</h1>
    @if($canCreate)
        <span class="float-right"><a href="{{ $createUrl }}">New</a></span>
    @endif
@endsection

@section('content')
    <div class="list-entity {{ $entity::machineNames() }}">
    	@if($entities)
        <table class="table">
            <thead>
                <tr>
                    @foreach($entities[0]->adminListFields as $field)
                        <th scope="col">{{ ucfirst($field) }}</th>
                    @endforeach
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
    		@foreach($entities as $entity)
                <tr>
                    @foreach($entity->adminListFields as $field)
                        <td>{{ $entity->$field }}</td>
                    @endforeach
                    <td>
                        <div class="btn-group">
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
                            <div class="dropdown-menu">
                                @foreach($entity->actions()->get() as $action)
                                    <a class="dropdown-item btn btn-primary" href="{{ $action['url'] }}">{{ $action['label'] }}</a>
                                @endforeach
                            </div>
                        </div>
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