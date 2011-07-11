// jQuery addremove plugin v.01
// Create dynamic forms with add/remove functionality
//
// Copyright (C) 2011 by Adam Clarke (github.com/vaxinate)
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

(function($){

	$.fn.extend({ 

		//pass the options variable to the function
		addremove: function(options) {

			//Set the default values, use comma to separate the settings, example:
			var defaults = {
				plusbutton: '<a href="#" class="plus">+</a>',
				minusbutton: '<a href="#" class="minus">-</a>',
			}
			
			var options =  $.extend(defaults, options);
			var $super = this;

			return this.each(function() {
				var opts = options;
				
				setup_buttons();
								
				function setup_buttons () {
					// clear any buttons that are already done
					var buttons = $super.find('.buttons');
					$(buttons).children().remove();
					
					if (buttons.length > 1) {
						// add minus button to all of them
						buttons.each(function () {
							$(this).html(opts.minusbutton);
						});
						
						$super.find('.minus').click(function () {
							$(this).parent().parent().remove();
							renumber();
							setup_buttons();
						});
					}
					
					// add plus button to last one
					var $last_one = $($super.children('tbody').children(':last'));
					
					$last_one.children('.buttons').append(opts.plusbutton);
					$last_one.find('.plus').click(function () {
						var new_one = $last_one.clone();
						$(new_one).find('input[type=text], textarea').val('');
						$super.children('tbody').append(new_one);
						renumber();
						setup_buttons();
					});
				}
				
				function renumber () {
					var num = 0;
					
					$super.find('tr').each(function() {
						$(this).find('input').each(function () {
							$(this).prop('name', $(this).prop('name').replace(/\[\d*\]/, '['+num+']'));
						});
						num += 1;
					})
				}
			});
		}
	});

	})(jQuery);