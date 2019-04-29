@extends('layouts.app')

@section('title')
Add {{ $object }}
@endsection

@section('content')
    @include('core::contextualLinks')
    <div class="editPage edit-{{ $object }}">
		{{ $form->render() }}
	</div>
@endsection