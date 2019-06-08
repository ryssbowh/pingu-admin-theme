@extends('layouts.app')

@section('title')
{{ $title }}
@endsection

@section('content')
    <div class="edit-content">
      {{ $form->render() }}
      @can('delete content', $content)
      	<a href="{{ $deleteUri }}">Delete</a>
      @endcan
    </div>
@endsection