'use strict';


var Fall = {
    is_paused: true,
    is_ready: false,

    tick_speed: 100,  // milliseconds

    layers: {},
    height: 0,
    width: 0,

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
        Fall.layers.front.speed   = parseFloat(Fall.layers.front.attr('data-speed'));
        Fall.layers.middle1.speed = parseFloat(Fall.layers.middle1.attr('data-speed'));
        Fall.layers.middle2.speed = parseFloat(Fall.layers.middle2.attr('data-speed'));
        Fall.layers.back.speed    = parseFloat(Fall.layers.back.attr('data-speed'));
        setInterval(Fall.tick, Fall.tick_speed);
        Fall.height = Fall.layers.front.height();
        Fall.width = Fall.layers.front.width();
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
        if (Fall.altitude % 20 == 0) {
            for (var i in Fall.layers) {
                var layer = Fall.layers[i];
                var column = ~~(Math.random() * 7) + 1;
                var item = Fall.add_item(layer, column);
                // TODO by height and layer speed
                var speed = 3000 / layer.speed;
                move(item, speed);
            }
        }
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
        // TODO
        },

    add_item: function(layer, column){
        // TODO change with grid width
        var css = {
            opacity: layer.speed,
            backgroundColor : 'DarkSlateBlue',
            height          : 50,
            width           : 50,
            left            : (column - 1) * 50,
            top             : Fall.height
        }
        var item = $('<div>').css(css);
        layer.append(item);
        return item;
    },

    dummy: null  // avoiding trailing comma errors
}

var move = function(item, speed) {
    item.animate({top: 0}, speed, "linear", function() {
        item.remove();
        });
}

var left = function() {
    man_ready = false;
    var cur_left = parseInt($("#man").css('margin-left'));
    console.log(cur_left);
    $("#man").animate({
        'margin-left': cur_left - 50
        }, 300, "linear", function() {
            console.log('left done');
            man_ready = true;
        }
    );
}

var right = function() {
    man_ready = false;
    var cur_left = parseInt($("#man").css('margin-left'));
    console.log(cur_left);
    $("#man").animate({
        'margin-left': cur_left + 50
        }, 300, "linear", function() {
            console.log('right done');
            man_ready = true;
        }
    );
}

$(function(){
    Fall.init();
});
var man_ready = true;

$(document).keydown(function(e) {
    if (e.keyCode == 37 && man_ready) {left();}
    if (e.keyCode == 39 && man_ready) {right();}
});

// : vim: fdm=indent
