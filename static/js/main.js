'use strict';


var Fall = {
    is_paused: true,
    is_ready: false,
    man: { ready: true, cur_col: 4},
    column: 8, // defualt width
    row: 12, // default height
    cell: {width: 50, height: 50},

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
        $("#man").css({
            //'margin-left': parseInt($("#front").css('width')) / 2,
            'margin-left': Fall.man.cur_col * Fall.cell.width,
            'margin-top': parseInt(Fall.row / 3) * Fall.cell.height
            }
        );
        },

    start: function(){
        Fall.is_paused = false;
        Fall.is_ready = true,
        $('#start').hide();
        $('#game').show();
        $('#pause').show();
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
                Fall.move(item, speed);
            }
        }
        Fall.update();

        Fall.is_ready = true;
        },

    move: function(item, speed) {
        item.animate({top: 0}, speed, "linear", function() {
            item.remove();
            });
        },

    left: function() {
        Fall.man.ready = false;
        var cur_left = parseInt($("#man").css('margin-left'));
        Fall.man.cur_col--;
        $("#man").animate({
            'margin-left': Fall.man.cur_col * Fall.cell.width
            }, 300, "linear", function() {
                Fall.man.ready = true;
            }
        );
    },

    right: function() {
        Fall.man.ready = false;
        var cur_left = parseInt($("#man").css('margin-left'));
        Fall.man.cur_col++;
        $("#man").animate({
            'margin-left': Fall.man.cur_col * Fall.cell.width
            }, 300, "linear", function() {
                Fall.man.ready = true;
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


$(function(){
    Fall.init();
});

$(document).keydown(function(e) {
    if (e.keyCode == 37 && Fall.man.ready && !Fall.is_pause && Fall.man.cur_col > 0) {Fall.left();}
    if (e.keyCode == 39 && Fall.man.ready && !Fall.is_pause && Fall.man.cur_col < 7) {Fall.right();}
});

// : vim: fdm=indent
