{{ \FormFacade::open($attributes->all()) }}
<div class="modal-header">
    <h5 class="modal-title">{{ $form->option('title') ?? 'Create new' }}</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<div class="modal-body">
	<div class="fields">
        @if($form->hasGroups())
            @include('forms@groups')
        @else
            @foreach($form->getElements() as $element)
                {!! $element->render() !!}
            @endforeach
        @endif
    </div>
</div>
{{ \FormFacade::close() }}