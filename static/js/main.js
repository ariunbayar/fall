'use strict';


var Fall = {
    is_paused: true,
    is_ready: false,

    tick_speed: 100,  // milliseconds

    layers: {},

    altitude: 11000,  // meters :O

    obstacles: [],

    objects: {
        front: [
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
        setInterval(Fall.tick, Fall.tick_speed);
        },

    start: function(){
        Fall.is_paused = false;
        Fall.is_ready = true,
        $('#start').hide();
        $('#game').show();
        },

    tick: function(){
        if (Fall.is_paused) { return; }
        if (!Fall.is_ready) { return; }
        Fall.is_ready = false;

        Fall.altitude -= 1;
        Fall.update();

        Fall.is_ready = true;
        },

    update: function(){
        $('#altitude').html(Fall.altitude);
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

var left = function() {
    var cur_left = parseInt($("#man").css('margin-left'));
    console.log(cur_left);
    $("#man").animate({
        'margin-left': cur_left - 50
        }, 500, "linear", function() {
            console.log('left done');
        }
    );
}

var right = function() {
    var cur_left = parseInt($("#man").css('margin-left'));
    $("#man").animate({
        'margin-left': cur_left + 50
        }, 500, "linear", function() {
            console.log('right done');
        }
    );
}

$(function(){
    Fall.init();
    move(0.5, '#rectangle');
});

$(document).keydown(function(e) {
    if (e.keyCode == 37) {
        left();
    }
    if (e.keyCode == 39) {
        right();
    }
});

// : vim: fdm=indent
