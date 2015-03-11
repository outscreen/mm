var PEMenu = {};

PEMenu.init = function () {
        Dom.init();
        StateController.handleCurrentState();
        UpdateData();
};

PEMenu.menuAction = function (e) {
    var self = this;
    try {
        var action = findAction(e.target).action;
        if (!action) {
            return;
        }
        switch (action) {
            case 'home':
                Router.go('home');
                break;
            default:
                if (!Object.keys(self.menu[action].items).length) {
                    self.selectedMenu = action;
                    Router.go('select-category')
                } else {
                    self.selectedMenu = null;
                    self.selectedCategory = action;
                    Router.go('show-items');
                }
        }
        SideMenu.toggleMenu(false);
    } catch (err) {
        console.log(err);
    }
};

PEMenu.showItems = function (e) {
    var self = this,
        action = findAction(e.target).action;
    if (!action) {
        return;
    }
    self.selectedCategory = action;
    switch (action) {
        default:
            Router.go('show-items');
    }
    return;
};

PEMenu.showItemInfo = function (e) {
    var self = this,
        action = findAction(e.target);
    if (!action) {
        return;
    }
    action = action.action;
    self.selectedItem = action;
    if (e.target.attributes && e.target.attributes.isCart) {
        Cart.toggle(action, e.target.attributes.type.value);
        return;
    }
    Router.go('item-info');
    return;
};