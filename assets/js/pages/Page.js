import PageModule from 'PageModule';
import Block from 'BlockModule';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';

const Page = (() => {

	let options = {
		page: $('.page-blocks'),
		blockList: $('.page-blocks .js-block-list'),
        blocksAvailable: $('.page-blocks .block-available .js-block'),
        blocks: $('.page-blocks .block'),
        save: $('.page-blocks .js-save')
	};

	function init(){
		if(options.page.length){
            Logger.log('[Admin Theme] Blocks initialized');
            bindAdd(options.blocksAvailable);
            bindEdit(options.blocks);
            bindDelete(options.blocks);
            bindSave(options.save);
            makeSortable();
		}
	};

    function bindSave(elem)
    {
        elem.on('ajax.success', function(){
            elem.addClass('d-none');
        });
    }

	function bindEdit(elems) 
	{
		elems.find('.js-edit').click(function(e){
			e.preventDefault();
            let block = $(this).closest('.block');
			let ajax = Block.editRequest(block.find('.id').val(), {_theme: 'admin'});
            ajax.done(function(data){
                let modal = Modal.createForm(data.html);
                modal.on('form.success', function(e, data){
                    block.find('.title').html(data.model.instance.title);
                    if (data.model.active) {
                        block.find('.title').removeClass('disabled');
                    } else {
                        block.find('.title').addClass('disabled');
                    }
                });
            });
		});
	};

	function createBlockElement(block){
		let clone = $('#blockSkeleton').clone();
		clone.removeAttr('id');
		clone.removeClass('d-none');
		clone.find('.title').html(block.instance.title);
        if (!block.active) {
            clone.find('.title').addClass('disabled');
        }
        clone.find('.id').val(block.id);
		options.blockList.append(clone);
		makeSortable();
        rebuildWeights();
		bindDelete(clone);
        bindEdit(clone);
		return clone;
	}

	function bindAdd(elems){
		elems.click(function(e){
            e.preventDefault();
            let ajax = Block.createRequest($(this).data('machinename'), {_theme: 'admin'});
            ajax.done(function(data){
                let modal = Modal.createForm($(data.html));
                modal.on('form.success', function (e, data) {
                    addBlockToPage(data.model);
                });
            });
		});
	}

    function addBlockToPage(block)
    {
        PageModule.addBlockRequest(options.page.data('slug'), block.id).done(
            function () {
                createBlockElement(block);
            }
        );
    }

	function makeSortable(){
		options.blockList.sortable({
            stop: function(){
                rebuildWeights();
                options.save.removeClass('d-none');
            }
        });
	}

	function bindDelete(elem){
		elem.find('.js-delete').click(function(e){
			e.preventDefault();
            elem = $(this).closest('.block');
            let id = elem.find('.id').val();
            PageModule.deleteBlockRequest(options.page.data('slug'), id).done(
                function () {
                    elem.slideUp('fast', function(){
                        elem.remove();
                    });
                }
            );
		});
	}

    function rebuildWeights()
    {
        let weight = 0;
        $.each(options.blockList.find('li'), function(i, item){
            $(item).find('input.weight').val(weight);
            weight++;
        });
    }

	return {
		init:init
	};

})();

export default Page;