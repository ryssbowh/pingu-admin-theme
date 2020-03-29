import "nestedSortable";
import FieldDisplayCore from 'FieldDisplay';

const FieldDisplay = (() => {

	let opt = {
		list: $('.field-display .js-list-root'),
		form: $('form.field-display-form'),
        editOptions:$('.field-display a.js-edit'),
        format:$('.field-display select'),
        hidden: $('input.hidden')
	};

	function init(){
		Logger.log('[Admin Theme] Form Layout initialized');
		if(opt.list.length){
			makeSortable();
            bindChangeFormat();
            bindHidden();
		}
		if(opt.form.length){
			bindSave();
		}
		if(opt.editOptions.length){
			bindEditOptions();
		}
	};

	function makeSortable()
	{
		opt.list.nestedSortable({
			handle:'.header',
			items:'li',
			listType:'ul',
            toleranceElement: '> div',
            rootId:'js-list-root'
		});
	}

    function updateOptions(item, data)
    {
        if (!data.hasOptions) {
            data.options.values = "";
            data.options.description = '';
        }
        item.find('.options').val(JSON.stringify(data.options.values));
        item.find('.description').html(data.options.description);
        if (data.hasOptions) {
            item.find('.js-edit').removeClass('d-none');
        } else {
            item.find('.js-edit').addClass('d-none');
        }
    }

	function bindEditOptions()
	{
        opt.editOptions.click(function(e){
            e.preventDefault();
            let link = $(this);
            let item = link.closest('.row');
            let field = item.find('select').val();
            let data = {
                values: JSON.parse(item.find('.options').val()),
                _theme: 'admin'
            };
            AdminTheme.performAjaxCall(link, data, FieldDisplayCore.editOptionsUri(field)).done(function(data){
                AdminTheme.initModalForm(data.html, link);
            });
        });

        opt.editOptions.on('form.sending', function(e, data) {
            let item = $(this).closest('.list-group-item');
            data.values = JSON.parse(item.find('.options').val());
        });

		opt.editOptions.on('form.success', function(e, data){
            let item = $(this).closest('.list-group-item');
			updateOptions(item, data);
		});
	}

	function bindSave()
	{
		opt.form.on('submit', function(e){
			e.preventDefault();
            let data = {models:[]};
            let weight = 0;
            $.each(opt.form.find('li.field'), function(i, field){
                data.models.push({
                    id: $(field).find('input.id').val(),
                    weight: weight,
                    options: $(field).find('input.options').val(),
                    displayer: $(field).find('select').val(),
                    hidden: $(field).find('input.hidden').is(':checked') ? 1 : 0
                });
                weight++;
            });
            $(this).data('class-instance').submitAjax(data);
		});
	};

    function bindChangeFormat()
    {
        opt.format.change(function(){
            let item = $(this).closest('li');
            let field = $(this).val();
            AdminTheme.performAjaxCall(item, {}, FieldDisplayCore.viewOptionsUri(field)).done(function(data){
                updateOptions(item, data);
            });
        });
    }

    function bindHidden()
    {
        opt.hidden.change(function(){
            if ($(this).is(':checked')) {
                $(this).closest('.row').find('.hideable').addClass('hidden');
            } else {
                $(this).closest('.row').find('.hideable').removeClass('hidden');
            }
        });
    }

	return {
		init:init
	};

})();

export default FieldDisplay;