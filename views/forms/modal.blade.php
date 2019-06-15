<div class="modal fade" tabindex="-1" role="dialog" id="modalForm-{{ $form->getName() }}">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        	{{ $form->renderStart() }}
            <div class="modal-header">
                <h5 class="modal-title">{{ $form->option('title') }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            	{{ $form->renderFields() }}
            </div>
            {{ $form->renderEnd() }}
        </div>
    </div>
</div>