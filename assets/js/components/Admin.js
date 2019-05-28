import * as h from 'pingu-helpers'; 
import Forms from 'pingu-forms';
import Jsgrid from 'pingu-jsgrid';

const Admin = (() => {

	let options = {
		jsgrid: $('.jsgrid-table'),
	};

	function init()
	{
		if(options.jsgrid.length){
			options.jsgrid.off('jsgrid-error');
			options.jsgrid.on('jsgrid-error', function(e, action, data){
				if(data.responseJSON.errors){
					showFormErrorsInModal(data.responseJSON.errors);
				}
				else{
					showErrorModal(data.responseJSON.message);
				}
			});
		}	
	}

	function createModal(html, options)
	{
		let modalId = html.prop('id');
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

	function createStaticModal(html, options = {})
	{
		options.backdrop = 'static';
		return createModal(html, options);
	};

	function createFormModal(html, options = {}, showErrors = true)
	{
		options.backdrop = 'static';
		let modal = createModal($(html), options);
		modal.off('form.success');
		let form = modal.find('form');
		if(!form){
			h.logError('Can\'t find a form for this modal');
			return;
		}
		form.find('input[name=_token]').remove();
		modal.on('shown.bs.modal', function(e){
			form.submit(function(e){
				e.preventDefault();
				let url = form.attr('action');
				let method = Forms.getMethod(form);
				h[method](url, form.serializeArray())
					.fail(function(data){
						if(showErrors){
							if(data.status == 422){
								showFormErrorsInModal(data.responseJSON.errors);
							}
							else{
								showModalError(data.responseJSON.message);
							}
						}
						modal.trigger('form.failed', data);
					})
					.done(function(data){
						modal.modal('hide');
						modal.trigger('form.success', data);
					});
			});
		});
		return modal;
	};

	function showModal(message, title)
	{
		let modal = $('#globalModal').css('z-index',1052);
		modal.find('.modal-body').html(message);
		modal.find('.modal-title').html(title);
		modal.modal({backdrop:'static'});
		return modal;
	}

	function showSuccessModal(message, title = 'Success')
	{
		return showModal(message, title);
	}

	function showErrorModal(message, title = 'Error')
	{
		return showModal(message, title);
	}

	function showFormErrorsInModal(errors, title = 'Errors were encountered')
	{
		let modal = $('#globalModal').css('z-index',1052);
		let ul = $('<ul class="list-group">');
		$.each(errors, function(key,messages){
			$.each(messages, function(i,message){
				ul.append($('<li class="list-group-item">'+message+'</li>'));
			});
		});
		return showModal(ul, title);
	}

	return {
		init: init,
		createModal: createModal,
		createStaticModal: createStaticModal,
		showFormErrorsInModal: showFormErrorsInModal,
		createFormModal: createFormModal,
		showModal: showModal,
		showSuccessModal: showSuccessModal,
		showErrorModal: showErrorModal
	};

})();

export default Admin;