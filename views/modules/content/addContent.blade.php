@extends('layouts.app')

@section('title')
{{ $title }}
@endsection

@section('content')
    <div class="add-content">
      {{ $form->render() }}
    </div>
@endsection