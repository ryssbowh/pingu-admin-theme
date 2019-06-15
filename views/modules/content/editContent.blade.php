@extends('layouts.app')

@section('title')
{{ $title }}
@endsection

@section('content')
    <div class="edit-content">
      {{ $form->render() }}
    </div>
@endsection