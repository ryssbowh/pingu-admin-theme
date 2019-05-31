import Menu from 'pingu-menu';
import Forms from 'pingu-forms';
import dashify from 'dashify';
import Admin from './Admin';
import * as h from 'pingu-helpers';
import "nestedSortable";

const AdminMenu = (() => {

	let opt = {
		addPage: $('.addPage.add-menu'),
		menuId: $('.edit-menu-items').data('menu'),
		editMenuTree: $('.edit-menu-items .menu-tree'),
		menuItemsList: $('.edit-menu-items > .menu-tree > ul'),
		menuItems: $('.edit-menu-items .menu-item'),
		addMenuItem: $('.edit-menu-items .js-add'),
		editMenuItem: $('.edit-menu-items .js-edit'),
		deleteMenuItem: $('.edit-menu-items .js-delete'),
		itemSkeleton: $('.edit-menu-items .menu-item.skeleton'),
		saveItems: $('.edit-menu-items .js-save')
	};

	function init()
	{ 
		console.log('Menu initialized');
		if(opt.addPage.length){
			populateMachineName();
		}
		if(opt.editMenuTree.length){
			makeSortable();
		}
		if(opt.editMenuItem.length){
		 	bindEdit(opt.menuItems);
		}
		if(opt.deleteMenuItem.length){
			bindDelete(opt.menuItems);
		}
		if(opt.addMenuItem.length){
			addItem();
		}
		if(opt.saveItems.length){
			saveItems();
		}
	};

	function makeSortable()
	{
		opt.editMenuTree.children('ul').nestedSortable({
			handle:'.header',
			items:'li',
			listType:'ul',
			change: function(e){
				opt.saveItems.removeClass('disabled');
			}
		});
	}

	function populateMachineName()
	{
		opt.addPage.find('input[name=name]').blur(function(e){
			opt.addPage.find('input[name=machineName]').val(dashify($(this).val()));
		});
	};

	function bindEdit(items)
	{
		items.find('.js-edit').click(function(e){
			e.preventDefault();
			let item = $(this).closest('.menu-item');
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
		opt.addMenuItem.click(function(e){
			e.preventDefault();
			h.get($(this).attr('href'),{_theme:'admin'}).done(function(data){
				let modal = Admin.createFormModal(data.form);
				modal.on('form.success', function(e, data){
					let item = cloneSkeleton(data.model);
					opt.menuItemsList.append(item);
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
			let item = $(this).closest('.menu-item');
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
			let data = buildSaveData(opt.menuItemsList.children('li'), null);
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

export default AdminMenu;