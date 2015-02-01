
$(function() {
	
	/*var navbar = $("<div/>").addClass("navbar navbar-default navbar-static-top");
	
	var container = $("<div/>").addClass("container");
	
	var ul = $("<ul/>").addClass("nav navbar-nav");
	
	var li_1 = $('<li><a href="#"><i class="glyphicon glyphicon-home"></i> Главная</a></li>');
	var li_2 = $('				<li class="dropdown">\
			<a href="#" class="dropdown-toggle" data-toggle="dropdown">Компания <b class="caret"></b></a>\
			<ul class="dropdown-menu">\
				<li><a href="#">Информация о компании</a></li>\
				<li><a href="#">Свидетельства о регистрациях</a></li>\
				<li><a href="#">Вакансии</a></li>\
				<li class="divider"></li>\
				<li><a href="#">Контактная информация</a></li>\
			</ul>\
		</li>');
	
	ul.append(li_1);
	ul.append(li_2);
	container.append(ul);
	navbar.append(container);
	$("body").prepend(navbar);*/
	
	
	// Прикрепляем обработчики на дропдауны менюбара, чтобы фон размывался, когда открыты меню
	
	$('.bluring').on('show.bs.dropdown', function () {
		$("#pagebody").addClass("blur");
	});
	
	$('.bluring').on('hide.bs.dropdown', function () {
		$("#pagebody").removeClass("blur");
	});

});

