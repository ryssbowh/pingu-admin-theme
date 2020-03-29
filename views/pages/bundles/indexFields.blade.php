@extends('layouts.card')

@section('title')
    <h1>Bundle {{ $bundle->friendlyName() }}</h1>
@endsection

@section('content')

    <div class="list-entity-fields container">

        @if($fields->isEmpty())
            <p>No fields</p>
        @else
            <ul class="list-group">
                @foreach($fields as $field)
                    <li class="list-group-item row" data-id="{{ $field->field->id }}">
                        <div class="row">
                            <div class="col-sm">{{ $field->field->name }} ({{ $field->field->machineName }})</div>
                            <div class="col-sm">{{ $field::friendlyName() }}</div>
                            <div class="col-sm text-right">
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

        @if($canCreate)
            <?php $form->isAjax(); ?>
            <div class="add-field-form row mt-2">
                {{ $form->render() }}
            </div>
        @endif

    </div>
@endsection