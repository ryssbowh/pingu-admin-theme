@extends('layouts.card')

@section('title')
<div class="title">
    <h1 class="float-left">Image Styles</h1>
    <a class="float-right add-image-style-link js-ajax-link-form" href="{{ $stylesClass::makeUri('create', [], adminPrefix()) }}">Add new</a>
</div>
@endsection

@section('content')
	<div class="container image-styles">
        <ul class="list-group w-100">
            @foreach($styles as $style)
                <li class="list-group-item">
                    <h3>{{ $style->name }} @if($style->description)({{ $style->description }})@endif</h3>
                    @can('edit images styles')
                        <a class="float-right ml-2" href="{{ $style::makeUri('edit', $style, adminPrefix()) }}">Edit</a>
                    @endcan
                    @if($style->deletable)
                        @can('delete images styles')
                        <a class="float-right" href="{{ $style::makeUri('delete', $style, adminPrefix()) }}">Delete</a>
                        @endcan
                    @endif
                    <?php $transformations = $style->getTransformations(); ?>
                    @if(!$transformations->isEmpty())
                        @foreach($transformations as $transformation)
                            <p class="mb-0">- {{ $transformation->getDescription() }}</p>
                        @endforeach
                    @endif
                </li>
            @endforeach
        </ul>
    </div>
@endsection