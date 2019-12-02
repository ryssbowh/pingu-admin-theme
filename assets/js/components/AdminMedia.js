import Forms from './AdminForms';
import Admin from './Admin';
import Modal from './AdminModal';
import * as h from 'PinguHelpers';
import "nestedSortable";

const AdminMedia = (() => {

	let options = {
		createTransformerForm: $('.form-media-transformer-create'),
		deleteTransformerLinks: $('.image-transformations a.deleteLink'),
		editTransformerLinks: $('.image-transformations a.editLink'),
		list: $('.transformations-list'),
		saveForm: $('.image-transformations form'),
		styleAddLink: $('.add-image-style-link')
	};

	function init(){
		h.log('[Admin Theme] Media initialized');
		if(options.createTransformerForm.length){
			initAddTransformerForm();
			initTransformerDelete();
			initTransformerEdit();
			makeSortable();
			initSaveForm();
			initAddStyleLink();
		}
	};

	function initAddStyleLink()
	{
		options.styleAddLink.on('form.success', function(){
			location.reload();
		});
	}

	function initSaveForm()
	{
		options.saveForm.on('form.success', function(){
			$(this).find('input[type=submit]').addClass('disabled');
		});
	}

	function makeSortable()
	{
		options.list.nestedSortable({ 
			handle:'.handle',
			items:'li',
			listType:'ul',
			relocate: function(e){
				rebuildWeights();
				options.saveForm.find('input[type=submit]').removeClass('disabled');
			}
		});
	}

	function rebuildWeights()
	{
		let weight = 0;
		$.each(options.list.find('li'), function(i, item){
			$(item).find('input').val(weight);
			weight++;
		});
	}

	function initAddTransformerForm()
	{
		options.createTransformerForm.on('form.success', function(e, data){
			if(data.form){
				let modal = Modal.createForm(data.form);
				modal.on('form.success', function(e, data){
					location.reload();
				});
			}
			else{
				location.reload();
			}
		});
	}

	function initTransformerDelete()
	{
		options.deleteTransformerLinks.on('ajax.success', function(e, data){
			$(this).closest('li').remove();
		});
	}

	function initTransformerEdit()
	{
		options.editTransformerLinks.on('ajax.success', function(e, data){
			let modal = Modal.createForm(data.form);
			modal.on('form.success', function(e, data){
				location.reload();
			});
		});
	}


	return {
		init:init
	};

})();

export default AdminMedia;