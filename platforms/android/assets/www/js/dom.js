var Dom = (function () {
    var clickEvent;

    return {
        init: function () {
            var self = this;

            clickEvent = isHybrid ? 'click' : 'click';

            self.sideMenu = document.getElementById('side-menu-container');
            self.contentWindow = document.getElementById('content-window');
            self.categoryList = document.getElementById('select-category');
            self.showItems = document.getElementById('show-items-container');
            self.itemInfo = document.getElementById('item-info');
            self.itemImg = document.getElementById('item-img');
            self.homeContent = document.getElementById('home-content');
            self.account = document.getElementById('account');
            self.width = document.body.clientWidth;
            self.height = document.body.clientHeight - 88;
            self.halfWidth = Math.floor(document.body.clientWidth / 2);
            self.dataUpdateLoader = document.getElementById('data-update-loader');
            self.scroller = document.getElementById('scroller');
            self.backButton = document.getElementById('back-button');
            self.body = document.body;
            self.wrapper = document.getElementById('wrapper');
            self.cartInfo = document.getElementById('cart-info');
            self.categoryInfo = document.getElementById('category-description');

            if (window.defaultScroll) {
                self.scroller.classList.add('default-scroll');
            }

            self.sideMenu.addEventListener(clickEvent, function (e) {
                PEMenu.menuAction(e);
            }, false);

            self.categoryList.addEventListener(clickEvent, function (e) {
                PEMenu.selectCategory(e);
            }, false);

            self.showItems.addEventListener(clickEvent, function (e) {
                PEMenu.showItemInfo(e);
            }, false);

            self.backButton.addEventListener(clickEvent, function (e) {
                Router.goBack();
            }, false);

            self.itemInfo.addEventListener(clickEvent, function (e) {
                PEMenu.clickOnItemInfo(e);
            }, false);
        },
        hideSplash: function () {
            document.getElementById('splash').style.display = 'none';
            document.getElementById('content').style.display = 'block';
        },
        showBackButton: function () {
            Dom.backButton.style.visibility = 'visible';
        },
        hideArrows: function () {
            $("[name = arrow]").css('display', 'none');
        },
        showArrows: function () {
            $("[name = arrow]").css('display', 'table-cell');
        },
        hideBackButton: function () {
            Dom.backButton.style.visibility = 'hidden';
        },
        itemInfoTemplate: (function () {
            jQuery.get('templates/item-info.html', function (html) {
                Dom.itemInfoTemplate = _.template(html);
            });
        })(),
        itemImgTemplate: (function () {
            jQuery.get('templates/item-img.html', function (html) {
                Dom.itemImgTemplate = _.template(html);
            });
        })(),
        courseTemplate: (function () {
            jQuery.get('templates/course-list.html', function (html) {
                Dom.courseTemplate = _.template(html);
            });
        })(),
        categoryTemplate: (function () {
            jQuery.get('templates/category.html', function (html) {
                Dom.categoryTemplate = _.template(html);
            });
        })(),
        parentCategoryTemplate: (function () {
            jQuery.get('templates/parent-category.html', function (html) {
                Dom.parentCategoryTemplate = _.template(html);
            });
        })(),
        categoryInfoTemplate: (function () {
            jQuery.get('templates/category-info.html', function (html) {
                Dom.categoryInfoTemplate = _.template(html);
            });
        })(),
        generateCategories: function (items, isParent) {
            var self = this,
                container = document.createElement('div');

            if (isParent) {
                container.innerHTML = self.parentCategoryTemplate({'items': items});
            } else {
                container.innerHTML = self.categoryTemplate({'items': items});
            }

            return container;
        },
        reloadCategories: function (html) {
            var self = this;
            if (self.categoryList.firstChild) {
                self.categoryList.removeChild(self.categoryList.firstChild);
            }
            self.categoryList.appendChild(html);
        },
        generateItems: function (items) {
            var self = this;
            var container = document.createElement('div');
            container.innerHTML = self.courseTemplate({'items': items});
            return container;
        },
        reloadItems: function (html) {
            var self = this;
            if (self.showItems.firstChild) {
                self.showItems.removeChild(self.showItems.firstChild);
            }
            self.showItems.appendChild(html);
        },
        reloadItemInfo: function (params) {
            var self = this,
                container = document.createElement('div');
            if (self.itemInfo.firstChild) {
                self.itemInfo.removeChild(self.itemInfo.firstChild);
            }
            container.innerHTML = self.itemInfoTemplate({item: params});
            self.itemInfo.appendChild(container);
        },
        reloadCategoryInfo: function (params) {
            var self = this,
                container = document.createElement('div');
            if (self.categoryInfo.firstChild) {
                self.categoryInfo.removeChild(self.categoryInfo.firstChild);
            }
            container.innerHTML = self.categoryInfoTemplate({item: params});
            self.categoryInfo.appendChild(container);
        },
        reloadItemImg: function (params) {
            var self = this,
                container = document.createElement('div');
            if (self.itemImg.firstChild) {
                self.itemImg.removeChild(self.itemImg.firstChild);
            }
            container.innerHTML = self.itemImgTemplate({item: params});
            self.itemImg.appendChild(container);
        }
    }
})();