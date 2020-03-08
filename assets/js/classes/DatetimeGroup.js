import FieldGroup from './FieldGroup';

class DatetimeGroup extends FieldGroup
{
    cloneElement () {
        let clone = super.cloneElement();
        let index = this.getIndex(clone);
        let id = clone.find(">:first-child").attr('id').rtrim(index-1) + index;
        clone.find('.input-group').attr('id', id);
        clone.find('input').data('target', '#'+id).val('');
        clone.find('.input-group-append').data('target', '#'+id);
        return clone;
    }
}

export default DatetimeGroup;