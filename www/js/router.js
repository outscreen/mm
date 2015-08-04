var Router = (function () {
    var history = [],
        displayedCategory;

    return {
        state: null,
        go: function (where, action, isBack) {
            if (!isBack && !~['item-info', 'item-img'].indexOf(where)) {
                history.push({where: where, action: action});
            }

            window.isBack = isBack;
            //if state is the same, handle it forcefully
            if (window.location.hash === ('#' + where + '?action=' + action)) {
                StateController.handleCurrentState(null, where, action);
            }
            Router.state = {where: where, action: action};

            if (where === 'show-items') {
                displayedCategory = action;
            }
            window.location.hash = '#' + where + '?action=' + action;
        },
        goBack: function () {
            var self = this,
                previousState = history[history.length - 2],
                latestState = history[history.length - 1];
            switch (self.state.where) {
                case 'select-category':
                    if (PEMenu.selectedCategory === 'parent') {
                        exitApp();
                        return;
                    }
                case 'category-description':
                case 'show-items':
                case 'cart':
                    self.go(previousState.where, previousState.action, true);
                    history.pop();
                    break;
                case 'item-info':
                    self.go(latestState.where, latestState.action, true);
                    break;
                case 'item-img':
                    self.go('item-info', self.state.action, true);
                    break;
                /*case '#cart':
                    self.go('show-items');
                    break;*/
                case 'home':
                    exitApp();
                    break;
            }

        },
        goToRestaurant: function () {
            this.go('select-category', PEMenu.selectedRestaurant || 'parent');
        }
    }
})();
