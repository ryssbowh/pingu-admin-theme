class AdminTheme {

	options = {
		jsgrid: $('.jsgrid-table'),
		menu: $('.navbar-main'),
		globalSpinner: $('#js-global-spinner')
	};

	errors = {
		code404 : "Route not found",
		code405 : "Method not allowed",
		code403 : "Not authorized, are you logged in ?",
		code401 : "Not authorized, are you logged in ?",
		code419 : "This page has expired, Please refresh the page",
		code422 : "Validation failed",
	};

	constructor()
	{ 
		this.startShowingAjaxErrors();
		/**
		 * Shows all jsgrid errors in a modal
		 */
		if(this.options.jsgrid.length){
			this.options.jsgrid.off('jsgrid-error');
			this.options.jsgrid.on('jsgrid-error', function(e, action, data){
				Modal.showAjaxError(data);
			});
		}

        this.bindAjaxCalls();
		this.bindConfirmLinks($('body'));
		this.bindAjaxLinks($('body'));
		this.bindViewMoreLinks($('body'));
	}

    bindAjaxCalls ()
    {
        $('body').on('ajax.sending', function(e, data){
            data._theme = 'admin';
        });
    }

	showSpinner()
	{
		this.options.globalSpinner.show();
	}

	hideSpinner()
	{
		this.options.globalSpinner.hide();
	}

	bindAjaxLinks(element)
	{
		let ajaxLinks = element.find('.js-ajax-link');
		if(ajaxLinks.length){
			this.initAjaxLinks(ajaxLinks);
		}
		let ajaxFormLinks = element.find('.js-ajax-link-form');
		if(ajaxFormLinks.length){
			this.initAjaxFormLinks(ajaxFormLinks);
		}
		let ajaxConfirmAjaxLinks = element.find('.js-ajax-confirm-link');
		if(ajaxConfirmAjaxLinks.length){
			this.initAjaxConfirmLinks(ajaxConfirmAjaxLinks);
		}
	}

	bindConfirmLinks(element)
	{
		let confirmLinks = element.find('.js-confirm-link');
		if(confirmLinks.length){
			this.initConfirmLinks(confirmLinks);
		}
	}

	bindViewMoreLinks(element)
	{
		let viewMoreLinks = element.find('.js-view-more');
		if(viewMoreLinks.length){
			this.initViewMore(viewMoreLinks);
		}
	}

    getErrorTitleFromResponse(data)
    {
        if (data.status == 422) {
            return data.responseJSON.message;
        }
        return 'Error';
    }

	getErrorMessageFromResponse(data)
	{
		let message = data.responseJSON.message;
        if (data.status == 422) {
            return this.buildErrorsFromResponse(data);
        }
		if(!message){
			if('code'+data.status in errors){
				message = errors['code'+data.status];
			}
		}
        return message;
	}

	buildErrorsFromResponse(data)
	{
		let ul = $('<ul class="list-group">');
		$.each(data.responseJSON.errors, function(key, messages){
			$.each(messages, function(i, message){
				ul.append($('<li class="list-group-item">'+message+'</li>'));
			});
		});
		return ul;
	}

	startShowingAjaxErrors()
	{
        let _this = this;
		$('body').on('ajax.failure', function(e, data){
			Modal.showError(_this.getErrorMessageFromResponse(data), _this.getErrorTitleFromResponse(data));
		});
	}

	stopShowingAjaxErrors()
	{
		$('body').off('ajax.failure');
	}

	resizeMenu()
	{
		this.options.menu.height($(window).height() - $('.phpdebugbar').outerHeight());
	}

	ajaxUrl(url)
	{
		let adminPrefix = '/' + Config.get('core.adminPrefix');
		let ajaxPrefix = '/' + Config.get('core.ajaxPrefix');
		let siteUrl = Config.get('app.url');
		if(url.startsWith(siteUrl)){
			url = url.substring(siteUrl.length);
		}
		else if(url.startsWith('http')){
			return url;
		}
		url.trimLeft('/');
		if(url.startsWith(ajaxPrefix)){
			return url;
		}
		if(url.startsWith(adminPrefix)){
			url = url.substring(adminPrefix.length);
		}
		url = ajaxPrefix + url;
		return url;
	}

	performAjaxCall(link, data = {}, url = false)
	{
        if (!url) {
            url = this.ajaxUrl(link.attr('href'));
        }
        let _this = this;
		let method = 'get';
		if(link.data('ajaxmethod')){
			data._method = link.data('ajaxmethod');
			method = 'post';
		}
		this.showSpinner();
        link.trigger('form.sending', data);
		return Helpers.ajax(url, data, method).done(function(data){
			link.trigger('ajax.success', data);
		}).fail(function(data){
			link.trigger('ajax.failure', data);
		}).always(function(){
			_this.hideSpinner();
		});
	}

	performConfirm(link, confirmCallback)
	{
		let title = 'Please confirm';
		let message = '';
		if(link.data('confirmtitle')){
			title = link.data('confirmtitle');
		}
		if(link.data('confirmmessage')){
			message = link.data('confirmmessage');
		}
		return Modal.showConfirm(message, title, confirmCallback);
	}

	initViewMore(links)
	{
		links.click(function(e){
			e.preventDefault();
			let link = $(this);
			let target = $('#'+link.data('viewmore'));
			target.slideToggle(300, function(){
				let label = link.data('label');
				if(label){
					let oldlabel = link.html();
					link.html(label);
					link.data('label', oldlabel);
				}
			});
		});
	}

	initAjaxLinks(links)
	{
        let _this = this;
		links.click(function(e){
			e.preventDefault();
			if($(this).hasClass('disabled')){ return;}
			_this.performAjaxCall($(this));
		});
	}

	initConfirmLinks(links)
	{
        let _this = this;
		links.click(function(e){
			e.preventDefault();
			if($(this).hasClass('disabled')){ return;}
			let link = $(this);
			let modal = _this.performConfirm(link, function(){
				link.trigger('confirmed');
			});
		});
	}

	initAjaxConfirmLinks(links)
	{
		this.initConfirmLinks(links);
        let _this = this;
		links.on('confirmed', function(e){
			_this.performAjaxCall($(this));
		});
	}

	initAjaxFormLinks(links)
	{
        let _this = this;
		links.click(function(e){
			e.preventDefault();
			if($(this).hasClass('disabled')){ return;}
			let link = $(this);
			_this.performAjaxCall(link).done(function(data){
				if (data.html) {
                    _this.initModalForm(data.html, link);
                } else {
                    Helpers.logWarning("No form was sent by the server on a ajax form link, aborting");
                }
			});
		});
	}

    initModalForm(form, element)
    {
        let modal = Modal.createForm(form);
        element.trigger('form.loaded', modal);
        modal.on('form.success', function(e, data){
            element.trigger('form.success', data);
        });
        modal.on('form.failure', function(e, data){
            element.trigger('form.failure', data);
        });
    }
}

export default AdminTheme;