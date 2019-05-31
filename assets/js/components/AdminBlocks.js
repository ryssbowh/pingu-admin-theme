import Page from 'pingu-page';
import Forms from './AdminForms';
import Admin from './Admin';
import * as h from 'pingu-helpers';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';

const AdminBlocks = (() => {

	let options = {
		page: $('.page-regions'),
		addBlock : $('.js-add-block'),
		blockList: $('.js-block-list'),
		regionList: $('#page-container .region'),
		blockListElements: $('.js-block-list .js-block'),
		pageContainer: $('#page-container'),
		saveElement: $('.region-list .js-save')
	};

	function init(){
		console.log('Blocks initialized');
		if(options.addBlock.length){
			bindAddBlock(options.addBlock);
		}
		if(options.page.length){
			loadBlocks();
		}
		if(options.blockListElements.length){
			bindAddToRegion(options.blockListElements.find('.js-add-to-region'));
			bindEdit(options.blockListElements.find('.js-edit'));
			bindSave(options.saveElement);
		}
	};

	function bindEdit(elems)
	{
		elems.click(function(e){
			e.preventDefault();
			h.get($(this).prop('href'), {_theme: 'admin'}).done(function(data){
				let modal = Admin.createFormModal($(data.form));
				modal.on('form.success', function(form, data){
					options.regionList.find('.block[data-id='+data.model.id+']').find('.name').html(data.model.instance.name);
					options.blockList.find('.js-block[data-id='+data.model.id+']').find('.name').html(data.model.instance.name);
				});
			});
		});
	};

	function loadBlocks(){
		let url = options.page.data('blockindexuri');
		h.get(url).done(function(data){
			$.each(data, function(region,blocks){
				$.each(blocks, function(ind, block){
					createBlockElement(block.id, block.instance.name, block.provider.name, region);
				});
			});
		});
	}; 

	function bindAddBlock(elems){
		elems.click(function(e){
			e.preventDefault();
			let provider = $(this).data('provider');
			h.get($(this).prop('href'), {_theme:'admin'}).done(function(data){
				let modal = Admin.createFormModal($(data.form));
				modal.on('form.success', function(form, data){
					addBlockToList(data.model, provider);
				});
			});
		});
	};

	function addBlockToList(block, provider){
		let providerList = options.blockList.find('[data-provider='+provider+']');
		let elem = providerList.find('.js-block').first().clone();
		elem.find('.name').html(block.instance.name);
		elem.find('.dropdown-toggler').attr('id', 'block-'+block.id+'-dropdown');
		elem.attr('data-id', block.id);
		providerList.find('ul').append(elem);
		bindAddToRegion(elem.find('.js-add-to-region'));
	}

	function createBlockElement(id, name, providerName, regionId){
		let clone = $('#blockSkeleton').clone();
		clone.removeAttr('id');
		clone.removeClass('d-none');
		clone.attr('data-id', id);
		clone.find('.name').html(name);
		clone.find('.provider').html(providerName);
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
			let provider = block.closest('.js-provider');
			createBlockElement(block.data('id'), block.find('.name').html(), provider.data('name'), $(this).data('region'));
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
				Admin.showSuccessModal(data.message);
				options.saveElement.addClass('disabled');
			});
		});
	}

	return {
		init:init
	};

})();

export default AdminBlocks;