import Page from 'pingu-page';
import Forms from './AdminForms';
import Modal from './AdminModal';
import Admin from './Admin';
import * as h from 'PinguHelpers';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';

const AdminBlocks = (() => {

	let options = {
		page: $('.page-blocks'),
		blockList: $('.js-block-list'),
		regionList: $('.page-blocks .region'),
		blockListElements: $('.js-block-list .js-block'),
		pageContainer: $('.page-blocks #page-container'),
		saveElement: $('.region-list .js-save'),
		addBlock: $('.page-blocks .js-add-block')
	};

	function init(){
		// h.log('[Admin Theme] Blocks initialized');
		// if(options.page.length){
		// 	loadBlocks();
		// }
		// if(options.blockListElements.length){
		// 	bindAddToRegion(options.blockListElements.find('.js-add-to-region'));
		// 	bindEdit(options.blockListElements.find('.js-edit'));
		// 	bindSave(options.saveElement);
		// }
	};

	function bindEdit(elems)
	{
		elems.click(function(e){
			e.preventDefault();
			h.get($(this).prop('href'), {_theme: 'admin'}).done(function(data){
				let modal = Modal.createForm($(data.form));
				modal.on('form.success', function(form, data){
					options.regionList.find('.block[data-id='+data.model.id+']').find('.name').html(data.model.instance.name);
					options.blockList.find('.js-block[data-id='+data.model.id+']').find('.name').html(data.model.instance.name);
				});
			});
		});
	};

	function loadBlocks(){
		let url = options.page.data('listblocksuri');
		h.get(url).done(function(data){
			$.each(data, function(region,blocks){
				$.each(blocks, function(ind, block){
					createBlockElement(block.id, block.name, block.section, region);
				});
			});
		});
	}; 

	function createBlockElement(id, name, providerName, regionId){
		let clone = $('#blockSkeleton').clone();
		clone.removeAttr('id');
		clone.removeClass('d-none');
		clone.attr('data-id', id);
		clone.find('.name').html(name);
		clone.find('.section').html(providerName);
		let region = options.pageContainer.find('[data-region-id='+regionId+']');
		region.find('ul').append(clone);
		makeSortable(region.find('ul'));
		bindDeleteFromRegion(clone);
		options.saveElement.removeClass('disabled');
		return clone;
	}

	function bindAddToRegion(elems){
		elems.click(function(e){
			let block = $(this).closest('.js-block');
			createBlockElement(block.data('id'), block.find('.name').html(), block.data('section'), $(this).data('region'));
			e.preventDefault();
		});
	}

	function makeSortable(elem){
		elem.sortable();
	}

	function bindDeleteFromRegion(elem){
		elem.find('.js-delete-from-region').click(function(e){
			e.preventDefault();
			elem.slideUp(function(){
				elem.remove();
				options.saveElement.removeClass('disabled');
			});
		});
	}

	function bindSave(elem){
		elem.click(function(e){
			e.preventDefault();
			let data = {};
			let regions = [];
			$.each(options.regionList, function(i, region){
				let sub = {region: $(region).data('region-id')};
				let blocks = [];
				$.each($(region).find('.block'), function(blockI, block){
					blocks.push($(block).data('id'));
				});
				sub.blocks = blocks;
				regions.push(sub);
			});
			data.regions = regions;
			h.patch($(this).prop('href'), data).done(function(data){
				Modal.showSuccess(data.message);
				options.saveElement.addClass('disabled');
			});
		});
	}

	return {
		init:init
	};

})();

export default AdminBlocks;