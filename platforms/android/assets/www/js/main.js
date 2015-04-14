var PEMenu = (function () {

    function tryToToggleCart(e, action) {
        if (e.target.attributes && e.target.attributes.iscart) {
            Cart.toggle(action, e.target.attributes.type.value);
            return true;
        }
    }

    function tryToScale (e) {
        if (e.target.attributes && e.target.attributes.scale) {
            console.log('go to scaled');
            return true;
        }
    }

    return {
        init: function () {
            Dom.init();
            Gestures.init();
            StateController.handleCurrentState();
            UpdateData();
        },
        menuAction: function (e) {
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
        },
        showItems: function (e) {
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
        },
        showItemInfo: function (e) {
            var self = this,
                action = findAction(e.target);
            if (!action) {
                return;
            }
            action = action.action;
            self.selectedItem = action;
            if (tryToToggleCart(e, action)) {
                return;
            }
            Router.go('item-info');
        },
        clickOnItemInfo: function (e) {
            var self = this;
            if (tryToToggleCart(e, self.selectedItem)) {
                return;
            }
            tryToScale(e);
        },
        showNextItem: function () {
            var self = this;
            if (!self.nextItem) {
                return;
            }
            self.selectedItem = self.nextItem;
            Router.go('item-info');
        },
        showPreviousItem: function () {
            var self = this;
            if (!self.previousItem) {
                return;
            }
            self.selectedItem = self.previousItem;
            Router.go('item-info');
        }
    }
})();

