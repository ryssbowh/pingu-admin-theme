import "nestedSortable";
import * as h from 'PinguHelpers';
import Admin from './Admin';
import Modal from './AdminModal';

const AdminContentTypes = (() => {

	let opt = {
		addPage: $('.addPage.add-content-type'),
		list: $('.list-content-type-field ul'),
		delete: $('.list-content-type-field .delete'),
		save: $('.list-content-type-field .save'),
		edit: $('.list-content-type-field .edit'),
		addForm:$('.list-content-type-field .form-add-content-type-field')
	};

	function init(){
		h.log('[Admin Theme] Content types initialized');
		if(opt.list.length){
			makeSortable();
		}
		if(opt.save.length){
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
				opt.save.removeClass('disabled');
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
		opt.save.on('ajax.success', function(){
			location.reload();
		});
	};

	return {
		init:init
	};

})();

export default AdminContentTypes;