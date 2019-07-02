@extends('layouts.card')

@section('title')
<h1>Create content</h1>
@endsection

@section('content')
    <div class="create-content">
    	@if($types)
    	<ul class="list-group">
    		@foreach($types as $type)
    		<li class="list-group-item">
    			<div class="float-left">
    				{{ $type->name }}<br/>
    				<small>{{ $type->description}}</small>
    			</div>
    			<div class="float-right">
    				<a class="btn btn-primary" href="{{ $content::transformAdminUri('create', $type, true) }}">Create</a>
    			</div>
    		</li>
    		@endforeach
    	</ul>
    	@else
    	<p>You can't create any content</p>
    	@endif
    </div>
@endsection