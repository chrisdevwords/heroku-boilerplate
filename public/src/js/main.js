"use strict";

var root = window || global;

var Main = function () {
    return {
        init : function() {
            console.log('init main.');
            console.log(window.data.spotify.id);
        }
    }
};

root.onload = function () {
    var main = new Main();
    main.init();
};

