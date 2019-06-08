@extends('layouts.app')

@section('title')
Confirm you want to delete {{ $content->content_type->name }} '{{ $content->title}}'
@endsection

@section('content')
    <div class="delete-content">
      {{ $form->render() }}
    </div>
@endsection