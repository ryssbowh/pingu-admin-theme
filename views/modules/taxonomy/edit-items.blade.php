@extends('layouts.card')

@section('title')
<h1>{{ $taxonomy->name }}'s Items</h1>
@endsection

@section('content')
    <div class="edit-taxonomy-items" data-taxonomy="{{ $taxonomy->id }}">

        <li class="list-group-item taxonomy-item skeleton d-none" data-item="">
          <div class="header">
            <i class="fa fa-bars"></i>
            <span class="name"></span>
            <input type="hidden" name="models[id][weight]">
            @can('delete taxonomy terms')
              <a href="{{ $deleteItemUri }}" class="js-delete js-ajax-confirm-link float-right" data-ajaxmethod="delete" data-confirmmessage="This action cannot be undone">Delete</a>
            @endcan
            @can('edit taxonomy terms')
              <a href="{{ $editItemUri }}" class="js-edit js-ajax-link-form float-right mr-1">Edit</a>
            @endcan
          </div>
        </li>

        @can('add taxonomy terms')
          <a href="{{ $addItemUri }}" class="js-add mb-2 d-inline-block js-ajax-link-form">Add an item</a>
        @endcan

        @can('edit taxonomy terms')
          {{ FormFacade::open(['url' => $patchItemsUri, 'method' => 'patch', 'class' => 'form js-ajax-form js-show-message']) }}
        @endcan

        <div class="taxonomy-tree">
          @if(!$items->isEmpty())
            <ul class="list-group taxonomy-list">
              @include('taxonomy::tree')
            </ul>
          @else
            <p>No items</p>
          @endif
       	</div>

        @can('edit taxonomy terms')
          {{ FormFacade::submit('Save', ['class' => 'save mt-2 d-inline-block btn btn-primary float-right']) }}
          {{ FormFacade::close() }}
        @endcan

    </div>
@endsection

