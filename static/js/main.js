'use strict';


var Fall = {
    is_paused: true,

    init: function(){
        Fall.is_paused = false;
        Fall.start();
        },

    start: function(){
        // TODO
        },

    tick: function(){
        // TODO
        },

    crash: function(){
        // TODO
        },

    finish: function(){

        },

    dummy: null  // avoiding trailing comma errors
}


$(function(){
    Fall.init();
});
