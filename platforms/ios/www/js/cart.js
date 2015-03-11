var Cart = (function () {
    var addOne = function (item) {
            amounts[item.objectId] = amounts[item.objectId] || 0;
            amounts[item.objectId]++;
            price += parseInt(item.price);
            cart[item.objectId] = item;
            document.getElementById('cart-' + item.objectId).classList.add('ion-ios-cart');
            document.getElementById('cart-' + item.objectId).classList.add('active');
            document.getElementById('cart-' + item.objectId).classList.remove('ion-ios-cart-outline');
        },
        removeOne = function (item) {
            if (!amounts[item.objectId]) {
                return;
            }
            if (amounts[item.objectId] === 1) {
                removeAll(item);
                return;
            }
            amounts[item.objectId]--;
            price -= item.price;
        },
        removeAll = function (item) {
            price -= item.price * amounts[item.objectId];
            amounts[item.objectId] = 0;
            delete cart[item.objectId];
            if (window.location.hash === '#cart') {
                Router.go('cart');
                return;
            }
            document.getElementById('cart-' + item.objectId).classList.add('ion-ios-cart-outline');
            document.getElementById('cart-' + item.objectId).classList.remove('ion-ios-cart');
            document.getElementById('cart-' + item.objectId).classList.remove('active');
        },
        cart = {},
        amounts = {},
        price = 0;
    return {
        toggle: function (id, type) {
            var item = PEMenu.itemList[PEMenu.itemObjectIds[id]],
                amountEl;
            switch (type) {
                case 'toggle':
                    if (amounts[item.objectId]) {
                        removeAll(item);
                    } else {
                        addOne(item);
                    }
                    break;
                case 'plus':
                    addOne(item);
                    break;
                case 'minus':
                    removeOne(item);
                    break;
            }
            amountEl = document.getElementById('cart-amount-' + item.objectId);
            if (amountEl) {
                amountEl.innerHTML = amounts[item.objectId] || '';
            }
            document.getElementById('cart-sum').innerHTML = price;
            Router.cacheData();
        },
        goTo: function () {
            Router.go('cart');
        },
        getCart: function () {
            return cart;
        },
        getTotal: function () {
            return price;
        },
        getItemAmount: function (itemId) {
            return amounts[itemId] || 0;
        },
        clear: function () {
            for (var i in cart) {
                amounts[i] = 0;
                delete cart[i];
            }
            price = 0;
            document.getElementById('cart-sum').innerHTML = 0;
            Router.clearCache();
            if (window.location.hash === '#cart') {
                Router.go('cart');
                return;
            }
        }
    }
})();