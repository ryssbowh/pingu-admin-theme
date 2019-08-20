import datetimepicker from 'tempusdominus-bootstrap-4';
import * as h from 'PinguHelpers';
import Admin from './Admin';
import Modal from './AdminModal';

const AdminForms = (() => {

	let options = {
		datetime: $('input.js-datetimepicker'),
		ajaxForms: $('.js-ajax-form')
	};

	function init()
	{
		h.log('[Admin Theme] Forms initialized');
		if(options.datetime.length){
			initDatetimePickers($('body'));
		}
		if(options.ajaxForms.length){
			initAjaxForms(options.ajaxForms);
		}
	}

	function getMethod(form)
	{
		return form.attr('method').toLowerCase();
	}

	function initAjaxForms(forms)
	{
		let promise;
		forms.on('submit', function(e){
			e.preventDefault();
			let form = $(this);
			let data = form.serializeArray();
			data.push({name: '_theme', value: 'admin'});
			let url = Admin.ajaxUrl(form.attr('action'));
			if(getMethod(form) == 'get'){
				promise = h.get(url, data);
			}
			else{
				promise = h.post(url, data);
			}
			promise.done(function(data){
				form.trigger('form.success', data);
				if(form.hasClass('js-show-message') && data.message){
					Modal.showSuccess(data.message);
				}
			})
			.fail(function(data){
				if(typeof data.responseJSON.errors === 'object'){
					highlightInvalidFields(form, Object.keys(data.responseJSON.errors));
				}
				form.trigger('form.failure', data);
			});
		});
	}

	function initDatetimePickers(element)
	{
		$.each(element.find('input.js-datetimepicker'), function(i, item){
			$(item).parent().datetimepicker({
				format: $(item).parent().data('format'),
				allowInputToggle: true,
                sideBySide: true
			});
		});
	}

	function highlightInvalidFields(form, fields)
	{
		fields.forEach(function(item){
			form.find('[name='+item+']').addClass('is-invalid');
		});
	}

	function showErrors(form, errors){
		let messages = $('<ul>');
		let messageDiv;
		Object.keys(errors).forEach(key => {
			let value = errors[key];
			let input;
			if(input = form.find('[name='+key+']')){
				input.addClass('is-invalid');
				messages.append($('<li>'+value+'</li>'));
			}
		});
		if(messageDiv = form.find('.errors')){
			messageDiv.append(messages);
			messageDiv.removeClass('d-none');
		}
	}

	return {
		init: init,
		showErrors: showErrors,
		initAjaxForms: initAjaxForms,
		highlightInvalidFields: highlightInvalidFields
	};

})();

export default AdminForms;