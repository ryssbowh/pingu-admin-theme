<div class="modal fade" tabindex="-1" role="dialog" id="addBlockModal">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        	{{ $form->renderStart() }}
            <div class="modal-header">
                <h5 class="modal-title">{{ $form->getOption('title') }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="errors alert alert-danger d-none"></div>
            	{{ $form->renderLayout() }}
            </div>
            <div class="modal-footer">
                {{ $form->renderSubmit() }}
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            {{ $form->renderEnd() }}
        </div>
    </div>
</div>