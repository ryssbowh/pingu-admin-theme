@extends('layouts.app')

@section('title')
Add a {{ $fieldType->name }} field to {{ $contentType->name }}
@endsection

@section('content')
    <div class="add-content-type-field">
      {{ $form->render() }}
    </div>
@endsection