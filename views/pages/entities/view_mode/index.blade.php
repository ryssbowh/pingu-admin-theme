@extends('layouts.card')

@section('title')
    <h1>{{ $entity::friendlyNames() }}</h1>
@endsection

@section('helper')
    <div class="helper">Choose which view modes you want to be available for each entity</div>
@endsection

@section('primaryActions')
    @can('create', get_class($entity))
        <a href="{{ $createUrl }}" class="js-ajax-link-form js-create">New</a>
    @endcan
@endsection

@section('content')
    <div class="list-entity list-entity-{{ $entity->entityType() }}">
        {{ FormFacade::open(['url' => $entity::uris()->make('patch', [], ajaxPrefix()), 'method' => 'patch', 'class' => 'form js-ajax-form js-show-message', 'autocomplete' => 'off']) }}
        @foreach(\ViewMode::get() as $viewMode)
            <div class="view-mode mb-4">
                <div class="row">
                    <div class="col-12">
                        <h3 class="d-inline-block mr-3">{{ $viewMode->name }}</h3>  @can('delete', $viewMode) <a href="{{ $viewMode::uris()->make('delete', $viewMode) }}" class="js-delete js-ajax-confirm-link" data-confirmmessage="This will not check if entities are actually using this view mode" data-ajaxmethod="delete">Delete</a>@endcan
                        @can('edit', $viewMode) <a href="{{ $viewMode::uris()->make('edit', $viewMode) }}" class="js-edit js-ajax-link-form">Edit</a>@endcan
                    </div>
                    @foreach (\Entity::getRenderableEntities() as $name => $class)
                        <div class="col">
                            <div class="checkbox-item">
                                {{ FormFacade::checkbox('models['.$viewMode->id.'][]', $name, \ViewMode::entityHas($name, $viewMode)) }}
                                <div class="checkbox-label">
                                    <label for="{{ 'models['.$viewMode->id.'][]' }}">
                                        {{ ucfirst($name) }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        @endforeach
        {{ FormFacade::submit('Save', ['class' => 'float-right']) }}
        {{ FormFacade::close() }}
    </div>
@endsection