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

var move = function(speed, obj) {
    console.log(speed, obj);
    $(obj).animate({
        top: 400
        }, 5000, "linear", function() {
            console.log('done');
        }
    );
}


$(function(){
    Fall.init();
    move(0.5, 'hello');
});
