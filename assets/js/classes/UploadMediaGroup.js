import FieldGroup from './FieldGroup';

class UploadMediaGroup extends FieldGroup
{
    cloneElement () {
        let clone = super.cloneElement();
        clone.find('img').remove();
        return clone;
    }
}

export default UploadMediaGroup;