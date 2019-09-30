import "nestedSortable";
import * as h from 'PinguHelpers';
import Admin from './Admin';
import Modal from './AdminModal';

const AdminBundleFields = (() => {

	let opt = {
		list: $('.list-entity-fields ul'),
		delete: $('.list-entity-fields .delete'),
		form: $('.list-entity-fields > form'),
		edit: $('.list-entity-fields .edit'),
		addForm:$('.list-entity-fields .form-add-entity-field')
	};

	function init(){
		h.log('[Admin Theme] Content types initialized');
		if(opt.list.length){
			makeSortable();
		}
		if(opt.form.length){
			bindSave();
		}
		if(opt.edit.length){
			bindEdit();
		}
		if(opt.delete.length){
			bindDelete();
		}
		if(opt.addForm.length){
			bindAddForm();
		}
	};

	function makeSortable()
	{
		opt.list.nestedSortable({
			handle:'.header',
			items:'li',
			listType:'ul',
			stop: function(e){
				rebuildWeights();
				opt.form.find('input[type=submit]').removeClass('disabled');
			}
		});
	}

	function rebuildWeights()
	{
		let weight = 0;
		$.each(opt.list.find('li'), function(i, item){
			$(item).find('input[type=hidden]').val(weight);
			weight++;
		});
	}

	function bindEdit()
	{
		opt.edit.on('form.success', function(){
			location.reload();
		});
	}

	function bindAddForm()
	{
		opt.addForm.on('form.success', function(e, data){
			let modal = Modal.createForm(data.form);
			let form = modal.find('form');
			form.on('form.success', function(){
				location.reload();
			});
		});
	}

	function bindDelete()
	{
		opt.delete.on('ajax.success',function(){
			$(this).closest('.list-group-item').remove();
		});
	}

	function bindSave()
	{
		opt.form.on('form.success', function(){
			opt.form.find('input[type=submit]').addClass('disabled');
		});
	};

	return {
		init:init
	};

})();

export default AdminBundleFields;