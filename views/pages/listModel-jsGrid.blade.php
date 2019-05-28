@extends('layouts.app')

@section('title')
{{ $title }} <span style="display:none">(total: <span class="jsgrid-total"></span>)</span>
@if($canSeeAddLink)
	<div class="float-right">
		<a href="{{ $addLink }}">Add new</a>
	</div>
@endif
@endsection

@section('content')
    @include('core::contextualLinks')
    <div class="listPage">
		@include('jsgrid::list', $jsgrid)
	</div>
@endsection