/**
 * 
 *                                                                 
 * noti5.js 
 * @author Wing Kam Wong - wingkwong.code@gmail.com
 */
;
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    var noti5 = 'noti5';

    var core = {
        html: {
            container: '<div class="js-noti5"><a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a></div>',
            title: '<div class="title"/>',
            message: '<div class="message"/>',
            progress: '<div class="js-noti5-progress"></div>'
        },
        'class': '456'
    };

    function Noti5(element, o) {
        console.log("..");
        var el = element,
            $el = $(element)

        o = $.extend({}, $.fn[noti5].defaults, o);

        this.buildCore(element, o);

    }

    //*******************************************************************************************

    Noti5.prototype.buildCore = function(element, o) {
        console.log("buildCore invoking...");

        var self = this;
        var $container = $(core.html.container).addClass(o.type);
        var $title = $(core.html.title).html(o.title);
        var $message = $(core.html.message).html(o.message);
        var $progress = $(core.html.progress);

        // check if input is number, init progress bar if so
        if($.isNumeric(o.timeout) && Math.floor(o.timeout) == o.timeout){
            $progress.css({
               '-webkit-animation': 'progress ' +  o.timeout + 's linear forwards 0.5s',
                '-moz-animation': 'progress ' +  o.timeout + 's linear forwards 0.5s',
                '-o-animation': 'progress ' +  o.timeout + 's linear forwards 0.5s',
                '-ms-animation': 'progress ' +  o.timeout + 's linear forwards 0.5s',
                'animation': 'progress ' +  o.timeout + 's linear forwards 0.5s'
            }); 

             // pause / resume progress bar when it is being hovered / resumed
            $('.js-noti5').hover(function(){
                $(this).find('.js-noti5-progress').css({
                    '-webkit-animation-play-state': 'paused',
                    '-moz-animation-play-state': 'paused',
                    '-o-animation-play-state': 'paused',
                    '-ms-animation-play-state': 'paused',
                    'animation-play-state': 'paused'
                });
            }, function(){
                $(this).find('.js-noti5-progress').css({
                    '-webkit-animation-play-state': 'running',
                    '-moz-animation-play-state': 'running',
                    '-o-animation-play-state': 'running',
                    '-ms-animation-play-state': 'running',
                    'animation-play-state': 'running'
                });
            });
        }

        if(element == null){
            //TODO:
        }else{
            $('body').append($container.append($title).append($message).append($progress));
        }

        // fade out noti5 container when the close button is clicked
        $('.js-noti5 .close').bind('click', function(e) {
            e.preventDefault();
            self.fadeOutNoti5($(this).parent());
        });

        //fade out noti5 container after timeout
        $('.js-noti5 .js-noti5-progress').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
            self.fadeOutNoti5($(this).parent());
        });
    };


    Noti5.prototype.registerCss = function($ele) {
        
    };

    Noti5.prototype.fadeOutNoti5 = function($ele) {
        $ele.fadeOut("slow", function() {
            $(this).remove();
        });
    };




    //*******************************************************************************************


    $[noti5] = function(o) {
        console.log('here');
        new Noti5(null, o);
    };

    $.fn[noti5] = function(o) {
        if (typeof arguments[0] === 'string') {
            var methodName = arguments[0];
            var args = Array.prototype.slice.call(arguments, 1);
            var returnVal;
            this.each(function() {
                if ($.data(this, 'plugin_' + noti5) && typeof $.data(this, 'plugin_' + noti5)[methodName] === 'function') {
                    returnVal = $.data(this, 'plugin_' + noti5)[methodName].apply(this, args);
                } else {
                    throw new Error('Method ' + methodName + ' does not exist on jQuery.' + noti5);
                }
            });
            if (returnVal !== undefined) {
                return returnVal;
            } else {
                return this;
            }
        } else if (typeof o === "object" || !o) {
            return this.each(function() {
                if (!$.data(this, 'plugin_' + noti5)) {
                    $.data(this, 'plugin_' + noti5, new Noti5(this, o));
                }
            });
        }
    };

    $.fn[noti5].defaults = {
        'title': 'default title',
        'message': 'default message',
        'type': 'success',
        'timeout': '4'
    };
}));