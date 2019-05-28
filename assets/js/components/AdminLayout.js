import 'jquery-ui/ui/widgets/resizable';
import 'jquery-ui/ui/widgets/sortable';
import * as h from 'pingu-helpers';
import Admin from './Admin';

const AdminLayout = (() => {

	let options = {
		addRegionPage: $('.layout-regions'),
		addRegion: $('.js-add-region'),
		deleteRegion: $('.js-delete'),
		page: $('.js-page'),
		pageContainer: $('#page-container'),
		save: $('.layout-regions .js-save'),
		regions: $('#page-container .js-region'),
		skeleton: $('.layout-regions .region.skeleton')
	};

	function init()
	{ 
		console.log('Page initialized');
		options.pageContainer.resizable({
			handles: 's'
		});
		if(options.regions.length){
			makeResizable(options.regions);
			bindNameChange(options.regions);
		}
		if(options.addRegionPage.length){
			bindAddRegion();
		}
		if(options.deleteRegion.length){
			bindDeleteRegion(options.regions);
		}
		if(options.save.length){
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
		elems.find('.js-delete').click(function(e){
			e.preventDefault();
			let region = $(this).closest('.js-region');
			h._delete($(this).attr('href'))
				.done(function(){
					region.remove();
				})
				.fail(function(data){
					Admin.showErrorModal(data.responseJSON.message);
				});
		});
	}

	function bindAddRegion()
	{
		options.addRegion.click(function(e){
			e.preventDefault();
			h.get($(this).attr('href'), {'_theme': 'Admin'}).done(function(data){
				let modal = Admin.createFormModal(data.form);
				modal.on('form.success', function(form, data){
					let region = addRegion(data.model);
					bindDeleteRegion(region);
					bindNameChange(region)
					makeResizable(region);
				});
			});
		});
	};

	function addRegion(data)
	{
		let elem = options.skeleton.clone();
		elem.removeClass('skeleton d-none');
		elem.css('width', 'calc('+data.width+'% - 20px)');
		elem.css('height', data.height+'px');
		elem.data('id', data.id);
		elem.data('width', data.width);
		elem.data('height', data.height);
		elem.find('input[type=text]').val(data.name).attr('name', 'regions['+data.id+'][name]');
		elem.find('.js-delete').attr('href', h.replaceUriSlugs(elem.find('.js-delete').attr('href'), [data.id]));
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
				resize: function(event, ui){
					setRegionSize(ui.element);
					enableSave();
				},
				create: function(event, ui){
					setRegionSize(this);
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

	function setRegionSize(elem)
	{
		let containerSize = $('#page-container').width();
		let size = ((($(elem).outerWidth()) / (containerSize) ) * 100).toFixed(1);
		$(elem).data('width',size);
		$(elem).data('height',$(elem).height());
	};

	function makeSortable()
	{
		$('#page-container').sortable({
			items:".js-region"
		});
	};

	function bindSave()
	{
		options.save.click(function(e){
			e.preventDefault();
			let url = $(this).attr('href');
			let data = [];
			$.each($('#page-container .js-region'), function(i, region){
				let elem = {
					id: $(region).data('id'),
					width: $(region).data('width'),
					height: $(region).data('height')
				};
				data.push(elem);
			});
			h.patch(url, {models:data}).done(function(data){
				Admin.showSuccessModal(data.message);
				disableSave();
			});
		});
	}

	return {
		init: init
	};

})();

export default AdminLayout;