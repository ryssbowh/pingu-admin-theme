@extends('layouts.card')

@section('title')
{{ $title }}
@endsection

@section('content')
    <div class="edit-content editPage">
      {{ $form->render() }}
    </div>
@endsection