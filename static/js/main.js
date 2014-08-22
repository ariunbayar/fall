'use strict';


var Fall = {
    is_paused: true,

    layers: {
        front:      $('#front'),
        middle1:    $('#middle1'),
        middle2:    $('#middle2'),
        back:       $('#back')
    }

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
