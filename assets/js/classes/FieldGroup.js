class FieldGroup {

    constructor (element) 
    {
        this.element = element;
        this.elements = this.element.find('.field-wrapper');
        this.cardinality = parseInt(this.element.data('cardinality'));
        this.addLink = this.element.find('.js-add-group-element');
        this.initAddFieldElement();
        this.initRemoveFieldElement(this.elements);
    }

    initRemoveFieldElement(elements)
    {
        this.elements.slice(1).find('.js-remove-group-element').removeClass('d-none');
        let _this = this;
        elements.find('.js-remove-group-element').click(function(e){
            e.preventDefault();
            _this.removeElement($(this).parent());
        });
    }

    initAddFieldElement()
    {
        this.toggleAddFieldLink();
        let _this = this;
        this.addLink.click(function(e){
            e.preventDefault();
            var elem = _this.cloneElement();
            elem.insertAfter(_this.elements.last());
            _this.elements = _this.element.find('.form-element');
            _this.toggleAddFieldLink();
            _this.initRemoveFieldElement(elem);
        });
    }

    toggleAddFieldLink ()
    {
        var count = this.countFieldElements();
        if (count >= this.cardinality && this.cardinality != -1) {
            this.addLink.addClass('d-none');
        } else {
            this.addLink.removeClass('d-none');
        }
    }

    countFieldElements()
    {
        return this.elements.length;
    }

    removeElement (elem)
    {
        elem.remove();
        this.elements = this.element.find('.form-element');
        this.toggleAddFieldLink()
    }

    cloneElement () 
    {
        let elem = this.elements.last().clone();
        var name = elem.find('input').prop('name');
        var number = parseInt(name.match(/\[[0-9]+\]/)[0].match(/[0-9]+/, '')[0]) + 1;
        elem.find('input').prop('name', name.replace(/\[[0-9]+\]/, '['+number+']'));
        elem.find('input').val('');
        elem.find('.js-remove-group-element').removeClass('d-none');
        elem.removeData('field-instance');
        return elem;
    }
}

export default FieldGroup;