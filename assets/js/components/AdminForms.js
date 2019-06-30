import datetimepicker from 'tempusdominus-bootstrap-4';

const AdminForms = (() => {

	let options = {
		datetime: $('input.js-datetimepicker')
	};

	function init()
	{
		if(options.datetime.length){
			initDatetimePickers();
		}
	}

	function initDatetimePickers()
	{
		$.each(options.datetime, function(i, item){
			$(item).parent().datetimepicker({
				format: $(item).parent().data('format'),
				allowInputToggle: true,
                sideBySide: true
			});
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
		showErrors: showErrors
	};

})();

export default AdminForms;