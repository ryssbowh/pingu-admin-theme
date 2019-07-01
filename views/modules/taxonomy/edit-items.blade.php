@extends('layouts.card')

@section('title')
<h1>{{ $taxonomy->name }}'s Items</h1>
@endsection

@section('content')
    <div class="edit-taxonomy-items" data-taxonomy="{{ $taxonomy->id }}">

        @include('core::contextualLinks')

        <li class="list-group-item taxonomy-item skeleton d-none" data-item="">
          <div class="header">
            <i class="fa fa-bars"></i>
            <span class="name"></span>
            @can('delete taxonomy terms')
              <a href="{{ $deleteItemUri }}" class="js-delete float-right">Delete</a>
            @endcan
            @can('edit taxonomy terms')
              <a href="{{ $editItemUri }}" class="js-edit float-right mr-1">Edit</a>
            @endcan
          </div>
        </li>

        @can('add taxonomy terms')
          <a href="{{ $addItemUri }}" class="js-add mb-2 d-inline-block">Add an item</a>
        @endcan

        <div class="taxonomy-tree">
          @if(!$items->isEmpty())
            @include('taxonomy::tree')
          @else
            <p>No items</p>
          @endif
       	</div>

        @can('edit taxonomy terms')
          <a href="{{ $patchItemsUri }}" class="js-save mt-2 d-inline-block btn btn-primary float-right disabled">Save</a>
        @endcan

    </div>
@endsection

