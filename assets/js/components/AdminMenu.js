import Menu from 'pingu-menu';
import Forms from 'pingu-forms';
import Admin from './Admin';
import * as h from 'PinguHelpers';
import "nestedSortable";

const AdminMenu = (() => {

	let opt = {
		editMenuTree: $('.edit-menu-items .menu-tree'),
		menuItemsList: $('.edit-menu-items .menu-tree > ul'),
		menuItems: $('.edit-menu-items .menu-item'),
		addMenuItem: $('.edit-menu-items .add'),
		editMenuItem: $('.edit-menu-items .edit'),
		deleteMenuItem: $('.edit-menu-items .delete'),
		itemSkeleton: $('.edit-menu-items .menu-item.skeleton'),
		saveItems: $('.edit-menu-items .save')
	};

	function init()
	{ 
		h.log('[Admin Theme] Menu initialized');
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
			bindAdd();
		}
		if(opt.saveItems.length){
			opt.saveItems.addClass('disabled');
			saveItems();
		}
	};

	function makeSortable()
	{
		opt.editMenuTree.children('ul').nestedSortable({
			handle:'.header',
			items:'li',
			listType:'ul',
			relocate: function(){
				rebuildForm(opt.menuItemsList);
				opt.saveItems.removeClass('disabled');
			}
		});
	}

	function bindEdit(items)
	{
		items.find('.edit').on('form.loaded', function(e, modal){
			$(modal).find('.wrapper-field-menu').addClass('d-none');
			$(modal).find('.wrapper-field-weight').addClass('d-none');
		});
		items.find('.edit').on('form.success', function(e, data){
			let item = $(this).closest('.menu-item');
			item.children('.header').children('.name').html(data.model.name);
			makeActive(item, data.model.active);
		});
	};

	function bindAdd()
	{
		opt.addMenuItem.on('form.loaded', function(e, modal){
			$(modal).find('.wrapper-field-menu').addClass('d-none');
			$(modal).find('.wrapper-field-weight').addClass('d-none');
		});
		opt.addMenuItem.on('form.success', function(e, data){
			let item = cloneSkeleton(data.model);
			opt.menuItemsList.append(item);
			Admin.bindAjaxLinks(item);
			makeSortable();
			bindEdit(item);
			bindDelete(item);
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
		item.find('.edit').attr('href', h.replaceUriSlugs(item.find('.edit').attr('href'), [data.id]));
		item.find('.delete').attr('href', h.replaceUriSlugs(item.find('.delete').attr('href'), [data.id]));
		let weight = item.find('input[type=hidden]');
		weight.attr('name', weight.attr('name').replace('[id]', '['+data.id+']'));
	
		makeActive(item, data.active);
		return item;
	}

	function bindDelete(items){
		items.find('.delete').on('ajax.success', function(e){
			let item = $(this).closest('.menu-item');
			if(item.children('ul').length){
				item.children('ul').appendTo(item.parent());
				opt.saveItems.removeClass('disabled');
			}
			item.remove();
		});
	};

	function saveItems(){
		opt.saveItems.on('ajax.success', function(){
			opt.saveItems.addClass('disabled');
		})
	}

	function rebuildForm(list, weight = 0)
	{
		$.each(list.find('li'), function(i, item){
			$(item).find('input.weight').val(weight);
            let parent = $(item).parent().parent();
            if (parent.hasClass('menu-tree')) {
                $(item).find('input.parent').val('');
            }
            else{
                $(item).find('input.parent').val(parent.data('item'));
            }
			weight++;
			if($(item).find('ul').length){
				rebuildForm($(item).find('ul'));
			}
		});
	}

	return {
		init: init
	};

})();

export default AdminMenu;