@extends('layouts.card')

@section('title')
Add a {{ $bundle->bundleFriendlyName() }}
@endsection

@section('content')
    <div class="add-entity addPage">
      {{ $form->render() }}
    </div>
@endsection