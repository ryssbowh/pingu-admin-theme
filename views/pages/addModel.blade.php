@extends('layouts.app')

@section('title')
Add a {{ $model::friendlyName() }}
@endsection

@section('content')
    <div class="addPage add-{{ kebab_case(strtolower($model::friendlyName())) }}">
		{{ $form->render() }}
	</div>
@endsection