/**
 * 
 *                                                                 
 * noti5.js - jQuery Notify plugin
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
            canvas: '<div class="js-noti5-canvas"/>',
            container: '<div class="js-noti5"><a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a></div>',
            title: '<div class="title"/>',
            message: '<div class="message"/>',
            progress: '<div class="js-noti5-progress"></div>'
        }
    };

    var methods = {
        destroy: function() {
            Noti5.prototype._destroy();
        }
    };

    function Noti5(element, o) {
        var el = element,
            $el = $(element)

        if (typeof o === 'string') {
            var message = o;
            o = $.fn[noti5].defaults;
            o.message = message;
        }

        o = $.extend({}, $.fn[noti5].defaults, o);

        this._buildCore(element, o);

        return {
            destroy: methods.destroy
        };
    }

    //*******************************************************************************************

    Noti5.prototype._buildCore = function(element, o) {
        console.log("_buildCore invoking...");

        var self = this;
        var $container = $(core.html.container).addClass(o.type);
        var $title = $(core.html.title).html(o.title);
        var $message = $(core.html.message).html(o.message);
        var $progress = $(core.html.progress);
        var canvas = {};

        // check if input is number, init progress bar if so
        if ($.isNumeric(o.timeout) && Math.floor(o.timeout) == o.timeout) {
            $progress.css({
                '-webkit-animation': 'progress ' + o.timeout + 's linear forwards 0.5s',
                '-moz-animation': 'progress ' + o.timeout + 's linear forwards 0.5s',
                '-o-animation': 'progress ' + o.timeout + 's linear forwards 0.5s',
                '-ms-animation': 'progress ' + o.timeout + 's linear forwards 0.5s',
                'animation': 'progress ' + o.timeout + 's linear forwards 0.5s'
            });

            // pause / resume progress bar when it is being hovered / resumed
            $('.js-noti5').hover(function() {
                $(this).find('.js-noti5-progress').css({
                    '-webkit-animation-play-state': 'paused',
                    '-moz-animation-play-state': 'paused',
                    '-o-animation-play-state': 'paused',
                    '-ms-animation-play-state': 'paused',
                    'animation-play-state': 'paused'
                });
            }, function() {
                $(this).find('.js-noti5-progress').css({
                    '-webkit-animation-play-state': 'running',
                    '-moz-animation-play-state': 'running',
                    '-o-animation-play-state': 'running',
                    '-ms-animation-play-state': 'running',
                    'animation-play-state': 'running'
                });
            });
        }

        // build noti5 box
        var $noti5 = $container.append($title).append($message).append($progress);

        if (o.link.href != '#') {
            $noti5 = $('<a/>').attr({
                'href': o.link.href,
                'title': o.link.title,
                'target': o.link.target
            }).append($noti5);
        }

        if (element == null) {
            // create canvas
            if (!$('.js-noti5-canvas' + '.' + o.pos).length) {
                $('body').append($(core.html.canvas).addClass(o.pos));
            }

            $noti5.hide().prependTo('.js-noti5-canvas' + '.' + o.pos).slideDown();
        } else {
            var $el = $(element);

            $noti5.addClass("noti5-element " + o.pos).hide().prependTo('body');

            switch (o.elementPos) {
                case 'left':
                    $noti5.css("top", $el.position().top);
                    $noti5.css("left", $el.position().left - $noti5.outerWidth());
                    console.log($noti5);
                    break;

                case 'right':
                    $noti5.css("top", $el.position().top);
                    $noti5.css("left", $el.position().left + $el.outerWidth());
                    break;
                case 'top':
                    console.log($noti5.height());
                    $noti5.css("top", $el.position().top - $noti5.outerHeight());
                    $noti5.css("left", $el.position().left);
                    break;
                case 'bottom':
                    $noti5.css("top", $el.position().top + $el.outerHeight());
                    $noti5.css("left", $el.position().left);
                    break;
            }


            $noti5.slideDown();
        }



        // fade out noti5 container when the close button is clicked
        $('.js-noti5 .close').bind('click', function(e) {
            e.preventDefault();
            self._fadeOutNoti5($(this).parent());
        });

        //fade out noti5 container after timeout
        $('.js-noti5 .js-noti5-progress').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
            self._fadeOutNoti5($(this).parent());
        });
    };

    Noti5.prototype._destroy = function() {
        $('.js-noti5 .close').click();
    };

    Noti5.prototype._fadeOutNoti5 = function($ele) {
        $ele.fadeOut("slow", function() {
            $(this).remove();
        });
    };


    //*******************************************************************************************


    $[noti5] = function(o) {
        new Noti5(null, o);
    };

    $.fn[noti5] = function(o) {

        if (methods[arguments[0]]) {
            return methods[arguments[0]].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof arguments[0] === 'string') {
            var message = arguments[0];
            var args = Array.prototype.slice.call(arguments, 1);

            this.each(function() {
                return new Noti5(this, o);
            });
        } else if (typeof o === "object" || !o) {
            return this.each(function() {
                if (!$.data(this, 'plugin_' + noti5)) {
                    $.data(this, 'plugin_' + noti5, new Noti5(this, o));
                }

            });
        }
    };

    $.fn[noti5].defaults = {
        'title': 'this is a title',
        'message': 'message goes here',
        'type': 'success',
        'timeout': '4',
        'pos': 'top-right',
        'elementPos': 'right',
        'link': {
            'href': '#',
            'title': '',
            'target': '_blank'
        }
    };
}));