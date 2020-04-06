
const ViewModes = (() => {

	let options = {
		page: $('.index-entity-view_mode'),
        createLink: $('.js-create'),
        deleteLink: $('.js-delete'),
        editLink: $('.js-edit')
	};

	function init(){
		if (options.page.length) {
            Logger.log('[Admin Theme] View mode initiliazed');
            bindNew();
            bindDelete();
            bindEdit();
        }
	};

    function bindNew()
    {
        options.createLink.on('form.success', function(){
            location.reload();
        });
    }

    function bindDelete()
    {
        options.deleteLink.on('ajax.success', function(){
            $(this).closest('.view-mode').remove();
        });
    }

    function bindEdit()
    {
        options.editLink.on('form.success', function(e, data){
            $(this).closest('.view-mode').find('h3').html(data.entity.name);
        });
    }

	return {
		init:init
	};

})();

export default ViewModes;