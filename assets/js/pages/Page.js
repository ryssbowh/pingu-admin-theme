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

    function toggleActive(elem)
    {
        let title = elem.closest('.block').find('.title');
        if (elem.is(':checked')) {
            title.removeClass('disabled');
        } else {
            title.addClass('disabled');
        }
    }

	function bindEdit(elems)
	{
        elems.find('input.active').change(function(){
            options.save.removeClass('d-none');
            toggleActive($(this));
        });
		elems.find('.js-edit').click(function(e){
			e.preventDefault();
            let block = $(this).closest('.block');
			let ajax = Block.editRequest(block.data('id'), {_theme: 'admin'});
            ajax.done(function(data){
                let modal = Modal.createForm(data.html);
                modal.on('form.success', function(e, data){
                    block.find('.title').html(data.instance.title);
                    if (data.active) {
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
        clone.data('id', block.id);
		clone.find('.title').html(block.instance.title);
        clone.find('.active').prop('checked', block.active);
        toggleActive(clone.find('.active'));
        if (!block.active) {
            clone.find('.title').addClass('disabled');
        }
        replaceIdInName(clone.find('.active'), block.id);
        replaceIdInName(clone.find('.weight'), block.id);
		options.blockList.append(clone);
		makeSortable();
		bindDelete(clone);
        bindEdit(clone);
		return clone;
	}

    function replaceIdInName(elem, id)
    {
        if(!elem.length) return;
        let name = elem.attr('name');
        name = name.replace('[]', '['+id+']');
        elem.attr('name', name);
    }

	function bindAdd(elems){
		elems.click(function(e){
            e.preventDefault();
            let ajax = Block.createRequest($(this).data('machinename'), {_theme: 'admin'});
            ajax.done(function(data){
                let modal = Modal.createForm($(data.html));
                modal.on('form.success', function (e, data) {
                    addBlockToPage(data);
                })
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
            let id = $(this).closest('.block').data('id');
			let ajax = Block.deleteRequest(id);
            ajax.done(function(){
                elem.slideUp('fast', function(){
				    elem.remove();
			    });
            });
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