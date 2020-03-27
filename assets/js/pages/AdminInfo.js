const AdminInfo = (() => {

	let options = {
		info: $('.container.infos'),
		lists: $('.container.infos .card-body>ul'),
		viewMore: $('.container.infos .js-view-more'),
	};

	let cardHeight = 205;

	function init(){
		Logger.log('[Admin Theme] Info initialized');
		if(options.info.length){
			resizeLists();
			bindViewMore();
		}
	};

	function resizeLists()
	{
		$.each(options.lists, function(i, item){
			if($(item).height() < cardHeight){
				$(item).next().hide();
			}
			else{
				$(item).height(cardHeight);
			}
		});
	}

	function bindViewMore()
	{
		options.viewMore.click(function(e){
			e.preventDefault();
			if($(this).html() == 'View more'){
				$(this).prev().css('height', 'auto');
				$(this).html('View less');
			}
			else{
				$(this).prev().height(cardHeight);
				$(this).html('View more');
			}
		});
	}

	return {
		init:init
	};

})();

export default AdminInfo;