@extends('layouts.card')

@section('title')
    <h1>Bundle {{ $bundle->friendlyName() }}</h1>
@endsection

@section('content')

    <div class="field-display container">

        {{ FormFacade::open(['url' => $bundle::uris()->make('patchFieldDisplay', [$bundle, $viewMode], ajaxPrefix()), 'method' => 'patch', 'class' => 'js-show-message field-display-form', 'autocomplete' => 'off']) }}

        @if($display->isEmpty())
            <p>No fields</p>
        @else
        <ul class="list-group row js-list-root" id="js-list-root">
            <li class="headers list-group-item">
                <div class="row">
                    <div class="col-1"></div>
                    <div class="col">Field</div>
                    <div class="col">Hidden</div>
                    <div class="col">Format</div>
                    <div class="col"></div>
                    <div class="col-1"></div>
                </div>
            </li>
            @foreach($display->get() as $name => $displayModel)
                <?php
                $weight = 0;
                $field = $fields[$displayModel->field]; 
                $displayer = $displayModel->displayer;
                $hiddenClass = $displayModel->hidden ? 'hidden' : '';
                ?>
                <li class="list-group-item container field">
                    <div class="row">
                        <input type="hidden" name="options[{{ $weight }}]" class="options" value="@if ($displayer->hasOptions()) {{ json_encode($displayer->options()->formValues()) }}@endif">
                        <input type="hidden" class="id" name="id[{{$weight}}]" value="{{ $displayModel->id }}">
                        <div class="col-1 header hideable {{ $hiddenClass }}">
                            <div class="col-inner">
                                <i class="fa fa-bars"></i>
                            </div>
                        </div>
                        <div class="col title hideable {{ $hiddenClass }}">
                            <div class="col-inner">
                                {{ $field->name() }}
                            </div>
                        </div>
                        <div class="col hideable {{ $hiddenClass }}">
                            <div class="checkbox-item col-inner">
                                {{ FormFacade::checkbox('hidden['.$weight.']', 1, $displayModel->hidden, ['class' => 'hidden', 'data-default' => $displayModel->hidden]) }}
                                <div class="checkbox-label"><label></label></div>
                            </div>
                        </div>
                        <div class="col field-wrapper displayer">
                            <div class="col-inner">
                                {{ FormFacade::select('displayer['.$weight.']', \FieldDisplayer::getListForField($field), $displayer::machineName(), ['class' => 'displayer']) }}
                            </div>
                        </div>
                        <div class="col description hideable {{ $hiddenClass }}">
                            <div class="col-inner">
                                @if ($displayer->hasOptions())
                                    {!! $displayer->options()->friendlyDescription() !!}
                                @endif
                            </div>
                        </div>
                        <div class="col-1 text-right hideable {{ $hiddenClass }}">
                            <div class="col-inner">
                                <a href="#" class="js-edit @if(!$displayer->hasOptions()) d-none @endif">Edit</a>
                            </div>
                        </div>
                    </div>
                </li>
                <?php $weight ++; ?>
            @endforeach
        </ul>
        @endif

        {{ FormFacade::submit('Save', ['class' => 'save btn btn-primary float-right mt-3']) }}
        {{ FormFacade::close() }}

    </div>
@endsection