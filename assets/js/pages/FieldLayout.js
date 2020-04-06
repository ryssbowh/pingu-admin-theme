import "nestedSortable";
import FieldLayoutCore from 'FieldLayout';

const FieldLayout = (() => {

	let opt = {
		list: $('.form-layout .js-list-root'),
		form: $('.form-layout > form'),
        addGroupForm:$('.form-layout .form-create-form-layout-group'),
        editOptions:$('.form-layout a.js-edit'),
        widgets:$('.form-layout select'),
	};

	function init(){
		Logger.log('[Admin Theme] Form Layout initialized');
		if(opt.list.length){
            rebuildTree();
			makeSortable();
            bindDeleteGroup();
            bindChangeWidget()
		}
		if(opt.form.length){
			bindSave();
		}
		if(opt.editOptions.length){
			bindEditOptions();
		}
        if(opt.addGroupForm.length){
            bindAddGroupForm();
        }
	};

	function makeSortable()
	{
		opt.list.nestedSortable({
			handle:'.header',
			items:'li',
			listType:'ul',
            toleranceElement: '> div',
            doNotClear: true,
            isTree: true,
            maxLevels: 2,
            protectRoot: true,
            rootId:'js-list-root',
			stop: function(e){
				rebuildTree();
				opt.form.find('input[type=submit]').removeClass('disabled');
			}
		});
	}

	function rebuildTree()
	{
		$.each(opt.list.find('.group'), function(i, group){
            if ($(group).find('li').length) {
                $(group).find('.js-delete').addClass('d-none');
            } else {
                $(group).find('.js-delete').removeClass('d-none');
            }
		});
	}

    function updateOptions(item, data)
    {
        item.find('.options').val(JSON.stringify(data.values));
        item.find('.description').html(data.description);
        opt.form.find('input[type=submit]').removeClass('disabled');
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
                values: JSON.parse(item.find('.options').val())
            };
            AdminTheme.performAjaxCall(link, data, FieldLayoutCore.editOptionsUri(field)).done(function(data){
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

    function validateAddGroupForm()
    {
        let allNames = [];
        $.each(opt.list.find('li.group'), function(i, group) {
            allNames.push($(group).find('.groupName').val());
        });
        return (allNames.indexOf(opt.addGroupForm.find('input[name=name]').val()) === -1);
    }

    function bindAddGroupForm()
    {
        opt.addGroupForm.on('submit', function(e){
            e.preventDefault();
            $(this).find('input[name=name]').removeClass('is-invalid');
            if (validateAddGroupForm()) {
                let name = $(this).find('input[name=name]').val();
                let group = opt.list.find('li').first().clone();
                group.find('.name').html('Group '+name);
                group.find('.groupId').remove();
                group.find('.groupName').val(name);
                group.find('.js-delete').removeClass('d-none');
                group.find('.group-fields').html('');
                opt.list.append(group);
                makeSortable();
                $(this).find('input[name=name]').val('');
                opt.form.find('input[type=submit]').removeClass('disabled');
            } else {
                $(this).find('input[name=name]').addClass('is-invalid');
            }
        });
    }

	function bindSave()
	{
		opt.form.on('submit', function(e){
			e.preventDefault();
            let groupWeight = 0;
            let data = $(this).serializeObject();
            data.groups = [];
            $.each(opt.list.find('.group'), function(i, group){
                let datagroup = {
                    name: $(group).find('.groupName').val(),
                    weight: groupWeight,
                    models: []
                };
                if ($(group).find('.groupId').length) {
                    datagroup.id = $(group).find('.groupId').val();
                }
                groupWeight++;
                let weight = 0;
                $.each($(group).find('li'), function(i, field){
                    let datamodel = {
                        id: $(field).find('.id').val(),
                        weight: weight,
                        options: $(field).find('.options').val(),
                        widget: $(field).find('select').val()
                    };
                    datagroup.models.push(datamodel);
                    weight++;
                });
                data.groups.push(datagroup);
            });
            $(this).data('class-instance').submitAjax(data);
		});
	};

    function bindDeleteGroup()
    {
        opt.list.on('click', '.js-delete', function(e){
            e.preventDefault();
            let group = $(this).closest('.group');
            if (group.find('ul li').length == 0) {
                group.remove();
                opt.form.find('input[type=submit]').removeClass('disabled');
            }
        });
    }

    function bindChangeWidget()
    {
        opt.widgets.change(function(){
            let item = $(this).closest('.row');
            let field = $(this).val();
            AdminTheme.performAjaxCall(item, {}, FormLayout.viewOptionsUri(field)).done(function(data){
                updateOptions(item, data);
            });
        });
    }

	return {
		init:init
	};

})();

export default FieldLayout;