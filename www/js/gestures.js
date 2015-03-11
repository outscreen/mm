var Scroll = {
    startX: null,
    startY: null,
    curX: null,
    curY: null,
    maxXMove: null,
    maxYMove: null,
    scrollY: 0,
    scrollX: 0,
    scrollType: null,
    veryBeginY: null,
    defineSwipeType: function () {
        var self = this;
        if (self.scrollType) {
            return self.scrollType;
        }
        if (Math.abs(self.startX - self.curX) > Math.abs(self.startY - self.curY)) {
            self.scrollType = 'horizontal';
        } else {
            self.scrollType = 'vertical';
        }
    },
    handleSwipeProcess: function () {
        var self = this;
        if (!self.maxXMove) {
            self.maxXMove = Dom.sideMenu.clientWidth;
        }
        switch (self.defineSwipeType()) {
            /*case 'horizontal':
                if (self.curX === self.startX) {
                    return;
                }
                var move = self.curX - self.startX;
                self.startX = self.curX;
                self.scrollX += move;
                if (self.scrollX < 0) {
                    if (!SideMenu.isOpen) {
                        return;
                    }
                    self.scrollX = 0;
                }
                if (self.scrollX > self.maxXMove) {
                    if (SideMenu.isOpen) {
                        return;
                    }
                    self.scrollX = self.maxXMove;
                }
                Dom.sideMenu.style['-webkit-transition-duration'] = '';
                Dom.contentWindow.style['-webkit-transform'] = 'translate3d(' + self.scrollX + 'px, 0px, 0px)';
                break;*/
            case 'vertical':
                if (self.curY === self.startY) {
                    return;
                }
                self.maxYMove = self.maxYMove || Dom.homeContent.clientHeight - window.innerHeight;
                if (self.maxYMove <= 0) {
                    return;
                }
                var move = self.curY - self.startY;
                self.startY = self.curY;
                self.scrollY += move;
                if (self.scrollY > 0) {
                    self.scrollY = 0;
                }
                if (self.scrollY <= -self.maxYMove) {
                    self.scrollY = -self.maxYMove;
                }
                //Dom.scrollable.style['transition'] = 'transform .' + 2 + 's ease-in-out'
                //Dom.scrollable.style['transition-duration'] = '0;
                Dom.scrollable.style['-webkit-transition-duration'] = '';
                Dom.scrollable.style['-webkit-transform'] = 'translate3d(0px, ' + self.scrollY + 'px, 0px)';
        }
    },
    handleSwipeEnd: function () {
        var self = this,
            time = self.endTime - self.startTime;
        if (!self.maxXMove) {
            self.maxXMove = Dom.sideMenu.clientWidth;
        }
        switch (self.defineSwipeType()) {
            case 'horizontal':
                /*var move = self.curX - self.startX;
                self.scrollX += move;
                if (self.scrollX >= self.maxXMove && SideMenu.isOpen) {
                    break;
                }
                if (self.scrollX <= 0 && !SideMenu.isOpen) {
                    break;
                }
                console.log(self.scrollX)
                if (time < 300 ||
                    ((self.scrollX > self.maxXMove / 2) && !SideMenu.isOpen) ||
                    ((self.scrollX < self.maxXMove / 2) && SideMenu.isOpen)) {
                    self.scrollX = !SideMenu.isOpen ? self.maxXMove : 0;
                    SideMenu.toggleMenu();
                } else {
                    self.scrollX = SideMenu.isOpen ? self.maxXMove : 0;
                    SideMenu.cancelToggleMenu();
                }
                break;*/
            case 'vertical':
                if (self.maxYMove <= 0) {
                    return;
                }
                if (self.curY === self.veryBeginY) {
                    return;
                }
                if (time > 300) {
                    return;
                }
                var move = self.curY - self.veryBeginY,
                    acselerate = Math.ceil(500 / time);
                self.scrollY += move * acselerate;
                if (self.scrollY > 0) {
                    self.scrollY = 0;
                }
                if (self.scrollY <= -self.maxYMove) {
                    self.scrollY = -self.maxYMove;
                }

                Dom.scrollable.style['-webkit-transition-duration'] = (200 * acselerate) + 'ms';
                Dom.scrollable.style['-webkit-transform'] = 'translate3d(0px, ' + self.scrollY + 'px, 0px)';
                console.log(time, acselerate, move)
                break;
        }
        self.scrollType = null;
    },
    scrollTop: function () {
        var self = this;
        self.scrollY = 0;
        Dom.scrollable.style['-webkit-transform'] = 'translate3d(0px, ' + self.scrollY + 'px, 0px)';
    }
};