@extends('layouts.card')

@section('title')
    <h1>Bundle {{ $bundle->bundleFriendlyName() }}</h1>
@endsection

@section('content')

    <div class="list-entity-fields container">

        {{ FormFacade::open(['url' => $bundle::uris()->make('patchFields', $bundle, adminPrefix()), 'class' => 'js-ajax-form js-show-message', 'method' => 'patch']) }}

        @if($fields->isEmpty())
        <p>No fields</p>
        @else
        <ul class="list-group row">
            @foreach($fields as $field)
                <li class="list-group-item container" data-id="{{ $field->field->id }}">
                    <input type="hidden" name="models[{{ $field->field->id }}][weight]" value="{{ $field->field->weight }}">
                    <div class="row">
                        <div class="col-1 header"><i class="fa fa-bars"></i></div>
                        <div class="col">{{ $field->field->name }} ({{ $field->field->machineName }})</div>
                        <div class="col">{{ $field::friendlyName() }}</div>
                        <div class="col">
                            @if($canEdit)
                                @if($field->field->editable)
                                    <a class="js-ajax-link-form edit" href="{{ $bundle::uris()->make('editField', [$bundle, $field->field], adminPrefix()) }}">Edit</a>
                                @endif
                                @if($field->field->deletable)
                                    <a class="js-ajax-confirm-link delete" data-ajaxmethod="delete" data-confirmtitle="Delete field ?" data-confirmmessage="This action will delete all fields and their values and cannot be undone." href="{{ $bundle::uris()->make('deleteField', [$bundle, $field->field], adminPrefix()) }}">Delete</a>
                                @endif
                            @endif
                        </div>
                  </div>
                </li>
            @endforeach
        </ul>
        @endif

        {{ FormFacade::submit('Save', ['class' => 'save btn btn-primary disabled float-right']) }}
        {{ FormFacade::close() }}

        @if($canCreate)
            <?php $form->isAjax(); ?>
            <div class="add-field-form row mt-2">
                {{ $form->render() }}
            </div>
        @endif

    </div>
@endsection