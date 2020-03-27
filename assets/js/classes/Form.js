class Form {

	constructor(element)
	{
        this.element = element;
        if (element.hasClass('js-ajax-form')) {
            this.initAjaxForm();
        }
	}

	getMethod()
	{
        if (this.element.children('input[name=_method]').first().length) {
            return this.element.children('input[name=_method]').val().toLowerCase();
        }
		return this.element.attr('method').toLowerCase();
	}

    getAction()
    {
        return this.element.attr('action').toLowerCase();
    }

	initAjaxForm ()
	{
        let _this = this;
		this.element.on('submit', function(e){
			e.preventDefault();
			if(_this.element.find('input[type=submit]').hasClass('disabled')){ return; }
            let data = _this.element.serializeArray();
			_this.submitAjax(data);
		});
	}

    submitAjax(data)
    {
        if (!data) {
            data = this.element.serializeArray();
        }
        let _this = this;
        let url = AdminTheme.ajaxUrl(this.getAction());
        AdminTheme.showSpinner();
        let method = this.getMethod();
        let promise = Helpers[method](url, data);
        promise.done(function(data){
            _this.element.trigger('form.success', data);
            if(_this.element.hasClass('js-show-message') && data.message){
                Modal.showSuccess(data.message);
            }
        }).always(function(){
            AdminTheme.hideSpinner();
        }).fail(function(data){
            if(typeof data.responseJSON.errors === 'object'){
                _this.highlightInvalidFields(_this.element, Object.keys(data.responseJSON.errors));
            }
            _this.element.trigger('form.failure', data);
        });
    }

	highlightInvalidFields(element, fields)
	{
		fields.forEach(function(item){
			element.find('[name='+item+']').addClass('is-invalid');
		});
	}

	showErrors(errors)
    {
		let messages = $('<ul>');
		let messageDiv;
        let _this = this;
		Object.keys(errors).forEach(key => {
			let value = errors[key];
			let input;
			if (input = _this.element.find('[name='+key+']')) {
				input.addClass('is-invalid');
				messages.append($('<li>'+value+'</li>'));
			}
		});
		if (messageDiv = _this.element.find('.errors')) {
			messageDiv.append(messages);
			messageDiv.removeClass('d-none');
		}
	}

};

export default Form;