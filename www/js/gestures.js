var Gestures = (function () {
    return {
        startScale: 1,
        startX: 0,
        startY: 0,
        panStarted: 0,
        panEnded: 0,
        init: function () {
            var Gesture = new Hammer(Dom.wrapper),
                scale = 1;

            Gesture.on('swipe', function (event) {
                //enabled swipe on image, testing
                if (false && event.target && event.target.attributes && event.target.attributes.id &&
                    event.target.attributes.id.nodeValue === 'scale') {
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
                        case 'item-img':
                            PEMenu.showNextItem();
                            Router.go('item-img');
                            break;
                    }
                }

                function swipeLeft() {
                    switch (Router.state) {
                        //show info about next item
                        case 'item-info':
                            PEMenu.showNextItem();
                            break;
                        case 'item-img':
                            PEMenu.showNextItem();
                            Router.go('item-img');
                            break;
                    }
                }
            });

            /*Gesture.get('pinch').set({enable: true});


            Gesture.on('pinch', function (event) {
                switch (Router.state) {
                    //show info about next item
                    case 'item-info':
                        scale = (1 + ((event.scale - 1) / 2)) * PEMenu.startScale;
                        scale = scale < 1 ? 1 : scale;
                        $('#scale').css('transform', 'scale(' + scale + ')');
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
                            setTimeout(function () {
                                PEMenu.startX = x;
                                PEMenu.startY = y;
                            }, 1000)
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
            });*/
        }
    }
})();