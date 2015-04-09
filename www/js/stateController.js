var StateController = {
    handleCurrentState: function (from, to, isBack) {
        var items = [],
            html;
        switch (to) {
            case '#select-category':
                var action = PEMenu.selectedMenu;
                if (!action) {
                    SideMenu.toggleMenu();
                    return;
                }
                html = Router.getCache();
                if (!html) {
                    var childCategories = [];
                    for (var index in PEMenu.menu[action]) {
                        if (index !== 'items' && Object.keys(PEMenu.menu[action][index].items).length)
                            childCategories.push(PEMenu.categories[PEMenu.categoryList[index]]);
                    }
                    for (var i = 0, l = childCategories.length; i < l; i++) {
                        items.push({
                            string: childCategories[i].name,
                            action: childCategories[i].objectId,
                            imgUrl: childCategories[i].imgUrl
                        });
                    }
                    html = Dom.generateCategories(items);
                    Router.cacheData(html);
                }
                Dom.showItems.style.display = 'none';
                Dom.categoryList.style.display = 'block';
                Dom.itemInfo.style.display = 'none';
                Dom.homeContent.style.display = 'none';
                Dom.cartInfo.style.display = 'none';
                Dom.account.style.display = 'none';
                Dom.showBackButton();
                Dom.reloadCategories(html);

                if (window.isBack && PEMenu.selectedCategory) {
                    var activeEl = document.getElementById('category-' + PEMenu.selectedCategory);
                    if (activeEl) {
                        activeEl.scrollIntoView();
                    }
                }
                break;

            case '#show-items':
            case '#cart':
                var action = window.location.hash === '#cart' ? 'cart' : PEMenu.selectedCategory,
                    buildHtml = function (showItems) {
                        for (var i in showItems) {
                            items.push(showItems[i]);
                        }
                        html = Dom.generateItems(items);
                    };

                if (!action) {
                    Router.go('home');
                    return;
                }

                if (action === 'cart') {
                    buildHtml(Cart.getCart());
                    Dom.cartInfo.style.display = 'block';
                } else {
                    html = Router.getCache();
                    if (!html) {
                        var showItems,
                            parentCatId;
                        if (PEMenu.menu[action]) {
                            showItems = PEMenu.menu[action].items;
                        } else {
                            parentCatId = PEMenu.categories[PEMenu.categoryList[action]].parentCategory;
                            showItems = PEMenu.menu[parentCatId][action].items;
                        }
                        buildHtml(showItems);
                        Router.cacheData(html);
                    }
                    Dom.cartInfo.style.display = 'none';
                }

                Dom.showItems.style.display = 'block';
                Dom.categoryList.style.display = 'none';
                Dom.itemInfo.style.display = 'none';
                Dom.homeContent.style.display = 'none';
                Dom.account.style.display = 'none';
                Dom.showBackButton();
                Dom.reloadItems(html);

                if (window.isBack && PEMenu.selectedItem) {
                    var activeEl = document.getElementById('course-' + PEMenu.selectedItem);
                    if (activeEl) {
                        activeEl.scrollIntoView();
                    }
                }

                setTimeout(Dom.drawImages, 100);

                break;

            case '#item-info':
                var action = PEMenu.selectedItem;
                if (!action) {
                    Router.go('home');
                    return;
                }
                var item = PEMenu.itemList[PEMenu.itemObjectIds[action]];
                //previous item in the list or the last one
                PEMenu.previousItem = PEMenu.itemList[PEMenu.itemObjectIds[action] - 1] || PEMenu.itemList[PEMenu.itemList.length -1];
                PEMenu.previousItem = PEMenu.previousItem.objectId;
                //next item in the list or the first one
                PEMenu.nextItem = PEMenu.itemList[PEMenu.itemObjectIds[action] + 1] || PEMenu.itemList[0];
                PEMenu.nextItem = PEMenu.nextItem.objectId;
                Dom.showItems.style.display = 'none';
                Dom.categoryList.style.display = 'none';
                Dom.itemInfo.style.display = 'block';
                Dom.homeContent.style.display = 'none';
                Dom.cartInfo.style.display = 'none';
                Dom.account.style.display = 'none';
                Dom.showBackButton();
                Dom.reloadItemInfo(item);
                break;

            case '#home':
                Dom.showItems.style.display = 'none';
                Dom.categoryList.style.display = 'none';
                Dom.itemInfo.style.display = 'none';
                Dom.homeContent.style.display = 'block';
                Dom.cartInfo.style.display = 'none';
                Dom.account.style.display = 'none';
                Dom.hideBackButton();
                break;

            default:
                Router.go('home');
        }
        if (!window.isBack) {
            myScroll.reload();
        }
    }
};