var PEMenu = (function () {

    function tryToToggleCart (e, action) {
        if (e.target.attributes && e.target.attributes.isCart) {
            Cart.toggle(action, e.target.attributes.type.value);
            return true;
        }
    }

    return {
        init: function () {
            Dom.init();
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
                return
            }
            Router.go('item-info');
        },
        toggleCart: function (e) {
            var self = this;
            tryToToggleCart(e, self.selectedItem);
        }
    }
})();

