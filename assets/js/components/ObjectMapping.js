import FieldGroup from '../classes/FieldGroup';
import Form from '../classes/Form';
import Field from '../classes/Field';
import UploadMediaGroup from '../classes/UploadMediaGroup';
import DatetimeGroup from '../classes/DatetimeGroup';
import MainMenuGroup from '../classes/MainMenuGroup';

class ObjectMapping {

    constructor ()
    {
        Logger.log('[Admin Theme] Object Mapping initialized');
        this.mapping = {
            '.main-menu .list-group': MainMenuGroup, 
            '.field-group-uploadmedia': UploadMediaGroup,
            '.field-group-datetime,.field-group-time': DatetimeGroup,
            '.field-group' : FieldGroup,
            '.field-wrapper': Field,
            'form' : Form
        };
        this.bind($('body'));
    };

    bind(element)
    {
        let object;
        let _this = this;
        for (let key in this.mapping) {
            $.each(element.find(key).addBack(key), function(i, element){
                if (typeof $(element).data('class-instance') == 'undefined') {
                    object = new _this.mapping[key]($(element));
                    $(element).data('class-instance', object);
                }
            });
        }
    }

    add(name, object)
    {
        this.mapping[name] = object;
    }

};

export default ObjectMapping;