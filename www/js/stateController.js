var StateController = (function () {
    var components,
        componentsLength,
        hideAll = function () {
            for (var i = 0; i < componentsLength; i++) {
                components[i].style.display = 'none';
            }
        },
        arrows = ['#item-info', '#item-img'],
        findPreviousAndNextItems = function (action) {
            for (var i = 0, l = PEMenu.showItemsArr.length; i < l; i++) {
                if (PEMenu.showItemsArr[i].objectId === action) {
                    //previous item in the list or the last one
                    PEMenu.previousItem = PEMenu.showItemsArr[i - 1] || PEMenu.showItemsArr[l - 1];
                    PEMenu.previousItem = PEMenu.previousItem.objectId;
                    //next item in the list or the first one
                    PEMenu.nextItem = PEMenu.showItemsArr[i + 1] || PEMenu.showItemsArr[0];
                    PEMenu.nextItem = PEMenu.nextItem.objectId;
                }
            }
        };
    return {
        init: function () {
            components = [Dom.showItems, Dom.categoryList, Dom.itemInfo, Dom.homeContent, Dom.cartInfo, Dom.account, Dom.itemImg];
            componentsLength = components.length;
        },
        handleCurrentState: function (from, to, action) {
            var items = [],
                html;
            switch (to) {
                case 'select-category':
                    var category;
                    if (!action) {
                        SideMenu.toggleMenu();
                        return;
                    }
                    var childCategories = [];
                    if (action === 'parent') {
                        childCategories = PEMenu.parentCategories;
                    } else {
                        category = PEMenu.categories[PEMenu.categoryList[action]];
                        childCategories = category.childCategories;
                    }
                    for (var i = 0, l = childCategories.length; i < l; i++) {
                        items.push({
                            string: childCategories[i].name,
                            action: childCategories[i].objectId,
                            imgUrl: childCategories[i].imgUrl
                        });
                    }
                    html = Dom.generateCategories(items);
                    hideAll();
                    Dom.categoryList.style.display = 'block';
                    Dom.showBackButton();
                    Dom.reloadCategories(html);

                    if (window.isBack && PEMenu.selectedCategory) {
                        var activeEl = document.getElementById('category-' + PEMenu.selectedCategory);
                        if (activeEl) {
                            activeEl.scrollIntoView();
                        }
                    }
                    break;

                case 'category-description':
                    if (!action) {
                        Router.go('home');
                        return;
                    }
                    var category = PEMenu.categories[PEMenu.categoryList[action]];

                    hideAll();
                    Dom.categoryInfo.style.display = 'block';
                    Dom.showBackButton();
                    Dom.reloadCategoryInfo(category);
                    break;
                    break;

                case 'show-items':
                case 'cart':
                    var buildHtml = function (items) {
                            html = Dom.generateItems(items);
                        };

                    if (!action) {
                        Router.go('home');
                        return;
                    }

                    hideAll();

                    if (action === 'cart') {
                        buildHtml(Cart.getCart());
                        Dom.cartInfo.style.display = 'block';
                    } else {
                        var category = PEMenu.categories[PEMenu.categoryList[action]];
                        PEMenu.showItemsArr = category.items;
                        buildHtml(PEMenu.showItemsArr);
                    }

                    Dom.showItems.style.display = 'block';
                    Dom.showBackButton();
                    Dom.reloadItems(html);

                    /*if (window.isBack && PEMenu.selectedItem) {
                        var activeEl = document.getElementById('course-' + PEMenu.selectedItem);
                        if (activeEl) {
                            activeEl.scrollIntoView();
                        }
                    }*/

                    break;

                case 'item-info':
                    var action = PEMenu.selectedItem;
                    if (!action) {
                        Router.go('home');
                        return;
                    }
                    var item = PEMenu.itemList[PEMenu.itemObjectIds[action]];

                    findPreviousAndNextItems(action);

                    hideAll();
                    Dom.itemInfo.style.display = 'block';
                    Dom.showBackButton();
                    Dom.reloadItemInfo(item);
                    break;

                case 'item-img':
                    var action = PEMenu.selectedItem;
                    if (!action) {
                        Router.go('home');
                        return;
                    }
                    var item = PEMenu.itemList[PEMenu.itemObjectIds[action]];
                    findPreviousAndNextItems(action);
                    hideAll();
                    Dom.itemImg.style.display = 'block';
                    Dom.showBackButton();
                    Dom.reloadItemImg(item);
                    break;

                case 'home':
                    hideAll();
                    Dom.homeContent.style.display = 'block';
                    Dom.hideBackButton();
                    break;

                default:
                    Router.go('home');
            }
            if (!window.isBack) {
                myScroll.reload();
            }
            if (~arrows.indexOf(to)) {
                Dom.showArrows();
            } else {
                Dom.hideArrows();
            }
        }
    };
})();