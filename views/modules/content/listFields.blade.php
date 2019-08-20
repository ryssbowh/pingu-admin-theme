@extends('layouts.card')

@section('title')
{{ $contentType->name }}'s fields
@endsection

@section('content')

    <div class="list-content-type-field container">

      {{ FormFacade::open(['url' => $contentType::makeUri('patchFields', [$contentType], adminPrefix()), 'class' => 'js-ajax-form js-show-message', 'method' => 'patch']) }}

      @if($fields->isEmpty())
        <p>No fields</p>
      @else
        <ul class="list-group row">
          @foreach($fields as $field)
            <li class="list-group-item container" data-id="{{ $field->id }}">
              <input type="hidden" name="models[{{ $field->id }}][weight]" value="{{ $field->weight }}">
              <div class="row">
                <div class="col-1 header"><i class="fa fa-bars"></i></div>
                <div class="col">{{ $field->name }} ({{ $field->machineName }})</div>
                <div class="col">{{ $field->instance::friendlyName() }}</div>
                <div class="col">
                  @can('edit content types')
                    @if($field->editable)
                      <a class="js-ajax-link-form edit" href="{{ $field::makeUri('edit', [$field], adminPrefix()) }}">Edit</a>
                    @endif
                    @if($field->deletable)
                      <a class="js-ajax-confirm-link delete" data-ajaxmethod="delete" data-confirmtitle="Delete field ?" data-confirmmessage="This action cannot be undone" href="{{ $field::makeUri('delete', [$field], adminPrefix()) }}">Delete</a>
                    @endif
                  @endcan
                </div>
              </div>
            </li>
          @endforeach
        </ul>
      @endif

      {{ FormFacade::submit('Save', ['class' => 'save btn btn-primary disabled float-right']) }}
      {{ FormFacade::close() }}

      <div class="add-field-form row mt-2">
        {{ $form->render() }}
      </div>

    </div>
@endsection