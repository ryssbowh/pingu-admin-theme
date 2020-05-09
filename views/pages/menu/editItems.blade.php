@extends('layouts.card')

@section('title')
<h1>{{ $menu->name }}'s Items</h1>
@endsection

@section('primaryActions')
    <a href="{{ url()->previous() }}">Back</a>
@endsection

@section('content')
    <div class="edit-menu-items" data-menu="{{ $menu->id }}">

        <li class="list-group-item menu-item skeleton d-none" data-item="">
          <div class="header">
            <i class="fa fa-bars"></i>
            <span class="name"></span>
            <input name="models[][id]" value="" type="hidden" class="id">
            <input name="models[][weight]" value="" type="hidden" class="weight">
            <input name="models[][parent]" value="" type="hidden" class="parent">
            @ifperm('delete menu items')
              <a href="{{ $deleteItemUri }}" data-ajaxmethod="delete" data-confirmtitle="Delete item ?" class="js-ajax-confirm-link delete float-right" data-confirmmessage="This action cannot be undone">Delete</a>
            @endifperm
            @ifperm('edit menu items')
              <a href="{{ $editItemUri }}" class="js-ajax-link-form edit float-right mr-1">Edit</a>
            @endifperm
          </div>
        </li>

        {{ FormFacade::open(['url' => $patchItemsUri, 'method' => 'patch', 'class' => 'js-show-message js-ajax-form']) }}

        @ifperm('create menu items')
          <a href="{{ $addItemUri }}" class="js-ajax-link-form add mb-2 d-inline-block">Add an item</a>
        @endifperm

        <div class="menu-tree">
       		 @include('pages.menu._includes.tree')
       	</div>

        @ifperm('edit menu items')
          {{ FormFacade::submit('Save', ['class' => 'save mt-2 d-inline-block btn btn-primary float-right']) }}
        @endifperm

        {{ FormFacade::close() }}

    </div>
@endsection

