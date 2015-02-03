
$(function() {
	
	
	// Прикрепляем обработчики на дропдауны менюбара, чтобы фон размывался, когда открыты меню
	
	$(".bluring").on("show.bs.dropdown", function () {
		$("#pagebody").addClass("blur");
	});
	
	$(".bluring").on("hide.bs.dropdown", function () {
		$("#pagebody").removeClass("blur");
	});
	
	
	
	$("#mainmenu").bootstrapConvertToNavbar({
		brand: "Электролаборатория"
	});
	
	

});

