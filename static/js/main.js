'use strict';


var Fall = {
    is_paused: true,

    layers: {},

    altitude: 11000,  // meters :O

    obstacles: [],

    objects: {
        front:   [
            {altitude: 11000, color: 'red'}
        ],
        middle1: [],
        middle2: [],
        back:    [],
    },

    init: function(){
        Fall.layers.front   = $('#front');
        Fall.layers.middle1 = $('#middle1');
        Fall.layers.middle2 = $('#middle2');
        Fall.layers.back    = $('#back');
        },

    start: function(){
        Fall.is_paused = false;
        $('#start').hide();
        $('#game').show();
        },

    tick: function(){
        if (Fall.is_paused) { return; }
        // TODO
        },

    crash: function(){
        // TODO
        },

    finish: function(){

        },

    dummy: null  // avoiding trailing comma errors
}

var move = function(speed, obj) {
    $(obj).animate({
        top: 600
        }, 5000, "linear", function() {
            console.log('done');
        }
    );
}


$(function(){
    Fall.init();
    move(0.5, '#rectangle');
});


// : vim: fdm=indent
