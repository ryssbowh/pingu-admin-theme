import AdminForms from './AdminForms';
import Admin from './Admin';
import * as h from 'PinguHelpers';

const AdminModal = (() => {

	let options = {
		globalModal: $('#globalModal')
	};

	function init()
	{
		options.globalModal.css('z-index',1052);
	}

	function showAjaxError(data)
	{
		let message = '';
		let title = '';
		if(data.responseJSON.errors){
			title = 'Errors were encountered';
			message = Admin.buildErrorsFromResponse(data);
		}
		else{
			title = 'Server Error';
			message = Admin.getErrorMessageFromResponse(data);
		}
		show(message, title);
	}

	function create(html, options)
	{
		let modalId = html.attr('id');
		if(!modalId){
			h.logError('your root element must have an id to create a modal'); 
			return;
		}
		if($('#'+modalId).length){
			$('#'+modalId).remove();
		}
		$('body').append(html);
		let modal = $('#'+modalId);
		modal.modal(options);
		return modal;
	};

	function createForm(html, options = {}, showErrors = true)
	{
		options.backdrop = 'static';
		let modal = create($(html), options);
		let form = modal.find('form.js-ajax-form');
		if(!form.length){
			return modal;
		}
		AdminForms.initForm(form);
		if(showErrors){
			Admin.stopShowingAjaxErrors();
			modal.on('hidden.bs.modal', function(e){
				Admin.startShowingAjaxErrors();
			});
		}
		modal.on('shown.bs.modal', function(e){
			focusOnFirstInput(modal);
			form.on('form.failure', function(e, data){
				if(showErrors){
					showAjaxError(data);
				}
			});
			form.on('form.success', function(e, data){
				modal.modal('hide');
			});
		});
		return modal;
	};

	function focusOnFirstInput(modal)
	{
		let input = $(modal).find('input[type=text]:visible').first();
		input.focus();
	}

	function show(message, title, type = 'info')
	{
		let modal = options.globalModal;
		modal.find('.modal-body').html(message);
		modal.find('.modal-title').html(title);
		if(type == 'info'){
			modal.find('button.confirm').addClass('d-none');
		}
		else if(type == 'confirm'){
			modal.find('button.confirm').removeClass('d-none');
		}
		modal.modal({backdrop:'static'});
		return modal;
	}

	function showSuccess(message, title = 'Success')
	{
		return show(message, title);
	}

	function showError(message, title = 'Error')
	{
		return show(message, title);
	}

	function showConfirm(message, title = 'Please confirm', confirmCallback, cancelCallback)
	{
		let modal = show(message, title, 'confirm');
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

	return {
		init: init,
		showAjaxError: showAjaxError,
		create: create,
		createForm: createForm,
		show: show,
		showSuccess: showSuccess,
		showError: showError,
		showConfirm: showConfirm
	};

})();

export default AdminModal;