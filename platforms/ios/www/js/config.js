Parse.initialize("FqOlrZGAz1ROccpgUrALGtbHoPvkcovTWYW3hDWC", "VROXvuSjjSvQdBO6ccOT0UpTr1oKzZ2hJ9cTBI0p");

window.ItemListDB = Parse.Object.extend("ItemList");
window.CategoryListDB = Parse.Object.extend("CategoryList");
window.TimeStampsDB = Parse.Object.extend("TimeStamps");
window.timestampsId = "IqU4KZlnDU";
window.isHybrid = window.location.protocol == "file:" ? true : false;
window.defaultScroll = true;
window.isAndroid = (navigator.userAgent.indexOf('Android') !== -1);

window.onhashchange = function (event) {
    var oldState = event.oldURL.slice(event.oldURL.indexOf('#')),
        newState = event.newURL.slice(event.newURL.indexOf('#'));

    StateController.handleCurrentState(oldState, newState);
};

function findAction(el) {
    if (!el) {
        return;
    }

    if (el.attributes && el.attributes.action) {
        var res = {
            action: el.attributes.action.value
        };
        if (el.attributes.index) {
            res.id = el.attributes.index.value;
        }
        return res;
    }
    return findAction(el.parentElement);
}

function onDeviceReady() {
    if (window.deviceReadyInited) {
        return;
    }
    window.deviceReadyInited = true;

    document.addEventListener("backbutton", function (e) {
        e.preventDefault();
        Router.goBack();
    }, false);

    if (window.defaultScroll) {
        window.myScroll = {};
        window.scrollR = myScroll.reload = function () {
            Dom.scroller.classList.add('resetScroll');
            setTimeout(function () {
                Dom.scroller.classList.remove('resetScroll');
            }, 100);
        }
    } else {
        window.myScroll = new IScroll('#wrapper', {
            click: true
        });
        myScroll.reload = function () {
            myScroll.refresh();
            myScroll.scrollTo(0, 0)
        };
    }

    PEMenu.init();
}

function exitApp() {
    var exit = confirm('Выйти из приложения?');
    if (exit) {
        navigator.app.exitApp();
    }
}

if (!isHybrid) {
    window.onload = onDeviceReady;
} else {
    window.onload = function () {
        (function waitDeviceReady() {
            if (!navigator || !navigator.app || !navigator.app.exitApp) {
                setTimeout(waitDeviceReady, 300);
            } else {
                try {
                    onDeviceReady();
                } catch (err) {
                    console.log(err)
                }
            }
        })();
    }
}

window.document.addEventListener("deviceready", onDeviceReady, false);


if (!window.defaultScroll) {
    window.addEventListener("mousedown", function (e) {
        window.scrollStarted = true;
    }, false);

    window.addEventListener("mousemove", function (e) {
        if (window.scrollStarted)
            window.scrollInProgress = true;
    }, false);


    window.document.addEventListener('click', function (e) {
        if (!window.lastClick && (((+new Date()) - window.lastClick) < 500)) {
            e.stopPropagation();
            return;
        }
        window.lastClick = +new Date();
        if (!isHybrid) {
            if (window.scrollInProgress) {
                e.stopPropagation();
            }
            window.scrollInProgress = window.scrollStarted = false;
        }
    }, true);

    window.document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);
}


