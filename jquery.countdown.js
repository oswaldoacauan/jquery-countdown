/*
 *  Project: jQuery Countdown 
 *  Description: A plugin simple and easy generator counting from a regressive period.
 *  Author: Oswaldo Acauan <oswaldoacauan@gmail.com>
 */

 ;(function ( $, window, undefined ) {

    /* PUBLIC CLASS DEFINITION
    * ============================= */

    var pluginName = 'countdown',
    document = window.document,
    clientDate = new Date(),
    defaults = {
            since: new Date(clientDate.getTime()),
            until: new Date(clientDate.getTime() + 86400000), //add one day into current client-side date
            delay: 1000,
            showNegative: false,
            onChange: function(c) {
                $(this).html(j.days+" days "+j.hours+":"+j.minutes+":"+j.seconds);
            }
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;        
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.options.onChange = $.proxy( this.options.onChange, this.element );

        this.init();
    }

    Plugin.prototype = {
        init: function () {
            console.log(this.options.onChange);
            refresh.call(this, this.options.since.getTime(), this.options.until.getTime(), this.options.delay, this.options.showNegative, this.options.onChange); // start recursion            
        }
    }

    /* PRIVATE METHODS
    * ===================== */
    function refresh(start, end, delay, showNegative, onChange) {
        var ss = parseInt((end - start) / 1000); //sec
        var mm = parseInt(ss / 60); //min
        var hh = parseInt(mm / 60); //hour
        var dd = parseInt(hh / 24); //day

        ss = ss - (mm * 60);
        mm = mm - (hh * 60);
        hh = hh - (dd * 24);

        var _return = {
            'days': dd,
            'hours': hh,
            'minutes': mm,
            'seconds': ss 
        }

        if (dd+hh+mm+ss > 0 || showNegative == true) {  
            onChange(_return);
            setTimeout(function(){
                refresh.call(this, start, end - delay, delay, showNegative, onChange)
            },delay);
        }
    }


    /* PLUGIN DEFINITION
    * ======================= */
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };

}(jQuery, window));