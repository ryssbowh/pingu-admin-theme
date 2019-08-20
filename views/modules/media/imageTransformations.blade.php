@extends('layouts.card')

@section('title')
<h1>{{ $style->name }}'s transformations</h1>
@endsection

@section('content')
	<div class="container image-transformations">
        {{ FormFacade::open(['url' => $patchUri, 'method' => 'patch', 'class' => 'form js-ajax-form js-show-message']) }}
        <ul class="list-group transformations-list">
            @if($transformations)
                @foreach($transformations as $index => $transformation)
                    <li class="list-group-item container">
                        {{ FormFacade::hidden('weights['.$transformation->getModel()->id.']', $transformation->getModel()->weight) }}
                        <div class="row">
                            <div class="handle col-1"><i class="fa fa-bars"></i></div>
                            <h3 class="col m-0">{{ $transformation->getDescription() }}</h3>
                            <div class="links col-2">
                                <a class="deleteLink js-ajax-confirm-link float-right" href="{{ $transformation->getModel()::makeUri('delete', $transformation->getModel(), adminPrefix()) }}" data-ajaxmethod="delete" data-confirmtitle='Delete {{ $transformation::getName() }} ?' data-confirmmessage='This action cannot be undone'>Delete</a>
                                @if($transformation::hasOptions())
                                    <a class="editLink js-ajax-link float-right mr-2" href="{{ $transformation->getModel()::makeUri('edit', $transformation->getModel(), adminPrefix()) }}">Edit</a>
                                @endif
                            </div>
                        </div>
                    </li>
                @endforeach
            @endif
        </ul>
        {{ FormFacade::submit('Save', ['class' => 'btn btn-primary float-right mt-3 disabled']) }}
        {{ FormFacade::close() }}
        <div class="addForm mt-3 float-left">
            <p>Add a transformation</p>
            <?php $addForm->isAjax() ?>
            {!! $addForm->render() !!}
        </div>
    </div>
@endsection