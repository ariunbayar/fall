'use strict';


var Fall = {
    is_paused: true,

    layers: {
        front:      $('#front'),
        middle1:    $('#middle1'),
        middle2:    $('#middle2'),
        back:       $('#back')
        },

    init: function(){
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
