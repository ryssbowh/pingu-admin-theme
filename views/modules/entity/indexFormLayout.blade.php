@extends('layouts.card')

@section('title')
    <h1>Bundle {{ $bundle->bundleFriendlyName() }}</h1>
@endsection

@section('content')

    <div class="form-layout container">

        {{ FormFacade::open(['url' => $bundle::uris()->make('patchFormLayout', $bundle, ajaxPrefix()), 'method' => 'patch', 'class' => 'js-show-message']) }}

        @if($layout->isEmpty())
            <p>No fields</p>
        @else
        <ul class="list-group row js-list-root" id="js-list-root">
            @foreach($layout->get() as $index => $group)
                <li class="list-group-item container group">
                    <div class="row">
                        <input type="hidden" class="groupId" value="{{ $group->id }}">
                        <input type="hidden" class="groupName" value="{{ $group->name }}">
                        <div class="col-1 header">
                            <i class="fa fa-bars"></i>
                        </div>
                        <div class="col font-weight-bold name">Group {{ $group->name }}</div>
                        <div class="col text-right">
                            <a class="js-delete d-none" href="#">Delete</a>
                        </div>
                    </div>
                    <ul class="group-fields list-group row">
                        @foreach($group->layout as $fieldLayout)
                            <?php
                            $field = $fields[$fieldLayout->field]; 
                            $options = $fieldLayout->options;
                            ?>
                            <li class="list-group-item container">
                                <div class="row">
                                    <input type="hidden" class="options" value="{{ json_encode($options->values()) }}">
                                    <input type="hidden" class="id" value="{{ $fieldLayout->id }}">
                                    <div class="col header"><i class="fa fa-bars"></i></div>
                                    <div class="col">{{ $field->name() }}</div>
                                    <div class="col">
                                        {{ FormFacade::select('', \FormField::availableWidgets($field), $fieldLayout->widget::machineName()) }}
                                    </div>
                                    <div class="col description">
                                        {!! $options->friendlyDescription() !!}
                                    </div>
                                    <div class="col text-right">
                                        @if($options->hasOptions())
                                            <a class="js-edit" href="#">Edit</a>
                                        @endif
                                    </div>
                                </div>
                            </li>
                        @endforeach
                    </ul>
                </li>
            @endforeach
        </ul>
        @endif

        {{ FormFacade::submit('Save', ['class' => 'save btn btn-primary disabled float-right mt-3']) }}
        {{ FormFacade::close() }}

        <div class="row mt-3">
            @if($canCreateGroups)
                <div class="add-field-form col-3">
                    {{ FormFacade::open(['url' => '#', 'class' => 'form-create-form-layout-group']) }}
                    {{ FormFacade::label('Add Group')}}
                    {{ FormFacade::text('name', '', ['placeholder' => 'Name'])}}
                    {{ FormFacade::submit('Add', ['class' => 'mt-3']) }}
                    {{ FormFacade::close() }}
                </div>
            @endif
        </div>

    </div>
@endsection