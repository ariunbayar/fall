'use strict';


var Fall = {
    is_paused: true,
    is_ready: false,
    man_ready: true,
    column: 8, // defualt width
    row: 12, // default height
    cell: {width: 50, height: 50},

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

        var man_init = function() {
            $("#man").css({
                //'margin-left': parseInt($("#front").css('width')) / 2,
                'margin-left': parseInt($("#front").css('width')) / 2,
                'margin-top': parseInt($("#front").css('height')) / 3
                }
            );
        }

        man_init();
        },

    start: function(){
        Fall.is_paused = false;
        Fall.is_ready = true,
        $('#start').hide();
        $('#game').show();
        Fall.move(5000, '#rectangle');
        },

    tick: function(){
        if (Fall.is_paused) { return; }
        if (!Fall.is_ready) { return; }
        Fall.is_ready = false;

        Fall.altitude -= 1;
        Fall.update();

        Fall.is_ready = true;
        },

    move: function(speed, obj) {
        speed = parseInt(speed);
        $(obj).animate({
            top: 0
            }, speed, "linear", function() {
                console.log('done');
            }
        );
    },

    left: function() {
        Fall.man_ready = false;
        var cur_left = parseInt($("#man").css('margin-left'));
        $("#man").animate({
            'margin-left': cur_left - 50
            }, 300, "linear", function() {
                Fall.man_ready = true;
            }
        );
    },

    right: function() {
        Fall.man_ready = false;
        var cur_left = parseInt($("#man").css('margin-left'));
        $("#man").animate({
            'margin-left': cur_left + 50
            }, 300, "linear", function() {
                Fall.man_ready = true;
            }
        );
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


$(function(){
    Fall.init();
});

$(document).keydown(function(e) {
    if (e.keyCode == 37 && Fall.man_ready && !Fall.is_pause) {Fall.left();}
    if (e.keyCode == 39 && Fall.man_ready && !Fall.is_pause) {Fall.right();}
});

// : vim: fdm=indent
