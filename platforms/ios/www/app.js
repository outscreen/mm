requirejs.config({
    baseUrl: 'js',
    paths: {
        "jquery": "lib/jquery.min",
       "jquerymobile": "lib/jquery-mobile"
    },
    shim: {
      //  "jquerymobile": ["jquery"]
    }
});

require([
    "jquery",
//    "main",
   "jquerymobile"
], function () {});

console.log('loaded')