var Cart = (function () {
    var addOne = function (item) {
            amounts[item.objectId] = amounts[item.objectId] || 0;
            amounts[item.objectId]++;
            price += parseInt(item.price);
            cart[item.objectId] = item;
            $("[name = cart-" + item.objectId + "]").addClass('ion-ios-cart').addClass('active').removeClass('ion-ios-cart-outline');
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
            $("[name = cart-" + item.objectId + "]").addClass('ion-ios-cart-outline').removeClass('ion-ios-cart').removeClass('active');
        },
        cart = {},
        amounts = {},
        price = 0;
    return {
        toggle: function (id, type) {
            var item = PEMenu.itemList[PEMenu.itemObjectIds[id]];
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
            $("[name = cart-amount-" + item.objectId + "]").html(amounts[item.objectId] || '');
            document.getElementById('cart-sum').innerHTML = price;
            Router.cacheData();
        },
        goTo: function () {
            Router.go('cart', 'cart');
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
            if (window.location.hash === '#cart') {
                Router.go('cart');
                return;
            }
        }
    }
})();