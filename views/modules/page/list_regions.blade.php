@extends('layouts.app')

@section('title')
{{ $layout->name }}'s Regions
@endsection

@section('content')
    <div class="layout-regions" data-id="{{ $layout->id }}">

        @include('core::contextualLinks')

        @if ($errors->any())
		    <div class="alert alert-danger">
		        <ul>
		            @foreach ($errors->all() as $error)
		                <li>{{ $error }}</li>
		            @endforeach
		        </ul>
		    </div>
		@endif

        {{ FormFacade::open(['url' => $formUrl, 'method' => 'PUT']) }}

        <div id="page-container" class="page js-page">
        </div>

        <div class="actions">
        	<a href="#" class="js-add-region">Add a region</a>
        	{{ FormFacade::submit('Save')}}
        </div>

        {{ FormFacade::close() }}

    </div>
@endsection

