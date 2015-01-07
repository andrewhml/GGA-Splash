
function loadNav(){
    var deferred = $.Deferred();
	$("#nav").load("templates/nav.htm", function(data){
		deferred.resolve(data);
	});//end nav load
    return deferred.promise();
}

function loadContact(){
    var deferred = $.Deferred();
	$("#form_container").load("templates/contact_form.htm",function(data){
		deferred.resolve(data);
	});//end contact load
    return deferred.promise();
}

function loadFooter(){
    var deferred = $.Deferred();
	$("#footer").load("templates/footer.htm",function(data){
		deferred.resolve(data);
	});//end footer load
    return deferred.promise();
}

function loadDemoModal(){
	var deferred = $.Deferred(); 
	$("#demo_modal").load("templates/demo_modal.htm", function(data){
		deferred.resolve(data);
	});//end modal load
	return deferred.promise(); 
}

function pageAfterLoadFunctions(){
	jQuery.fn.redraw = function() {
	return this.hide(0, function(){jQuery(this).show()});
	};
	jQuery(document).ready(function() {
	jQuery('body').redraw();
	});
	headerHeight = $("#header").height();
	$("#nav_expander").click(function(event){
		event.stopPropagation();
		$(this).parent("ul").toggleClass("active");
	});//end nav expand function
	$("#form_container > div").css("height",windowHeight-headerHeight + "px");
	$("#form_container").css("top",-windowHeight+"px");
	$(".tabs").tabs({show:{duration:200},hide:{duration:200}});
	$("footer").find(".copyright").append(currentYear);
	$("#contact_select").click(function(evt){
		evt.stopPropagation();
		evt.preventDefault();
		$("#nav > ul").removeClass("active");
		$("#form_container").toggleClass("active");
		$("#form_container").animate({
			"opacity":1
		},0);//end animation
		$("#header").toggleClass("form_active");
		$("#contentDiv").toggleClass("form_active");
		$("body").toggleClass("form_active");
		$("#footer").toggleClass("form_active");
		if(windowWidth<=1000){

		}

	})//end contact click function
		$(".demo_button").click(function(){
			$("#demo_modal .modal").addClass("active");
		})
		$("#demo_modal").find(".close").click(function(){
			$("#demo_modal .modal").removeClass("active");
		});

		$(document).mouseup(function(e){
            var container = $(".modal .inner");
            var target = $(e.target);
            if(!container.is(e.target) && container.has(e.target).length===0 ){
                $(".modal").removeClass("active");
            } 
			
        });//end mouseup

	$("#form_close").click(function(){
		$("#form_container").removeClass("active")
		$("#form_container").animate({
			"opacity":1
		},0);//end animation
		$("#header").removeClass("form_active");
		$("#contentDiv").removeClass("form_active");
		$("body").removeClass("form_active");
		$("#footer").removeClass("form_active");
	});//end form close function
}
$(function(){
	windowHeight = $(window).height(); 
	windowWidth = $(window).width(); 
	currentYear = (new Date).getFullYear();
	$(".tabs").tabs({show:{duration:200},hide:{duration:200}});

	$.when(loadNav(),loadContact(),loadFooter(),loadDemoModal()).then(function(){ 
		pageAfterLoadFunctions();
	});
	
	$(window).resize(function(){
		headerHeight = $("#header").height();
		windowWidth = $(window).width(); 
		formHeight = $("#form_container").height();
		windowHeight = $(window).height();
		$("#form_container").css("top",-formHeight+"px");
		$("#form_container > div").css("height",formHeight + "px");
	});//end window resize function



});//end fucntion ready.