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
            container: '<div class="js-noti5"></div>',
            closeBtn: '<a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>',
            title: '<div class="title"/>',
            message: '<div class="message"/>',
            progress: '<div class="js-noti5-progress"></div>'
        },
        methods: {
            destroy: function() {
                Noti5.prototype._destroy();
            }
        }
    };

    function Noti5(element, o) {

        if (typeof o === 'string') {
            var message = o;
            o = $.fn[noti5].defaults;
            o.message = message;
        }

        this.element = element;
        this.o = $.extend({}, $.fn[noti5].defaults, o);

        this._init();
    }

    //*******************************************************************************************
    $.extend(Noti5.prototype, {

        _init: function() {
            var self = this;
            this._buildCore();
            this.noti5 = {
                $ele: this.$noti5,
                update: function(o, val) {
                    console.log("updating");
                    
                    var opt = {};
                    if(typeof o === 'string'){
                        opt[o] = val;
                    }else{
                        opt = o;
                    }

                    //updating title
                    this.$ele.find('.title').html(opt.title);

                    self.o = opt;
                    console.log(this.$ele);
                    console.log( opt);

                    console.log( self.o);
                },
                close: function() {
                   self._fadeOutNoti5(this.$ele);
                }
            }
        },
        _buildCore: function() {
            var self = this;
            var o = this.o;
            var element = this.element;
            var $container = $(core.html.container).addClass(o.type);
            var $title = $(core.html.title).html(o.title);
            var $message = $(core.html.message).html(o.message);
            var $closeBtn = $(core.html.closeBtn);
            var $progress = $(core.html.progress);
            var canvas = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];
            var elementPos = ['left', 'right', 'top', 'bottom'];

            // build noti5 box
            if(o.showCloseBtn){
                $container = $container.append($closeBtn);
            }
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
                if ($.inArray(o.pos, canvas) != -1) {
                    if (!$('.js-noti5-canvas' + '.' + o.pos).length) {
                        $('body').append($(core.html.canvas).addClass(o.pos));
                    }
                    $noti5.hide().prependTo('.js-noti5-canvas' + '.' + o.pos);
                } else {
                    throw new Error('position ' + o.pos + ' is not supported.');
                }

            } else {
                if ($.inArray(o.elementPos, elementPos) != -1) {
                    var $el = $(element);

                    $noti5.addClass("noti5-element " + o.elementPos).hide().prependTo('body');

                    switch (o.elementPos) {
                        case 'left':
                            $noti5.css("top", $el.position().top);
                            $noti5.css("left", $el.position().left - $noti5.outerWidth());
                            break;
                        case 'right':
                            $noti5.css("top", $el.position().top);
                            $noti5.css("left", $el.position().left + $el.outerWidth());
                            break;
                        case 'top':
                            $noti5.css("top", $el.position().top - $noti5.outerHeight());
                            $noti5.css("left", $el.position().left);
                            break;
                        case 'bottom':
                            $noti5.css("top", $el.position().top + $el.outerHeight());
                            $noti5.css("left", $el.position().left);
                            break;
                    }
                } else {
                    throw new Error('position ' + o.elementPos + ' is not supported.');
                }
            }

            // offset reposition
            if (typeof o.offset === 'number') {
                $noti5.css({
                    'left': "+=" + o.offset,
                    'top': "+=" + o.offset
                });
            } else if (typeof o.offset.x != 'undefined' && typeof o.offset.y != 'undefined') {
                $noti5.css({
                    'left': "+=" + o.offset.x,
                    'top': "+=" + o.offset.y
                });
            }

            // spacing
            if (typeof o.spacing === 'number') {
                $noti5.css('margin-bottom', o.spacing);
            }

            // check if input is number, init progress bar if so
            if ($.isNumeric(o.timeout) && Math.floor(o.timeout) == o.timeout) {
                if (o.timeout > 0) {
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

                    //fade out noti5 container after timeout
                    $('.js-noti5 .js-noti5-progress').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
                        self._fadeOutNoti5($(this).parent());
                    });
                }
            }

            this.$noti5 = $noti5;

            $noti5.slideDown();


            // fade out noti5 container when the close button is clicked
            $('.js-noti5 .close').bind('click', function(e) {
                e.preventDefault();
                self._fadeOutNoti5($(this).parent());
            });
        },
        _fadeOutNoti5: function($ele) {
            $ele.fadeOut("slow", function() {
                $(this).remove();
            });
        },

    });

    //*******************************************************************************************


    $[noti5] = function(o) {
        o = new Noti5(null, o);
        return o.noti5;
    };

    $.fn[noti5] = function(o) {

        if (!$.data(document, 'plugin_' + noti5)) {
            var context = new Noti5(this, o);
            $.data(document, 'plugin_' + noti5, context);

            return context.noti5;
        }
        //TODO:
    };

    $.fn[noti5].defaults = {
        'title': 'this is a title',
        'message': 'message goes here',
        'type': 'success',
        'timeout': 4,
        'pos': 'top-right',
        'elementPos': 'right',
        'link': {
            'href': '#',
            'title': '',
            'target': '_blank'
        },
        'offset': 0,
        'spacing': 5,
        'showCloseBtn': true
    };
}));