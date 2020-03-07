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
            let data = _this.element.serializeObject();
			_this.submitAjax(data);
		});
	}

    submitAjax(data)
    {
        let _this = this;
        let url = AdminTheme.ajaxUrl(this.getAction());
        AdminTheme.showSpinner();
        let promise;
        if(this.getMethod() == 'get'){
            promise = Helpers.get(url, data);
        }
        else{
            promise = Helpers.post(url, data);
        }
        promise.done(function(data){
            _this.element.trigger('form.success', data);
            if(_this.element.hasClass('js-show-message') && data.message){
                Modal.showSuccess(data.message);
            }
        })
        .always(function(){
            AdminTheme.hideSpinner();
        })
        .fail(function(data){
            if(typeof data.responseJSON.errors === 'object'){
                _this.highlightInvalidFields(_this.element, Object.keys(data.responseJSON.errors));
            }
            _this.element.trigger('form.failure', data);
        });
    }

	highlightInvalidFields(fields)
	{
        let _this = this;
		fields.forEach(function(item){
			_this.element.find('[name='+item+']').addClass('is-invalid');
		});
	}

	showErrors(errors){
		let messages = $('<ul>');
		let messageDiv;
        let _this = this;
		Object.keys(errors).forEach(key => {
			let value = errors[key];
			let input;
			if(input = _this.element.find('[name='+key+']')){
				input.addClass('is-invalid');
				messages.append($('<li>'+value+'</li>'));
			}
		});
		if(messageDiv = _this.element.find('.errors')){
			messageDiv.append(messages);
			messageDiv.removeClass('d-none');
		}
	}

};

export default Form;