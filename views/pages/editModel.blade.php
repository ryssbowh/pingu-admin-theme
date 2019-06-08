@extends('layouts.app')

@section('title')
@if(isset($title))
	{{ $title }}
@else
	Edit {{ $model::friendlyName() }}
@endif
@endsection

@section('content')
    @include('core::contextualLinks')
    <div class="editPage edit-{{ kebab_case(strtolower($model::friendlyName())) }}">
		{{ $form->render() }}
	</div>
@endsection