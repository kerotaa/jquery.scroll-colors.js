/*!
 * jquery.scroll-colors.js - v0.0.1 - https://github.com/kerotaa/jquery.scroll-colors.js
 * Change a background color according to your scrolling.
 * 
 * 
 * Copyright (c) 2013 kerotaa (http://kerotaa.hateblo.jp/)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013-05-22
 **/
;(function($, window) {
  var ScrollColors;

  ScrollColors = (function() {
    function ScrollColors(_opt) {
      var _$body, _$layer, _$target, _$win, _changeColor, _current, _defaultBackgroundColor, _evt, _id, _positions;

      _id = +new Date();
      _evt = 'load.' + _id + ' scroll.' + _id;
      _$win = $(window);
      _$body = $('body');
      _$target = $.unique($(_opt.target));
      _positions = new Array(_$target.length);
      _defaultBackgroundColor = _$body.css('background-color');
      _current = 0;
      _$layer = $('<div>').appendTo(_$body);
      _$layer.css({
        'transition': _opt.duration + 'ms',
        'position': 'fixed',
        'top': 0,
        'left': 0,
        'z-index': -5000,
        'width': '100%'
      });
      _$target.each(function(i) {
        var $elem, pos;

        $elem = $(this);
        pos = $elem.offset().top;
        if (i > 0 && _positions[i - 1] > pos) {
          _positions[i] = _positions[i - 1];
          _positions[i - 1] = pos;
        } else {
          _positions[i] = pos;
        }
      });
      _changeColor = function(event) {
        var color, index, pos, scrollTop, _i, _len;

        scrollTop = _$win.scrollTop();
        for (index = _i = 0, _len = _positions.length; _i < _len; index = ++_i) {
          pos = _positions[index];
          if (pos + _opt.offset >= scrollTop) {
            break;
          }
        }
        if (_current === index) {
          return;
        }
        _current = index;
        index = index % _opt.colors.length;
        color = _opt.colors[index];
        _$layer.height(_$body.outerHeight());
        /*
        				if (typeof window.JSON == "object" && typeof history.pushState == "function")
        					_$layer.css(
        						'background-color': color
        					);
        				else
        					_$layer.animate({'background-color': color}, _opt.duration);
        */

        _$layer.css({
          'background-color': color
        });
        _opt.onchange(color, index);
      };
      _$win.on(_evt, _changeColor);
      this.reset = function() {
        _$win.off(_evt);
        _$body.css('background-color', _defaultBackgroundColor);
      };
    }

    return ScrollColors;

  })();
  $.ScrollColors = function(options) {
    var config;

    if (!$.ScrollColors.api) {
      config = $.extend(true, {}, $.ScrollColors.defaults, options);
      $.ScrollColors.api = new ScrollColors(config);
    }
    return $;
  };
  $.ScrollColors.reset = function() {
    $.ScrollColors.api.reset();
    $.ScrollColors.api = null;
    return $;
  };
  $.ScrollColors.defaults = {
    target: 'article',
    colors: ['#3498db', '#1abc9c', '#9b59b6', '#c0392b', '#f39c12', '#34495e'],
    offset: -100,
    duration: 300,
    onchange: $.noop
  };
})(jQuery, window);
