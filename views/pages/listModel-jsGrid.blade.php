@extends('layouts.card')

@section('title')
	<h1>{{ $title }} <span style="display:none">(total: <span class="jsgrid-total"></span>)</span></h1>
	@if($canSeeAddLink)
		<div class="float-right">
			<a href="{{ $addLink }}">Add new</a>
		</div>
	@endif
@endsection

@section('content')
    @include('core@contextualLinks')
    <div class="listPage">
		@include('jsgrid@listModel', $jsgrid)
	</div>
@endsection