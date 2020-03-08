import datetimepicker from 'tempusdominus-bootstrap-4';
import dashify from 'dashify';

class Field {

    constructor (element) 
    {
        this.element = element;
        this.initDatetimePickers();
        this.initHideCardinality();
        this.initSelects();
        this.initDashify();
    }

    initDashify()
    {
        let elem = this.element.find('input.js-dashify');
        if(elem.length) {
            let source = elem.closest('form').find('input[name='+elem.data('dashifyfrom')+']');
            if(!source.length) { return;
            }
            source.blur(
                function () {
                    if(elem.val()) { return;
                    }
                    elem.val(dashify(source.val()));
                }
            );
        }
    }

    initDatetimePickers ()
    {
        $.each(this.element.find('input.field-datetime'), function(i, item){
            $(item).parent().datetimepicker({
                format: $(item).parent().data('format'),
                allowInputToggle: true,
                sideBySide: true,
                buttons: {
                    showToday: false,
                    showClear: false,
                    showClose: false
                }
            });
        });
    }

    initHideCardinality ()
    {
        if (this.element.hasClass('field-wrapper-cardinality')) {
            let _this = this;
            this.element.closest('form').find('select[name=_cardinality_select]').change(function(){
                if ($(this).val() == -1) {
                    _this.element.find('input').val(-1);
                    _this.element.addClass('d-none');
                }
                else{
                    _this.element.find('input').val(1);
                    _this.element.removeClass('d-none');
                }
            });
        }
    }

    initSelects()
    {
        this.element.find('select').chosen();
    }
}

export default Field;