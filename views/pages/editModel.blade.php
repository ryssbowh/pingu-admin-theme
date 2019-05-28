@extends('layouts.app')

@section('title')
Edit {{ $model::friendlyName() }}
@endsection

@section('content')
    @include('core::contextualLinks')
    <div class="editPage edit-{{ kebab_case(strtolower($model::friendlyName())) }}">
		{{ $form->render() }}
	</div>
@endsection