
/**
 * Плагины для Twitter Bootstrap 3
 * Автор: Хусамов С.А.
 * Сайт автора: http://khusamov.ru/
 */

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
			
			if (options.type == "affixed") {
				var prev = nav.prevAll();
				nav.affix({
					offset: {
						top: function() {
							var offsetTop = 0;
							prev.each(function() {
								offsetTop += $(this).outerHeight(true);
							});
							return offsetTop;
						}
					}
				});
			}
		};
		
		function convertToNav(ul) {
			ul = $(ul);
			ul.addClass("nav");
			ul.addClass("navbar-nav");
			convertToDropdown(ul.find(">li"));
			
			// Основные настройки навигационной панели
			
			var type = options.type;
			if (options.type == "affixed") type = "static";
			
			var nav = $("<nav/>").addClass("navbar navbar-default");
			nav.addClass("navbar-" + type + "-" + options.position);
			if (options.inverse) nav.addClass("navbar-inverse");
			var container = $("<div/>").addClass("container-" + (options.fluid ? "fluid" : ""));
			nav.append(container);
			ul.before(nav);
			
			if (options.type == "affixed") {
				nav.attr("data-spy", "affix").css({
					width: "100%",
					top: "0px"
				});
			}
			
			// Добавление заголовка навигационной панели
			
			if (options.brand && $.trim(options.brand) != "") {
			    if (typeof(options.brand) == "string") {
			        options.brand = { title: options.brand };
			    }
			    options.brand = $.extend({
			        fontFamily: "lobster",
			        url: "/"
			    }, options.brand);
			    
			    var brand = $("<a/>")
			    	.addClass("navbar-brand")
			    	.addClass(options.brand.fontFamily)
			    	.attr("href", options.brand.url)
			    	.text(options.brand.title);
			    	
			    container.append(brand);
			}
			
			container.append(ul);
			
			return nav; 
		}
		
		function convertToDropdown(li) {
			li.addClass("dropdown");
			
			// Проверяем наличие иконок выбранных разделов
			// Также проверяем наличие иконок подразделов тех разделов, чей тип равен header
			// Считаем что есть иконки, если будет найдена хотя бы одна
			var hasIcons = li.add(li.filter("[type='header']").find(">ul>li")).find("a[icon!='']").size();
			
			li.each(function(index, li) {
				li = $(li);
				
				var level = li.parents("ul").size();
				
				if (options.bluring && level == 1) li.addClass("bluring");

				var ul = li.find(">ul");
				var a = li.find(">a");
				
				if (li.attr("type") == "divider") {
					li.addClass("divider");
					li.empty();
				} else if (li.attr("type") == "header") {
				    li.removeClass("dropdown");
					li.addClass("dropdown-header");
					convertToDropdown(ul.find(">li").insertAfter(li));
					li.html(a.html());
					li.before($("<li/>").addClass("divider"));
				} else {
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

