@extends('layouts.app')

@section('title')
{{ $title }} <span style="display:none">(total: <span class="jsgrid-total"></span>)</span>
@if($addUrl)
	<div class="float-right">
		<a href="{{ $addUrl }}">Add new</a>
	</div>
@endif
@endsection

@section('content')
    <div class="jsGridList">
        @include('core::contextualLinks')
        <div class="jsgrid-table-{{ $name }} jsgrid-table" data-options="{{ $options }}" data-extraoptions="{{ $extra }}" data-fields="{{ $fields }}"></div>
    </div>
@endsection