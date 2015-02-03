
$(function() {
	
	/**
	 * Конвертация обычного ul-меню в меню для навигационного бара Twitter Bootstrap.
	 */
	 
	jQuery.fn.bootstrapConvertToNavbar = function(options) {
	    
	    options = $.extend({
	        position: "top",
	        fluid: true,
	        type: "static",
	        inverse: false,
	        bluring: true
	    }, options);
	    
	    if (options.position == "bottom") options.type = "fixed";
		
		var convert = function() {
			var nav = convertToNav(this);
			
			if (options.bluring) {
				
				nav.find(".bluring").on("show.bs.dropdown", function () {
					$("#pagebody").addClass("blur");
				});
				
				nav.find(".bluring").on("hide.bs.dropdown", function () {
					$("#pagebody").removeClass("blur");
				});
			}
			
		};
		
		function convertToNav(ul) {
			ul = $(ul);
			ul.addClass("nav");
			ul.addClass("navbar-nav");
			convertToDropdown(ul.find(">li"));
			
			// Основные настройки навигационной панели
			var nav = $("<nav/>").addClass("navbar navbar-default");
			nav.addClass("navbar-" + options.type + "-" + options.position);
			if (options.inverse) nav.addClass("navbar-inverse");
			var container = $("<div/>").addClass("container-" + (options.fluid ? "fluid" : ""));
			nav.append(container);
			ul.before(nav);
			
			// Добавление заголовка навигационной панели
			if (options.brand && $.trim(options.brand) != "") {
			    if (typeof(options.brand) == "string") {
			        options.brand = { title: options.brand };
			    }
			    options.brand = $.extend({
			        fontFamily: "lobster",
			        url: "/"
			    }, options.brand);
			    var brand = $("<a/>").addClass("navbar-brand").addClass(options.brand.fontFamily).attr("href", options.brand.url).text(options.brand.title);
			    container.append(brand);
			}
			
			container.append(ul);
			
			return nav; 
		}
		
		function convertToDropdown(li) {
			li.addClass("dropdown");
			
			var hasIcons = li.find("a[icon!='']").size();
			
			li.each(function(index, li) {
				li = $(li);
				
				var level = li.parents("ul").size();
				
				if (options.bluring && level == 1) li.addClass("bluring");

				var ul = li.find(">ul");
				var a = li.find(">a");
				
				if (li.text() == "divider" && !ul.size()) {
					li.addClass("divider");
					li.empty();
				} else if (!a.size()) {
				    li.removeClass("dropdown");
					li.addClass("dropdown-header");
				} {
					var title = a.html();
					a.empty();
					
					if (hasIcons) {
    					var icon = a.attr("icon") || "space";
    					a.removeAttr("icon");
						icon = $("<i/>").addClass("glyphicon glyphicon-" + icon);
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

