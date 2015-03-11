var Router = (function () {
    var cache = {
            categories: {},
            items: {}
        },
        history = [];

    return {
        state: null,
        go: function (where, isBack) {
            history.push(window.location.hash);
            window.isBack = isBack;
            //if state is the same, handle it forcefully
            if (window.location.hash === ('#' + where)) {
                StateController.handleCurrentState(window.location.hash, window.location.hash);
                return;
            }
            window.location.hash = where;
        },
        getCache: function () {
            if (window.updateInProgress) {
                return;
            }
            switch (window.location.hash) {
                case '#select-category':
                    return cache.categories[PEMenu.selectedMenu];
                case '#show-items':
                    return cache.items[PEMenu.selectedCategory];
            }
        },
        cacheData: function (data) {
            if (window.updateInProgress) {
                return;
            }
            switch (window.location.hash) {
                case '#select-category':
                    cache.categories[PEMenu.selectedMenu] = data;
                    break;
                case '#show-items':
                    cache.items[PEMenu.selectedCategory] = data;
                    break;
            }
        },
        clearCache: function () {
            cache = {
                categories: {},
                items: {}
            }
        },
        goBack: function () {
            var self = this;
            switch (window.location.hash) {
                case '#select-category':
                    self.go('home', true);
                    break;
                case '#show-items':
                    self.go('select-category', true);
                    break;
                case '#item-info':
                    if (history[history.length - 1] === '#cart') {
                        self.go('cart', true);
                    } else {
                        self.go('show-items', true);
                    }
                    break;
                case '#cart':
                    self.go('show-items', true);
                    break;
                case '#home':
                    exitApp();
                    break;
            }
            history.pop();
        }
    }
})();
