const Forms = (() => {

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
		showErrors: showErrors
	};

})();

export default Forms;