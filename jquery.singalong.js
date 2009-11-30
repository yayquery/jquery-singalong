
/*!
 * jQuery Singalong plugin
 * by yayQuery 2009 http://yayquery.com
 * licensed WTFPL
 * http://yayquery.github.com/jquery-singalong/
*/

(function($) {

$.fn.singalong = function(options) {

    // build main options before element iteration
    var opts = $.extend({}, $.fn.singalong.defaults, options);
    // iterate and reformat each matched element
    return this.each(function() {
        
        if (!opts.elem){   
            opts.elem = opts.$link.attr('href',opts.uri).text(opts.uri).hide().insertAfter(this);
        }

        function f(){

            // inverse of: this.currentTime >= opts.start
            if (this.currentTime < opts.start) return;

            if (this.currentTime >= opts.stop){
                if (f.stopped) return;
                f.stopped = true;
                f.started = false;
                 $(this).trigger('hide.annotate',{elem: opts.elem});
                return opts.elem.hide();
            }

            $(this).trigger('update.annotate',{time:this.currentTime});
           
            if (f.started) return;
            
            f.started = true;
            opts.elem.show();
            $(this).trigger('show.annotate',{elem: opts.elem, start: opts.start, stop : opts.stop});
        
        } // eo f()

        $(this).filter('audio,video')
            .bind('timeupdate',f)
            .bind('pause stop play',function(){    
                opts.elem.hide(); f.started = false; f.stopped=false;
        });
        
    }); // this.each
}; // $.fn.singalong

  $.fn.singalong.defaults = {
      start : 0,
      stop   : Infinity,
      $link  : $('<a>'),
      uri   : 'http://yayquery.com',
      elem  : undefined
  };

})(jQuery);

