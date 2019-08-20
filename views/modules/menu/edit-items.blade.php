@extends('layouts.card')

@section('title')
<h1>{{ $menu->name }}'s Items</h1>
@endsection

@section('content')
    <div class="edit-menu-items" data-menu="{{ $menu->id }}">

        <li class="list-group-item menu-item skeleton d-none" data-item="">
          <div class="header">
            <i class="fa fa-bars"></i>
            <span class="name"></span>
            <input name="models[id][weight]" value="" type="hidden">
            @can('delete menu items')
              <a href="{{ $deleteItemUri }}" data-ajaxmethod="delete" data-confirmtitle="Delete item ?" class="js-ajax-confirm-link delete float-right" data-confirmmessage="This action cannot be undone">Delete</a>
            @endcan
            @can('edit menu items')
              <a href="{{ $editItemUri }}" class="js-ajax-link-form edit float-right mr-1">Edit</a>
            @endcan
          </div>
        </li>

        {{ FormFacade::open(['url' => $patchItemsUri, 'method' => 'patch', 'class' => 'js-show-message js-ajax-form']) }}

        @can('create menu items')
          <a href="{{ $addItemUri }}" class="js-ajax-link-form add mb-2 d-inline-block">Add an item</a>
        @endcan

        <div class="menu-tree">
       		 @include('menu::tree')
       	</div>

        @can('edit menu items')
          {{ FormFacade::submit('Save', ['class' => 'save mt-2 d-inline-block btn btn-primary float-right']) }}
        @endcan

        {{ FormFacade::close() }}

    </div>
@endsection

