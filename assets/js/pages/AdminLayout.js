import 'jquery-ui/ui/widgets/resizable';
import 'jquery-ui/ui/widgets/sortable';

const AdminLayout = (() => {

	let options = {
		page: $('.page-layout'),
		addRegion: $('.page-layout .add-region'),
		deleteRegion: $('.page-layout .delete'),
		pageContainer: $('.page-layout #page-container'),
		save: $('.page-layout .js-save'),
		regions: $('.page-layout .region'),
		skeleton: $('.page-layout .region.skeleton')
	};

	function init()
	{ 
		Helpers.log('[Admin Theme] Page initialized');
		options.pageContainer.resizable({
			handles: 's'
		});
		if(options.regions.length){
			makeResizable(options.regions);
			bindNameChange(options.regions);
		}
		if(options.page.length){
			bindAddRegion();
		}
		if(options.deleteRegion.length){
			bindDeleteRegion(options.regions);
		}
		if(options.save.length){
			disableSave();
			bindSave();
		}
	};

	function bindNameChange(elems)
	{
		elems.find('input').keyup(function(){
			enableSave();
		});
	}

	function bindDeleteRegion(elems)
	{
		elems.find('.delete').on('ajax.success', function(){
			let region = $(this).closest('.js-region');
			region.remove();
		});
	}

	function bindAddRegion()
	{
		options.addRegion.on('form.success', function(e, data){
			let region = addRegion(data.model);
			bindDeleteRegion(region);
			bindNameChange(region)
			makeResizable(region);
		});
	};

	function addRegion(data)
	{
		let elem = options.skeleton.clone();
		elem.removeClass('skeleton d-none');
		elem.css('width', 'calc('+data.width+'% - 20px)');
		elem.css('height', data.height+'px');
		elem.data('id', data.id);
		let url = elem.find('.delete').attr('href');
		elem.find('.delete').attr('href', h.replaceUriSlugs(url, data.id));
		elem.find('input.name').val(data.name).attr('name', 'regions['+data.id+'][name]');
		elem.find('input.width').val(data.width).attr('name', 'regions['+data.id+'][width]');
		elem.find('input.height').val(data.height).attr('name', 'regions['+data.id+'][height]');
		AdminTheme.bindAjaxLinks(elem);
		options.pageContainer.append(elem);
		return elem;
	}

	function makeResizable(elems)
	{
		$.each(elems, function(i,item){
			$(item).resizable({
				minHeight: 38,
				minWidth: 50,
				containment: '#page-container',
				stop: function(event, ui){
					rebuildSizes();
					enableSave();
				},
				create: function(event, ui){
					rebuildSizes();
				}
			});
		});
		makeSortable();
	};

	function enableSave(){
		options.save.removeClass('disabled');
	}

	function disableSave(){
		options.save.addClass('disabled');
	}

	function rebuildSizes()
	{
		let containerSize = $('#page-container').width();
		$.each($('#page-container .region'), function(i, elem){
			let size = ((($(elem).outerWidth()) / (containerSize) ) * 100).toFixed(1);
			$(elem).find('.width').val(size);
			$(elem).find('.height').val($(elem).height());
		});
	};

	function makeSortable()
	{
		$('#page-container').sortable({
			items:".js-region"
		});
	};

	function bindSave()
	{
		options.save.on('ajax.success', function(){
			disableSave();
		});
	}

	return {
		init: init
	};

})();

export default AdminLayout;