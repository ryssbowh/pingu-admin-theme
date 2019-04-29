import 'jquery-ui/ui/widgets/resizable';
import 'jquery-ui/ui/widgets/sortable';

const Layout = (() => {

	let options = {
		addRegionPage: $('.layout-regions'),
		addRegion: $('.js-add-region'),
		page: $('.js-page'),
		noRegions: $('.js-no-regions'),
		pageContainer: $('#page-container')
	};

	function init(){ 
		console.log('Page initialized');
		if(options.addRegionPage.length){
			options.pageContainer.resizable({
				handles: 's'
			});
			bindAddRegion();
			loadRegions();
		}
	};

	function loadRegions(){
		let id = 
		$.ajax({
            type: "POST",
            url: '/api/page-layout/'+options.addRegionPage.data('id')+'/page-regions'
    	}).done(function(data){
    		$.each(data, function(i, region){
    			addRegion(region.width, region.height, region.id, region.name);
    		});
    	});
	};

	function bindAddRegion(){
		options.addRegion.click(function(e){
			e.preventDefault();
			addRegion(50, 50);
		});
	};

	function addRegion(width, height, id = false, name = ''){
		let nbRegions = $('.region').length;
		if(name == ''){
			name = 'Region '+(nbRegions+1);
		}
		let widthPx = ($('#page-container').width() * (width/100)) - 20;
		let elem = $('<div class="region js-region" style="width:'+widthPx+'px;height:'+height+'px">\
			<div class="inner">\
			<input type="text" required name="regions['+nbRegions+'][name]" value="'+name+'">\
			<input type="hidden" class="js-width" name="regions['+nbRegions+'][width]" value="'+width+'">\
			<input type="hidden" class="js-height" name="regions['+nbRegions+'][height]" value="'+height+'">\
			<input type="hidden" class="js-deleted" name="regions['+nbRegions+'][deleted]" disabled value="1">\
			');
		if(id){
			elem.find('.inner').append('<input type="hidden" name="regions['+nbRegions+'][id]" value="'+id+'">')
		}
		elem.find('.inner').append('<a href="#" class="js-delete">Delete</a>');
		options.page.append(elem);
		makeResizable(elem);
		bindDelete(elem);
	};

	function bindDelete(elem){
		elem.find('a.js-delete').click(function(e){
			e.preventDefault();
			let region = $(this).closest('.region');
			region.find('input.js-deleted').prop('disabled', false);
			region.hide();
		});
	};

	function makeResizable(elems){
		$.each(elems, function(i,item){
			$(item).resizable({
				minHeight: 38,
				minWidth: 50,
				containment: '#page-container',
				resize: function(event, ui){
					setRegionWidth(ui.element);
				},
				create: function(event, ui){
					setRegionWidth(this);
				}
			});
		});
		makeSortable();
	};

	function setRegionWidth(elem){
		let containerSize = $('#page-container').width();
		let size = ((($(elem).outerWidth()) / (containerSize) ) * 100).toFixed(1);
		$(elem).find('input.js-width').val(size);
		$(elem).find('input.js-height').val($(elem).height());
	};

	function makeSortable(){
		$('#page-container').sortable({
			items:".js-region"
		});
	};

	return {
		init: init
	};

})();

export default Layout;