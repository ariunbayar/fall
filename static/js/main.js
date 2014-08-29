'use strict';


var Fall = {
    is_paused: true,
    is_ready: false,
    man: { ready: true, cur_col: 4 },
    column: 8,   // default width
    row:    12,  // default height
    cell: {width: 50, height: 50},

    tick_speed: 100,  // milliseconds
    fall_speed: 2000,

    layers: {},
    height: 0,
    width: 0,

    altitude: 11000,  // meters :O

    obstacles: [
        '#rocket',
        '#cloud',
        '#black_cloud',
        '#balloons',
        '#plane1',
        '#plane2'
    ],

    objects: {  // TODO is this used
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
        Fall.man.el = $("#man");
        Fall.man.el.css({
            left: Fall.man.cur_col * Fall.cell.width,
            top: parseInt(Fall.row / 3) * Fall.cell.height
            }
        );
        for (var i=0; i < Fall.obstacles.length; ++i) {
            Fall.obstacles[i] = $(Fall.obstacles[i]);
        }
        },

    start: function(){
        Fall.is_paused = false;
        Fall.is_ready = true,
        $('#start').hide();
        $('#game').show();
        $('#pause').show();
        $('#play').hide();
        },

    toggle_pause: function(){
        Fall.is_paused = !Fall.is_paused;
        if (Fall.is_paused) {
            $('#pause').hide();
            $('#play').show();
        } else {
            $('#pause').show();
            $('#play').hide();
        }
    },

    tick: function(){
        if (Fall.is_paused) { return; }
        if (!Fall.is_ready) { return; }
        Fall.is_ready = false;

        Fall.altitude -= 1;
        if (Fall.altitude % 20 == 0) {
            for (var i in Fall.layers) {
                var layer = Fall.layers[i];
                var column = ~~(Math.random() * 8) + 1;
                var item = Fall.add_item(layer, column);
                // TODO by height and layer speed
                var speed = Fall.fall_speed / layer.speed;
                Fall.move(item, speed);
            }
        }
        Fall.layers.front.children().each(function(i, _el){
            if (Fall.man.el.is(_el)) return;
            if (Fall.is_colliding(_el, Fall.man.el)) {
                Fall.crash();
            }
        });
        Fall.update();

        Fall.is_ready = true;
        },

    move: function(item, speed) {
        item.animate({top: 0}, speed, "linear", function() {
            item.remove();
            });
        },

    is_colliding: function(_el1, _el2){
        var el1 = $(_el1), el2 = $(_el2);
        var el1_pos = el1.position(),
            el2_pos = el2.position();
        el1_pos.bottom = el1_pos.top  + el1.height();
        el1_pos.right  = el1_pos.left + el1.width();
        el2_pos.bottom = el2_pos.top  + el2.height();
        el2_pos.right  = el2_pos.left + el2.width();
        if (el1_pos.left   < el2_pos.right &&
            el1_pos.right  > el2_pos.left &&
            el1_pos.top    < el2_pos.bottom &&
            el1_pos.bottom > el2_pos.top) {
            $('#p1').css({top: el1_pos.top, left: el1_pos.left});
            $('#p2').css({top: el1_pos.bottom, left: el1_pos.left});
            $('#p3').css({top: el1_pos.top, left: el1_pos.right});
            $('#p4').css({top: el1_pos.bottom, left: el1_pos.right});
            return true;
        } else {
            return false;
        }
        },

    left: function() {
        Fall.man.ready = false;
        Fall.man.cur_col--;
        var css = { left: Fall.man.cur_col * Fall.cell.width };
        Fall.man.el.animate(css, 300, "linear", function() {
                Fall.man.ready = true;
            }
        );
    },

    right: function() {
        Fall.man.ready = false;
        Fall.man.cur_col++;
        var css = { left: Fall.man.cur_col * Fall.cell.width }
        Fall.man.el.animate(css, 300, "linear", function() {
                Fall.man.ready = true;
            }
        );
    },

    update: function(){
        $('#altitude').html(Fall.altitude);
        },

    crash: function(){
        Fall.man.el.css('background-color', 'red');
        Fall.toggle_pause();
        },

    finish: function(){
        // TODO
        },

    add_item: function(layer, column){
        // TODO change with grid width
        var css = {
            opacity         : layer.speed,
            height          : Fall.cell.height * layer.speed,
            width           : Fall.cell.width * layer.speed,
            left            : (column - 1) * Fall.cell.width,
            top             : Fall.row * Fall.cell.height
        };
        var selected_item = Math.round(Math.random() * (Fall.obstacles.length - 1));
        var item = Fall.obstacles[selected_item].clone();
        layer.append(item);
        item.css(css);
        return item;
    },

    dummy: null  // avoiding trailing comma errors
}


$(function(){
    Fall.init();
});

$(document).keydown(function(e) {
    if (e.keyCode == 37 && Fall.man.ready && !Fall.is_paused && Fall.man.cur_col > 0) {Fall.left();}
    if (e.keyCode == 39 && Fall.man.ready && !Fall.is_paused && Fall.man.cur_col < 7) {Fall.right();}
});

// : vim: fdm=indent
