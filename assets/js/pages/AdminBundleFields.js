import "nestedSortable";

const AdminBundleFields = (() => {

	let opt = {
		list: $('.list-entity-fields ul'),
		delete: $('.list-entity-fields .delete'),
		edit: $('.list-entity-fields .edit'),
		addFieldForm:$('.list-entity-fields .form-add-entity-field'),
        addGroupForm:$('.list-entity-fields .form-create-form-layout-group')
	};

	function init(){
		Logger.log('[Admin Theme] Bundle Fields initialized');
		if(opt.edit.length){
			bindEdit();
		}
		if(opt.delete.length){
			bindDelete();
		}
		if(opt.addFieldForm.length){
			bindAddFieldForm();
		}
	};

	function bindEdit()
	{
		opt.edit.on('form.success', function(){
			location.reload(); 
		});
	}

	function bindAddFieldForm()
	{
		opt.addFieldForm.on('form.success', function(e, data){
			let modal = Modal.createForm(data.html);
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

	return {
		init:init
	};

})();

export default AdminBundleFields;