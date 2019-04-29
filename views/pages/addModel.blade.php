@extends('layouts.app')

@section('title')
Add a {{ $object }}
@endsection

@section('content')
    <div class="addPage add-{{ $object }}">
		{{ $form->render() }}
	</div>
@endsection