var Dom = (function () {
    var imgEls = {},
        ctx = {};

    return {
        init: function () {
            var self = this;

            self.sideMenu = document.getElementById('side-menu-container');
            self.contentWindow = document.getElementById('content-window');
            self.categoryList = document.getElementById('select-category');
            self.showItems = document.getElementById('show-items-container');
            self.itemInfo = document.getElementById('item-info');
            self.homeContent = document.getElementById('home-content');
            self.account = document.getElementById('account');
            self.width = document.body.clientWidth;
            self.dataUpdateLoader = document.getElementById('data-update-loader');
            self.scroller = document.getElementById('scroller');
            self.backButton = document.getElementById('back-button');
            self.body = document.body;
            self.wrapper = document.getElementById('wrapper');
            self.clearCartBtn = document.getElementById('clear-cart-btn');

            if (window.defaultScroll) {
                self.scroller.classList.add('default-scroll');
            }

            self.sideMenu.addEventListener('click', function (e) {
                PEMenu.menuAction(e);
            });

            self.categoryList.addEventListener('click', function (e) {
                PEMenu.showItems(e);
            });

            self.showItems.addEventListener('click', function (e) {
                PEMenu.showItemInfo(e);
            });

            self.backButton.addEventListener('click', function (e) {
                Router.goBack();
            });
        },
        hideSplash: function () {
            document.getElementById('splash').style.display = 'none';
            document.getElementById('content').style.display = 'block';
        },
        showBackButton: function () {
            Dom.backButton.style.display = 'inline-block';
        },
        hideBackButton: function () {
            Dom.backButton.style.display = 'none';
        },
        itemInfoTemplate: (function () {
            jQuery.get('templates/item-info.html', function (html) {
                Dom.itemInfoTemplate = _.template(html);
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
        menuItemTemplate: (function () {
            var item = document.createElement('div'),
                icon = document.createElement('i'),
                name = document.createElement('span');
            item.classList.add('menu-item');
            icon.classList.add('menu-icon');
            item.appendChild(icon);
            item.appendChild(name);
            return item;
        })(),
        clone: function (el, type, params) {
            var newEl = el.cloneNode(el),
                nodes = newEl.childNodes;
            switch (type) {
                case 'menu-item':
                    if (typeof params.close === 'undefined') {
                        params.close = true;
                    }
                    newEl.setAttribute('close', params.close);
                    newEl.setAttribute('action', params.action);
                    nodes[0].classList.add(params.i);
                    nodes[1].innerHTML = params.string;
                    break;
            }
            return newEl;
        },
        loadMenu: function (items) {
            var self = this;
            var container = document.createElement('div');
            for (var i = 0, l = items.length; i < l; i++) {
                container.appendChild(self.clone(self.menuItemTemplate, 'menu-item', items[i]));
            }
            if (self.sideMenu.firstChild) {
                self.sideMenu.removeChild(self.sideMenu.firstChild);
            }
            self.sideMenu.appendChild(container);
        },
        generateCategories: function (items) {
            var self = this,
                container = document.createElement('div');

            container.innerHTML = self.categoryTemplate({'items': items});

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
        drawImages: function () {
            var canvasEls = document.getElementsByTagName('canvas'),
                canvasId,
                course,
                draw = function (course) {
                    var height,
                        width,
                        x,
                        y;
                    if (imgEls[course].width > imgEls[course].height) {
                        height = 70;
                        y = 0;
                        width = 70 / imgEls[course].height * imgEls[course].width;
                        width = width - width % 1;
                        x = (width - 70) / 2;
                        x = x - x % 1;
                    } else {
                        width = 70;
                        x = 0;
                        height = 70 / imgEls[course].width * imgEls[course].height;
                        height = height - height % 1;
                        y = (width - 70) / 2;
                        y = y - y % 1;
                    }
                    ctx[course].drawImage(imgEls[course], -x, -y, width, height);
                };
            for (var i = 0, l = canvasEls.length; i < l; i++) {
                canvasId = canvasEls[i].attributes.id.value;
                canvasEls[i].width = 70;
                canvasEls[i].height = 70;
                course = canvasId.replace('canvas-', '');
                if (PEMenu.itemList[PEMenu.itemObjectIds[course]].img) {
                    if (!imgEls[course]) {
                        imgEls[course] = imgEls[course] || new Image();
                        imgEls[course].src = PEMenu.itemList[PEMenu.itemObjectIds[course]].imgHybrid || PEMenu.itemList[PEMenu.itemObjectIds[course]].img;
                        ctx[course] = canvasEls[i].getContext('2d');
                        (function (course) {
                            imgEls[course].onload = function () {
                                draw(course);
                            }
                        })(course);
                    } else {
                        ctx[course] = canvasEls[i].getContext('2d');
                        draw(course);
                    }

                }
            }
        }
    }
})();