var PEMenu = (function () {

    function tryToToggleCart(e, action) {
        if (e.target.attributes && e.target.attributes.iscart) {
            Cart.toggle(action, e.target.attributes.type.value);
            return true;
        }
    }

    function scale (scale) {
        $('#scale-container').css('max-height', $('#scale-container')[0].clientHeight);
        $('#scale').css('max-width', '');
        $('#scale').css('height', Math.floor($('#scale')[0].height * scale));
        $('#scale').css('width', Math.floor($('#scale')[0].width * scale));
    }

    window.scale = scale;

    function tryToScale (e) {
        if (e.target.attributes && e.target.attributes.scale) {
            switch (e.target.attributes.type.value) {
                case 'plus':
                    scale(scaleInterval);
                    break;
                case 'minus':
                    scale(1 / scaleInterval);
                    break;
            }
            return true;
        }
    }

    return {
        startScale: 1,
        startX: 0,
        startY: 0,
        panStarted: 0,
        panEnded: 0,
        init: function () {
            Dom.init();
            StateController.handleCurrentState();
            UpdateData();

            var Gesture = new Hammer(Dom.wrapper),
                scale = 2;

            Gesture.on('swipe', function (event) {
                console.log(event);
                if (event.target && event.target.attributes && event.target.attributes.id &&
                    event.target.attributes.id.nodeValue === 'scale' && scale > 1) {
                    return;
                }
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

            //Gesture.get('pinch').set({enable: true});


            Gesture.on('pinch', function (event) {
                switch (Router.state) {
                    //show info about next item
                    case 'item-info':
                        scale = (1 + ((event.scale - 1) / 2)) * PEMenu.startScale;
                        scale = scale < 1 ? 1 : scale;
                        $('#scale').css('height', Math.floor($('#scale')[0].height * scale));
                        $('#scale').css('width', Math.floor($('#scale')[0].width * scale));
                        //$('#scale').css('transform', 'scale(' + scale + ')');
                        PEMenu.temp = Hammer($('#scale')[0]);

                        var maximumX = Math.floor(($('#scale')[0].width * scale - $('#scale')[0].width) / scale / 2),
                            maximumY = Math.floor(($('#scale')[0].height * scale - $('#scale')[0].height) / scale / 2),
                            x = 1,
                            y = 1;
                        PEMenu.temp.on('pan', function (event) {
                            PEMenu.panStarted++;
                            var maximumX = Math.floor(($('#scale')[0].width * scale - $('#scale')[0].width) / scale / 2),
                                maximumY = Math.floor(($('#scale')[0].height * scale - $('#scale')[0].height) / scale / 2);
                            x = Math.floor(event.deltaX / 2);
                            y = Math.floor(event.deltaY / 2);
                            x += PEMenu.startX;
                            y += PEMenu.startY;
                            if (x > maximumX) {
                                x = maximumX;
                            }
                            if (x < -maximumX) {
                                x = -maximumX;
                            }
                            if (y > maximumY) {
                                y = maximumY;
                            }
                            if (y < -maximumY) {
                                y = -maximumY;
                            }
                            console.log(x, y)
                            $('#scale').css('transform', 'scale(' + scale + ') translateX(' + x + 'px) translateY(' + y + 'px)');
                        });
                        PEMenu.temp.on('panend', function () {
                            if (!PEMenu.panEnded) {
                                setTimeout(function () {
                                    PEMenu.startX = x;
                                    PEMenu.startY = y;
                                    PEMenu.panEnding = false;
                                }, 1000)
                            }
                            PEMenu.panEnding = true;
                        });
                        break;
                }
            });

            Gesture.on('pinchend', function (event) {
                switch (Router.state) {
                    //show info about next item
                    case 'item-info':
                        PEMenu.startScale = scale;
                        break;
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
        clickOnInfo: function (e) {
            var self = this;
            if (tryToToggleCart(e, self.selectedItem)) {
                return;
            }
            tryToScale(e)
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

