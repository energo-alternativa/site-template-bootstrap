
$(function() {
	
	/**
	 * Конвертация обычного ul-меню в меню для навигационного бара Twitter Bootstrap.
	 */
	 
	jQuery.fn.bootstrapConvertToNavbar = function() {
		
		var convert = function() {
			convertToNav(this);
		};
		
		function convertToNav(ul) {
			ul = $(ul);
			ul.addClass("nav");
			ul.addClass("navbar-nav");
			convertToDropdown(ul.find(">li"));
		}
		
		function convertToDropdown(li) {
			li.addClass("dropdown");
			li.each(function(index, li) {
				li = $(li);
				
				var level = li.parents("ul").size();
				
				if (level == 1) li.addClass("bluring");

				var ul = li.find(">ul");
				
				if (li.text() == "divider" && !ul.size()) {
					li.addClass("divider");
					li.empty();
				} else {
					var a = li.find(">a");
					
					var title = a.html();
					a.empty();
					
					var icon = li.attr("icon");
					li.removeAttr("icon");
					if (icon) {
						icon = $("<i/>").addClass("icon-" + icon);
						a.append(icon);
						a.append("<span> </span>");
					}

					title = $("<span/>").html(title);
					a.append(title);
					
					if (ul.size()) {
						a.addClass("dropdown-toggle").attr("data-toggle", "dropdown");
						if (level > 1) {
							li.removeClass("dropdown");
							li.addClass("dropdown-submenu");
						}
						if (level == 1) {
							var caret = $("<b/>").addClass("caret");
							a.append("<span> </span>");
							a.append(caret);
						}
						ul.addClass("dropdown-menu");
						convertToDropdown(ul.find(">li"));
					}
				}
				
			});
		}
		
		return this.each(convert);
	};
	
});

