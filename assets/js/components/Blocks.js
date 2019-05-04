import Page from 'page';
import Forms from './Forms';
import * as h from 'helpers';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';

const Blocks = (() => {

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
			initAddBlock(options.addBlock);
		}
		if(options.page.length){
			loadBlocks();
		}
		if(options.blockListElements.length){
			bindAddToRegion(options.blockListElements.find('.js-add-to-region'));
			bindSave(options.saveElement);
		}
	};

	function loadBlocks(){
		let page = options.page.data('page');
		Page.listBlocksForPage(page).done(function(data){
			$.each(data, function(region,blocks){
				$.each(blocks, function(ind, block){
					createBlockElement(block.block_id, block.name, block.provider.name, region);
				});
			});
		});
	};

	function initAddBlock(elems){
		elems.click(function(e){
			e.preventDefault();
			Page.getCreateBlockForm($(this).data('provider')).done(function(data){
				let modalId = $(data.form).prop('id');
				if($('#'+modalId).length){
					$('#'+modalId).remove();
				}
				$('body').append($(data.form));
				let modal = $('#'+modalId);
				modal.modal({backdrop:'static'});
				modal.on('shown.bs.modal', function(e){
					submitAddBlock(modal)
				});
			});
		});
	};

	function submitAddBlock(modal){
		let form = modal.find('form');
		form.submit(function(e){
			let data = form.serializeArray();
			h.ajax(form.prop('action'), data).done(function(data){
				modal.modal('hide');
			}).fail(function(data){
				if(data.responseJSON.errors){
					Forms.showErrors(form, data.responseJSON.errors);
				}
			});
			return false;
		});
		
	};

	function createBlockElement(id, name, providerName, regionId){
		let clone = $('#blockSkeleton').clone();
		clone.removeAttr('id');
		clone.removeClass('d-none');
		clone.data('block-id', id);
		clone.find('.name').html(name);
		clone.find('.provider').html(providerName);
		let region = options.pageContainer.find('[data-region-id='+regionId+']');
		region.find('ul').append(clone);
		makeSortable(region.find('ul'));
		bindDeleteFromRegion(clone);
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
					blocks.push($(block).data('block-id'));
				});
				sub.blocks = blocks;
				regions.push(sub);
			});
			data.regions = regions;
			let url = '/api/' + window.location.pathname.trimLeft('/admin');
			h.put(url, data).done(function(data){

			});
		});
	}

	return {
		init:init,
		initAddBlock: initAddBlock
	};

})();

export default Blocks;