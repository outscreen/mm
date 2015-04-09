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
            var Gesture = new Hammer(Dom.wrapper);
            Gesture.on('swipe', function (event) {
                switch (event.direction) {
                    case 4:
                        swipeRight();
                        break;
                    case 2:
                        swipeLeft();
                        break;
                }

                function swipeRight() {
                    switch (Router.state) {
                        //show info about previous item
                        case 'item-info':
                            PEMenu.showPreviousItem();
                            break;
                    }
                }

                function swipeLeft() {
                    switch (Router.state) {
                        //show info about next item
                        case 'item-info':
                            PEMenu.showNextItem();
                            break;
                    }
                }
            });
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
        toggleCart: function (e) {
            var self = this;
            tryToToggleCart(e, self.selectedItem);
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

