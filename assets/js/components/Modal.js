class Modal {

	constructor()
	{
        this.messageModal = $('#messageModal');
		this.messageModal.css('z-index',1052);
        this.modalSkeleton = $('#modalSkeleton');
        this.modalSkeleton.css('z-index', 1050);
	}

	showAjaxError(data)
	{
		let message = '';
		let title = '';
		if(data.responseJSON.errors){
			title = 'Errors were encountered';
			message = AdminTheme.buildErrorsFromResponse(data);
		}
		else{
			title = 'Server Error';
			message = AdminTheme.getErrorMessageFromResponse(data);
		}
		this.show(message, title);
	}

	create(html, identifier, options)
	{
        let modal = this.modalSkeleton.clone().attr('id', 'modal-'+identifier);
        modal.insertAfter(this.modalSkeleton);
        modal.find('.modal-content').html(html);
        ObjectMapping.bind(modal);
        modal.modal(options);
        modal.on('hidden.bs.modal', function(){
            $(this).remove();
        })
		return modal;
	};

	createForm(html, options = {}, showErrors = true)
	{
		options.backdrop = 'static';
		let modal = this.create(html, 'form', options);
		let form = modal.find('form.js-ajax-form');
        let _this = this;

		if(!form.length){
            Logger.logError("Can't instanciate a form from xhr response, form element is missing");
			return modal;
		}
		if(showErrors){
			AdminTheme.stopShowingAjaxErrors();
			modal.on('hidden.bs.modal', function(e){
				AdminTheme.startShowingAjaxErrors();
			});
		}
		modal.on('shown.bs.modal', function(e){
			_this.focusOnFirstInput(modal);
			form.on('form.failure', function(e, data){
				if(showErrors){
					_this.showAjaxError(data);
				}
			});
			form.on('form.success', function(e, data){
				modal.modal('hide');
			});
		});
		return modal;
	};

	focusOnFirstInput(modal)
	{
		let input = $(modal).find('input[type=text]:visible').first();
		input.focus();
	}

	show(message, title, showConfirm = false)
	{
		let modal = this.messageModal;
		modal.find('.modal-body').html(message);
		modal.find('.modal-title').html(title);
		if(showConfirm){
			modal.find('button.confirm').removeClass('d-none');
		} else {
			modal.find('button.confirm').addClass('d-none');
		}
		modal.modal({backdrop:'static'});
		return modal;
	}

	showSuccess(message, title = 'Success')
	{
		return this.show(message, title);
	}

	showError(message, title = 'Error')
	{
		return this.show(message, title);
	}

	showConfirm(message, title = 'Please confirm', confirmCallback, cancelCallback)
	{
		let modal = this.show(message, title, true);
		modal.find('button.confirm').off('click');
		modal.find('button.confirm').on('click', function(){
			modal.trigger('modal.confirmed');
			if(confirmCallback){
				confirmCallback();
			}
		});
		modal.find('button.cancel').off('click');
		modal.find('button.cancel').on('click', function(){
			modal.trigger('modal.cancelled');
			if(cancelCallback){
				cancelCallback();
			}
		});
		return modal;
	}

};

export default Modal;