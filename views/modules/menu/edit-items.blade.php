@extends('layouts.app')

@section('title')
{{ $menu->name }}'s Items
@endsection

@section('content')
    <div class="edit-menu-items" data-menu="{{ $menu->id }}">

        @include('core::contextualLinks')

        <li class="list-group-item menu-item skeleton d-none" data-item="">
          <div class="header">
            <i class="fa fa-bars"></i>
            <span class="name"></span>
            @can('delete menu items')
              <a href="{{ $deleteItemUri }}" class="js-delete float-right">Delete</a>
            @endcan
            <a href="{{ $editItemUri }}" class="js-edit float-right mr-1">Edit</a>
          </div>
        </li>

        @can('add menu')
          <a href="{{ $addItemUri }}" class="js-add mb-2 d-inline-block">Add an item</a>
        @endcan

        <div class="menu-tree">
       		 @include('menu::tree')
       	</div>

        @can('edit menu')
          <a href="{{ $patchItemsUri }}" class="js-save mt-2 d-inline-block btn btn-primary float-right disabled">Save</a>
        @endcan

    </div>
@endsection

