import Page from 'page';
import Forms from './Forms';
import * as h from 'helpers';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';

const Blocks = (() => {

	let options = {
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
		if(options.blockListElements.length){
			bindAddToRegion(options.blockListElements.find('.js-add-to-region'));
			loadBlocks();
			bindSave(options.saveElement);
		}
	};

	function loadBlocks(){
		h.post('/api/' + window.location.pathname.trimLeft('/admin')).done(function(data){

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

	function bindAddToRegion(elems){
		elems.click(function(e){
			let clone = $('#blockSkeleton').clone();
			clone.removeAttr('id');
			clone.removeClass('d-none');
			let block = $(this).closest('.js-block');
			let provider = block.closest('.js-provider');
			clone.data('block-id', block.data('id'));
			clone.find('.name').html(block.find('.name').html());
			clone.find('.provider').html(provider.data('name'));
			let region = options.pageContainer.find('[data-region-id='+$(this).data('region')+']');
			region.find('ul').append(clone);
			makeSortable(region.find('ul'));
			bindDeleteFromRegion(clone);
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