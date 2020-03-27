import "nestedSortable";

const AdminTaxonomy = (() => {

	let opt = {
		editTree: $('.edit-taxonomy-items .taxonomy-tree'),
		itemsList: $('.edit-taxonomy-items .taxonomy-list'),
		items: $('.edit-taxonomy-items .taxonomy-item:not(.skeleton)'),
		addItem: $('.edit-taxonomy-items .js-add'),
		editItem: $('.edit-taxonomy-items .js-edit'),
		deleteItem: $('.edit-taxonomy-items .js-delete'),
		itemSkeleton: $('.edit-taxonomy-items .taxonomy-item.skeleton'),
		saveItems: $('.edit-taxonomy-items .save')
	};

	function init()
	{ 
		Logger.log('[Admin Theme] Taxonomy initialized');
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
			bindAddItem();
		}
		if(opt.saveItems.length){
			opt.saveItems.addClass('disabled');
			bindSave();
		}
	};

	function makeSortable()
	{
		opt.editTree.children('ul').nestedSortable({
			handle:'.header',
			items:'li',
			listType:'ul',
			stop: function(e){
				rebuildWeights();
				opt.saveItems.removeClass('disabled');
			}
		});
	}

	function rebuildWeights()
	{
		let weight = 0;
		$.each(opt.itemsList.find('li'), function(i, item){
			$(item).find('input').val(weight);
			weight++;
		});
	}

	function bindEdit(items)
	{
		items.find('.js-edit').on('form.success', function(e, data){
			let item = $(this).closest('li');
			item.find('.name').html(data.entity.name);
			makeActive(item, data.entity.active);
		});
	}; 

	function bindAddItem()
	{
		opt.addItem.on('form.success', function(e, data){
			let item = cloneSkeleton(data.model);
			appendItemToList(item);
			makeSortable();
			AdminTheme.bindAjaxLinks(item);
			bindEdit(item);
			bindDelete(item);
		});
	};

	function appendItemToList(item)
	{
		if(!opt.itemsList.length){
			opt.editTree.html('');
			opt.editTree.append('<ul></ul>');
			opt.itemsList = $('.edit-taxonomy-items > .taxonomy-tree > ul');
		}
		opt.itemsList.append(item);
	}

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
		let weight = item.find('input');
		weight.attr('name', weight.attr('name').replace('id', data.id));
		item.data('item', data.id);
		item.removeClass('d-none skeleton');
		item.find('.js-delete').attr('href', Helpers.replaceUriSlugs(item.find('.js-delete').attr('href'), [data.id]));
		item.find('.js-edit').attr('href', Helpers.replaceUriSlugs(item.find('.js-edit').attr('href'), [data.id]));
		makeActive(item, data.active);
		return item;
	}

	function bindDelete(items){
		items.find('.js-delete').on('ajax.success', function(){
			let item = $(this).closest('li');
			if(item.children('ul').length){
				item.children('ul').appendTo(item.parent());
				opt.saveItems.removeClass('disabled');
			}
			item.remove();
		});
	};

	function bindSave()
	{
		opt.saveItems.on('ajax.success', function(){
			opt.saveItems.addClass('disabled');
		});
	}

	return {
		init: init
	};

})();

export default AdminTaxonomy;