import "nestedSortable";

const AdminMedia = (() => {

	let options = {
		createTransformerForm: $('.form-media-transformer-create'),
		deleteTransformerLinks: $('.image-transformations a.deleteLink'),
		editTransformerLinks: $('.image-transformations a.editLink'),
		list: $('.transformations-list'),
		saveForm: $('.image-transformations form'),
		styleAddLink: $('.add-image-style-link'),
        createFolder: $('.js-create-folder'),
        mediaFolders: $('.media-folders'),
        mediaFoldersTree: $('.media-folders-wrapper'),
        mediaFoldersLinks: $('.js-folder'),
        entitiesFilterForm: $('form.form-filter-entity'),
	};

	function init(){
		Logger.log('[Admin Theme] Media initialized');
		if(options.createTransformerForm.length){
			initAddTransformerForm();
			initTransformerDelete();
			initTransformerEdit();
			makeSortable();
			initSaveForm();
			initAddStyleLink();
		}
        if (options.mediaFolders.length) {
            initCreateFolder();
            initFolderClicks();
            initFilterMedias();
        }
	};

    function initFolderClicks()
    {
        options.mediaFoldersLinks.click(function(e){
            e.preventDefault();
            options.mediaFoldersLinks.removeClass('selected');
            $(this).addClass('selected');
            options.entitiesFilterForm.submit();
        });
    }

    function initFilterMedias()
    {
        options.entitiesFilterForm.submit(function(e){
            if (!options.mediaFoldersTree.find('a.selected').length) {
                return;
            }
            e.preventDefault();
            let folder = options.entitiesFilterForm.find('input.folder-filter');
            if (!folder.length) {
                folder = $('<input type="hidden" class="folder-filter" name="filters[field_folder]">');
                options.entitiesFilterForm.append(folder);
            }
            folder.val(options.mediaFoldersTree.find('a.selected').data('id'));
            $(this).off('submit');
            $(this).submit();
        });
    }

    function initCreateFolder()
    {
        options.createFolder.on('form.success', function(){
            location.reload();
        });
        options.createFolder.on('form.loaded', function(e, modal){
            $(modal).find('.field-wrapper-type-select').hide();
        });
    }

	function initAddStyleLink()
	{
		options.styleAddLink.on('form.success', function(){
			location.reload();
		});
	}

	function initSaveForm()
	{
		options.saveForm.on('form.success', function(){
			$(this).find('input[type=submit]').addClass('disabled');
		});
	}

	function makeSortable()
	{
		options.list.nestedSortable({ 
			handle:'.handle',
			items:'li',
			listType:'ul',
			relocate: function(e){
				rebuildWeights();
				options.saveForm.find('input[type=submit]').removeClass('disabled');
			}
		});
	}

	function rebuildWeights()
	{
		let weight = 0;
		$.each(options.list.find('li'), function(i, item){
			$(item).find('input').val(weight);
			weight++;
		});
	}

	function initAddTransformerForm()
	{
		options.createTransformerForm.on('form.success', function(e, data){
			if(data.html){
				let modal = Modal.createForm(data.html);
				modal.on('form.success', function(e, data){
					location.reload();
				});
			}
			else{
				location.reload();
			}
		});
	}

	function initTransformerDelete()
	{
		options.deleteTransformerLinks.on('ajax.success', function(e, data){
			$(this).closest('li').remove();
		});
	}

	function initTransformerEdit()
	{
		options.editTransformerLinks.on('ajax.success', function(e, data){
			let modal = Modal.createForm(data.html);
			modal.on('form.success', function(e, data){
				location.reload();
			});
		});
	}


	return {
		init:init
	};

})();

export default AdminMedia;