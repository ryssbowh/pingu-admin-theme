import Forms from 'pingu-forms';
import Admin from './Admin';
import * as h from 'PinguHelpers';
import "nestedSortable";

const AdminTaxonomy = (() => {

	let opt = {
		editTree: $('.edit-taxonomy-items .taxonomy-tree'),
		itemsList: $('.edit-taxonomy-items > .taxonomy-tree > ul'),
		items: $('.edit-taxonomy-items .taxonomy-item'),
		addItem: $('.edit-taxonomy-items .js-add'),
		editItem: $('.edit-taxonomy-items .js-edit'),
		deleteItem: $('.edit-taxonomy-items .js-delete'),
		itemSkeleton: $('.edit-taxonomy-items .taxonomy-item.skeleton'),
		saveItems: $('.edit-taxonomy-items .js-save')
	};

	function init()
	{ 
		h.log('Taxonomy initialized');
		if(opt.editTree.length){
			makeSortable();
		}
		if(opt.editItem.length){
		 	bindEdit(opt.items);
		}
		if(opt.deleteItem.length){
			bindDelete(opt.items);
		}
		if(opt.addItem.length){
			addItem();
		}
		if(opt.saveItems.length){
			saveItems();
		}
	};

	function makeSortable()
	{
		opt.editTree.children('ul').nestedSortable({
			handle:'.header',
			items:'li',
			listType:'ul',
			change: function(e){
				opt.saveItems.removeClass('disabled');
			}
		});
	}

	function bindEdit(items)
	{
		items.find('.js-edit').click(function(e){
			e.preventDefault();
			let item = $(this).closest('.taxonomy-item');
			h.get($(this).attr('href'), {_theme:'admin'}).done(function(data){
				let modal = Admin.createFormModal(data.form);
				modal.on('form.success', function(e, data){
					item.children('.header').children('.name').html(data.model.name);
					makeActive(item, data.model.active);
				});
			});
		});
	};

	function addItem()
	{
		opt.addItem.click(function(e){
			e.preventDefault();
			h.get($(this).attr('href'),{_theme:'admin'}).done(function(data){
				let modal = Admin.createFormModal(data.form);
				modal.on('form.success', function(e, data){
					let item = cloneSkeleton(data.model);
					opt.itemsList.append(item);
					makeSortable();
					bindEdit(item);
					bindDelete(item);
				});
			});
			
		});
	};

	function makeActive(item, active=true)
	{
		if(active){
			item.removeClass('inactive');
		}
		else{
			item.addClass('inactive');
		}
	}

	function cloneSkeleton(data)
	{
		let item = opt.itemSkeleton.clone();
		item.find('.name').html(data.name);
		item.data('item', data.id);
		item.removeClass('d-none');
		item.find('.js-edit').attr('href', h.replaceUriSlugs(item.find('.js-edit').attr('href'), [data.id]));
		item.find('.js-delete').attr('href', h.replaceUriSlugs(item.find('.js-delete').attr('href'), [data.id]));
		makeActive(item, data.active);
		return item;
	}

	function bindDelete(items){
		items.find('.js-delete').click(function(e){
			e.preventDefault();
			let item = $(this).closest('.taxonomy-item');
			h._delete($(this).attr('href')).done(function(data){
				if(item.children('ul').length){
					item.children('ul').appendTo(item.parent());
					opt.saveItems.removeClass('disabled');
				}
				item.remove();
			});
		});
	};

	function saveItems(){
		opt.saveItems.click(function(e){
			e.preventDefault();
			let data = buildSaveData(opt.itemsList.children('li'), null);
			h.patch($(this).attr('href'), {models: data}).done(function(data){
				opt.saveItems.addClass('disabled');
				Admin.showSuccessModal(data.message);
			});
		});
	}

	function buildSaveData(items, parent){
		let out = [];
		$.each(items, function(i, item){
			let newItem = {
				id:$(item).data('item'),
				parent: parent,
				weight: i
			};
			if($(item).children('ul').length){
				newItem.children = buildSaveData($(item).children('ul').children('li'), $(item).data('item'));
			}
			out.push(newItem);
		});
		return out;
	}

	return {
		init: init
	};

})();

export default AdminTaxonomy;