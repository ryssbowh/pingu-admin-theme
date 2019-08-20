@extends('layouts.card')

@section('title')
{{ $title }}
@endsection

@section('content')
    <div class="add-content addPage">
      {{ $form->render() }}
    </div>
@endsection