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

    function Noti5(element, o) {
        var el = element;
        var $el = $(element);

        o = $.extend({}, $.fn[noti5].defaults, o);
    }


    $[noti5] = function(){
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

    };
}));