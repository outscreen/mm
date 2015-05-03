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

            Router.state = {where: where, action: action};

            if (where === 'show-items') {
                displayedCategory = action;
            }
            window.location.hash = '#' + where + '?action=' + action;
        },
        goBack: function () {
            var self = this,
                previousState = history[history.length - 2];
            switch (self.state.where) {
                case 'select-category':
                    self.go(previousState.where, previousState.action, true);
                    history.pop();
                    break;
                case 'show-items':
                case 'cart':
                    self.go(previousState.where, previousState.action, true);
                    history.pop();
                    break;
                case 'item-info':
                    self.go('show-items', displayedCategory, true);
                    break;
                case 'item-img':
                    self.go('item-info', self.state.action, true);
                    break;
                case 'home':
                    exitApp();
                    break;
            }

        }
    }
})();
