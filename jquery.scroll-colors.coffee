(($, window)->
	class ScrollColors
		
		constructor:(_opt)->
			_id = + new Date();
			_evt = 'load.' + _id + ' scroll.' + _id;
			_$win = $(window);
			_$body = $('body');
			_$target = $.unique( $(_opt.target) );
			_positions = new Array(_$target.length);
			_defaultBackgroundColor = _$body.css('background-color');
			_current = 0;
			
			_$layer = $('<div>').appendTo(_$body);
			_$layer.css(
				'transition': _opt.duration + 'ms',
				'position': 'fixed',
				'top': 0,
				'left': 0,
				'z-index': -5000,
				'width': '100%'
			);
			
			# Elements are sorted in ascending order.
			_$target.each((i)->
				$elem = $(this);
				pos = $elem.offset().top;
				if (i > 0 && _positions[i-1] > pos)
					_positions[i] = _positions[i-1];
					_positions[i-1] = pos;
				else
					_positions[i] = pos
				return
			);
			
			
			_changeColor = (event)->
				scrollTop = _$win.scrollTop();
				for pos, index in _positions
					if (pos + _opt.offset >= scrollTop)
						break
				if (_current == index)
					return
				
				_current = index;
				index = index % _opt.colors.length;
				color = _opt.colors[index];
				
				_$layer.height(_$body.outerHeight());
				
				###
				if (typeof window.JSON == "object" && typeof history.pushState == "function")
					_$layer.css(
						'background-color': color
					);
				else
					_$layer.animate({'background-color': color}, _opt.duration);
				###
				
				_$layer.css(
					'background-color': color
				);
				
				_opt.onchange(color, index);
				
				return
			
			_$win.on(_evt, _changeColor);
			
			@reset = ->
				_$win.off(_evt);
				_$body.css('background-color', _defaultBackgroundColor);
				
				return
		
	$.ScrollColors = (options)->
		if (!$.ScrollColors.api)
			config = $.extend(true,{},$.ScrollColors.defaults,options);
			$.ScrollColors.api = new ScrollColors(config);
		
		return $
	
	$.ScrollColors.reset = ->
		$.ScrollColors.api.reset();
		$.ScrollColors.api = null;
		return $
	
	$.ScrollColors.defaults =
		target: 'article',
		colors: ['#3498db', '#1abc9c', '#9b59b6', '#c0392b', '#f39c12', '#34495e'],
		offset: -100,
		duration: 300,
		onchange: $.noop
	
	return
)(jQuery, window);