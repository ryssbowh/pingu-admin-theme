import "nestedSortable";
import * as h from 'PinguHelpers';
import Admin from './Admin';

const AdminContentTypes = (() => {

	let opt = {
		addPage: $('.addPage.add-content-type'),
		listPage: $('.list-content-type-field'),
		delete: $('.list-content-type-field .js-delete'),
		save: $('.list-content-type-field .js-save'),
	};

	function init(){
		h.log('Content types initialized');
		if(opt.listPage.length){
			makeSortable();
		}
		if(opt.save.length){
			bindSave();
		}
		if(opt.delete.length){
			bindDelete();
		}
	};

	function makeSortable()
	{
		opt.listPage.children('ul').nestedSortable({
			handle:'.header',
			items:'li',
			listType:'ul',
			change: function(e){
				opt.save.removeClass('disabled');
			}
		});
	}

	function bindDelete()
	{
		opt.delete.click(function(e){
			e.preventDefault();
			let elem = $(this).closest('.list-group-item');
			let url = $(this).attr('href');
			let modal = Admin.showConfirmModal('Are you sure you want to delete this field ?');
			modal.find('button.confirm').off('click');
			modal.find('button.confirm').on('click', function(){
				h._delete(url).done(function(data){
					elem.remove();
				});
			});
		});
	}

	function bindSave()
	{
		opt.save.click(function(e){
			e.preventDefault();
			let data = {models:[]};
			$.each(opt.listPage.find('.list-group-item'), function(weight, item){
				data.models.push({id:$(item).data('id'), weight: weight});
			});
			h.patch($(this).attr('href'), data).done(function(data){
				opt.save.addClass('disabled');
				Admin.showSuccessModal(data.message);
			});
		});
	};

	return {
		init:init
	};

})();

export default AdminContentTypes;