@extends('layouts.app')

@section('title')
@if(isset($title))
	{{ $title }}
@else
	Add a {{ $model::friendlyName() }}
@endif
@endsection

@section('content')
    <div class="addPage add-{{ kebab_case(strtolower($model::friendlyName())) }}">
		{{ $form->render() }}
	</div>
@endsection