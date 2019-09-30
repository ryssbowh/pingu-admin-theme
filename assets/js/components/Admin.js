import Modal from './AdminModal';
import * as h from 'PinguHelpers';

const Admin = (() => {

	let options = {
		jsgrid: $('.jsgrid-table'),
		menu: $('.navbar-main'),
		globalSpinner: $('#js-global-spinner')
	};

	let errors = {
		code404 : "Route not found",
		code405 : "Method not allowed",
		code403 : "Not authorized, are you logged in ?",
		code401 : "Not authorized, are you logged in ?",
		code419 : "This page has expired, Please refresh the page",
		code422 : "Validation failed",
	};

	function init()
	{
		startShowingAjaxErrors();
		/**
		 * Shows all jsgrid errors in a modal
		 */
		if(options.jsgrid.length){
			options.jsgrid.off('jsgrid-error');
			options.jsgrid.on('jsgrid-error', function(e, action, data){
				Modal.showAjaxError(data);
			});
		}

		bindConfirmLinks($('body'));
		bindAjaxLinks($('body'));
		bindViewMoreLinks($('body'));

		resizeMenu();
		$(window).resize(function(){
			resizeMenu();
		});
	}

	function showSpinner()
	{
		options.globalSpinner.show();
	}

	function hideSpinner()
	{
		options.globalSpinner.hide();
	}

	function bindAjaxLinks(element)
	{
		let ajaxLinks = element.find('.js-ajax-link');
		if(ajaxLinks.length){
			initAjaxLinks(ajaxLinks);
		}
		let ajaxFormLinks = element.find('.js-ajax-link-form');
		if(ajaxFormLinks.length){
			initAjaxFormLinks(ajaxFormLinks);
		}
		let ajaxConfirmAjaxLinks = element.find('.js-ajax-confirm-link');
		if(ajaxConfirmAjaxLinks.length){
			initAjaxConfirmLinks(ajaxConfirmAjaxLinks);
		}
	}

	function bindConfirmLinks(element)
	{
		let confirmLinks = element.find('.js-confirm-link');
		if(confirmLinks.length){
			initConfirmLinks(confirmLinks);
		}
	}

	function bindViewMoreLinks(element)
	{
		let viewMoreLinks = element.find('.js-view-more');
		if(viewMoreLinks.length){
			initViewMore(viewMoreLinks);
		}
	}

	function getErrorMessageFromResponse(data)
	{
		let message = data.responseJSON.message;
		if(!message){
			if('code'+data.status in errors){
				message = errors['code'+data.status];
			}
		}
		return message;
	}

	function buildErrorsFromResponse(data)
	{
		let ul = $('<ul class="list-group">');
		$.each(data.responseJSON.errors, function(key, messages){
			$.each(messages, function(i, message){
				ul.append($('<li class="list-group-item">'+message+'</li>'));
			});
		});
		return ul;
	}

	function startShowingAjaxErrors()
	{
		$('body').on('ajax.failure', function(e, data){
			Modal.showError(getErrorMessageFromResponse(data));
		});
	}

	function stopShowingAjaxErrors()
	{
		$('body').off('ajax.failure');
	}

	function resizeMenu()
	{
		options.menu.height($(window).height() - $('.phpdebugbar').outerHeight());
	}

	function ajaxUrl(url)
	{
		let adminPrefix = '/' + h.config('core.adminPrefix') + '/';
		let ajaxPrefix = '/' + h.config('core.ajaxPrefix') + '/';
		let siteUrl = h.config('app.url');
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

	function performAjaxLink(link, callbackSuccess, callbackFailure)
	{
		let url = ajaxUrl(link.attr('href'));
		let data = {_theme: 'admin'};
		let method = 'get';
		if(link.data('ajaxmethod')){
			data._method = link.data('ajaxmethod');
			method = 'post';
		}
		showSpinner();
		h.ajax(url, data, method).done(function(data){
			link.trigger('ajax.success', data);
			if(callbackSuccess){
				callbackSuccess(data);
			}
		}).fail(function(data){
			link.trigger('ajax.failure', data);
			if(callbackFailure){
				callbackFailure(data);
			}
		}).always(function(){
			hideSpinner();
		});
	}

	function performConfirm(link, confirmCallback)
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

	function initViewMore(links)
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

	function initAjaxLinks(links)
	{
		links.click(function(e){
			e.preventDefault();
			if($(this).hasClass('disabled')){ return;}
			performAjaxLink($(this));
		});
	}

	function initConfirmLinks(links)
	{
		links.click(function(e){
			e.preventDefault();
			if($(this).hasClass('disabled')){ return;}
			let link = $(this);
			let modal = performConfirm(link, function(){
				link.trigger('confirmed');
			});
		});
	}

	function initAjaxConfirmLinks(links)
	{
		initConfirmLinks(links);
		links.on('confirmed', function(e){
			performAjaxLink($(this));
		});
	}

	function initAjaxFormLinks(links)
	{
		links.click(function(e){
			e.preventDefault();
			if($(this).hasClass('disabled')){ return;}
			let link = $(this);
			performAjaxLink(link, function(data){
				let modal = Modal.createForm(data.form);
				link.trigger('form.loaded', modal);
				modal.on('form.success', function(e, data){
					link.trigger('form.success', data);
				});
				modal.on('form.failure', function(e, data){
					link.trigger('form.failure', data);
				});
			});
		});
	}

	return {
		init: init,
		ajaxUrl: ajaxUrl,
		startShowingAjaxErrors: startShowingAjaxErrors,
		stopShowingAjaxErrors: stopShowingAjaxErrors,
		buildErrorsFromResponse: buildErrorsFromResponse,
		getErrorMessageFromResponse: getErrorMessageFromResponse,
		bindAjaxLinks: bindAjaxLinks,
		bindViewMoreLinks: bindViewMoreLinks,
		bindConfirmLinks: bindConfirmLinks,
		showSpinner: showSpinner,
		hideSpinner: hideSpinner
	};

})();

export default Admin;