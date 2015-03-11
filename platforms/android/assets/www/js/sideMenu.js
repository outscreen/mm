var SideMenu = {
    isOpen: false
};

SideMenu.toggleMenu = function (open) {
    var self = this;
    try {
        //Dom.contentWindow.style['-webkit-transition-duration'] = 200 + 'ms';
        Dom.body.style['-webkit-transition-duration'] = 200 + 'ms';
        if (self.isOpen && open !== true) {
            Dom.body.style['-webkit-transform'] = 'translateX(0px)';
            //Dom.contentWindow.style['-webkit-transform'] = 'translate3d(0px, 0px, 0px)';
            self.isOpen = false;
        } else if (!self.isOpen && open !== false) {
            Dom.body.style['-webkit-transform'] = 'translateX(275px)';
            //Dom.contentWindow.style['-webkit-transform'] = 'translate3d(275px, 0px, 0px)';
            self.isOpen = true;
        }
    } catch (err) {
        console.log(err);
    }
};

SideMenu.cancelToggleMenu = function () {
    var self = this;
    Dom.contentWindow.style['-webkit-transition-duration'] = 200 + 'ms';
    if (!self.isOpen) {
        Dom.body.style['-webkit-transform'] = 'translateX(0px)';
        //Dom.contentWindow.style['-webkit-transform'] = 'translate3d(0px, 0px, 0px)';
    } else {
        Dom.body.style['-webkit-transform'] = 'translateX(275px)';
        //Dom.contentWindow.style['-webkit-transform'] = 'translate3d(275px, 0px, 0px)';
    }
};

SideMenu.init = function () {
    var items = [];

    items.push({
        i: 'ion-home',
        string: "О нас",
        action: 'home'
    });

    for (var i = 0, l = PEMenu.parentCategories.length; i < l; i++) {
        if (!PEMenu.parentCategories[i].isHidden) {
            items.push({
                i: 'icon',
                string: PEMenu.parentCategories[i].name,
                action: PEMenu.parentCategories[i].objectId
            });
        }
    }


    Dom.loadMenu(items);
};