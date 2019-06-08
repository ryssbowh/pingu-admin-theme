@extends('layouts.app')

@section('title')
{{ $contentType->name }}'s fields
@endsection

@section('content')
    @include('core::contextualLinks')
    <div class="list-content-type-field container">

      @if($fields->isEmpty())
        <p>No fields</p>
      @else
        <ul class="list-group row">
          @foreach($fields as $field)
            <li class="list-group-item container" data-id="{{ $field->id }}">
              <div class="row">
                <div class="col-1 header"><i class="fa fa-bars"></i></div>
                <div class="col">{{ $field->name }} ({{ $field->machineName }})</div>
                <div class="col">{{ $field->instance::friendlyName() }}</div>
                <div class="col">
                  @can('edit content types')
                    @if($field->editable)
                      <a href="{{ $field::transformAdminUri('edit', [$field], true) }}">Edit</a>
                    @endif
                    @if($field->deletable)
                      <a class="confirm js-delete" href="{{ $field::transformAjaxUri('delete', [$field], true) }}">Delete</a>
                    @endif
                  @endcan
                </div>
              </div>
            </li>
          @endforeach
        </ul>
      @endif

      <div class="add-field-form row">
        {{ $form->render() }}
      </div>

      @can('edit content types')
        <div class="actions mt-2 row">
          <a class="js-save btn btn-primary disabled" href="{{ $contentType::transformAjaxUri('patchFields', [$contentType], true) }}">Save</a>
        </div>
      @endcan
    </div>
@endsection