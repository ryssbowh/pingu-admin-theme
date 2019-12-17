import datetimepicker from 'tempusdominus-bootstrap-4';
import * as h from 'PinguHelpers';
import Admin from './Admin';
import Modal from './AdminModal';
import Forms from 'pingu-forms';

const AdminForms = (() => {

	let options = {
		datetime: $('input.js-datetimepicker'),
		ajaxFormsClass: 'js-ajax-form',
        forms: $('form')
	};

	function init()
	{
		h.log('[Admin Theme] Forms initialized');
        if(options.forms.length){
            $.each(options.forms, function(i, form){
                initForm($(form));
            });
        }
	}

	function getMethod(form)
	{
		return form.attr('method').toLowerCase();
	}

    function initForm(form)
    {
        Forms.initForm(form);
        initDatetimePickers(form);
        initHideCardinality(form);
        initSelects(form);
        if (form.hasClass(options.ajaxFormsClass)) {
            initAjaxForm(form);
        }

    }

	function initAjaxForm(form)
	{
		form.on('submit', function(e){
			e.preventDefault();
			if(form.hasClass('disabled')){ return; }
			let data = form.serializeObject();
			submitAjaxForm(form, data);
		});
	}

    function submitAjaxForm(form, data)
    {
        data._theme = 'admin';
        let url = Admin.ajaxUrl(form.attr('action'));
        Admin.showSpinner();
        let promise;
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
        .always(function(){
            Admin.hideSpinner();
        })
        .fail(function(data){
            if(typeof data.responseJSON.errors === 'object'){
                highlightInvalidFields(form, Object.keys(data.responseJSON.errors));
            }
            form.trigger('form.failure', data);
        });
    }

    function initSelects(element)
    {
        element.find('select').chosen();
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

    function initHideCardinality(form)
    {
        if (form.hasClass('form-create-bundle-field')) {
            let cardinality = form.find('.field-wrapper-cardinality');
            form.find('select[name=_cardinality_select]').change(function(){
                if ($(this).val() == -1) {
                    cardinality.find('input').val(-1);
                    cardinality.addClass('d-none');
                }
                else{
                    cardinality.find('input').val(1);
                    cardinality.removeClass('d-none');
                }
            });
        }
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
		initForm: initForm,
		highlightInvalidFields: highlightInvalidFields,
        submitAjaxForm: submitAjaxForm
	};

})();

export default AdminForms;