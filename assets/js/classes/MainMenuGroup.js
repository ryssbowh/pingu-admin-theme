
class MainMenuGroup
{
    constructor(element)
    {
        this.element = element;
        this.bindCollapse();
    }

    bindCollapse()
    {
        let _this = this;
        this.element.on('show.bs.collapse hide.bs.collapse', function(){
            _this.element.prev().find('i').toggleClass('rotated');
        });
    }
}

export default MainMenuGroup;