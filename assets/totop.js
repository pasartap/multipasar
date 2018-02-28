
var isTouchDevice = ('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0);
jQuery(window).on("load", function() {

if (isTouchDevice)
{
jQuery('#nav a.level-top').click(function(e) {
$t = jQuery(this);
$parent = $t.parent();
if ($parent.hasClass('parent'))
{
if ( !$t.hasClass('menu-ready'))
{                    
jQuery('#nav a.level-top').removeClass('menu-ready');
$t.addClass('menu-ready');
return false;
}
else
{
$t.removeClass('menu-ready');
}
}
});
}
//on load
jQuery().UItoTop();


}); //end: on load

//]]>

/*--------| UItoTop jQuery Plugin 1.1-------------------*/
(function($){
jQuery.fn.UItoTop = function(options) {

var defaults = {
text: '',
min: 200,
inDelay:600,
outDelay:400,
containerID: 'toTop',
containerHoverID: 'toTopHover',
scrollSpeed: 1200,
easingType: 'linear'
};

var settings = $.extend(defaults, options);
var containerIDhash = '#' + settings.containerID;
var containerHoverIDHash = '#'+settings.containerHoverID;

jQuery('body').append('<a href="#" id="'+settings.containerID+'">'+settings.text+'</a>');
jQuery(containerIDhash).hide().click(function(){
jQuery('html, body').animate({scrollTop:0}, settings.scrollSpeed, settings.easingType);
jQuery('#'+settings.containerHoverID, this).stop().animate({'opacity': 0 }, settings.inDelay, settings.easingType);
return false;
})
.prepend('<span id="'+settings.containerHoverID+'"></span>')
.hover(function() {
jQuery(containerHoverIDHash, this).stop().animate({
'opacity': 1
}, 600, 'linear');
}, function() { 
jQuery(containerHoverIDHash, this).stop().animate({
'opacity': 0
}, 700, 'linear');
});

jQuery(window).scroll(function() {
var sd = $(window).scrollTop();
if(typeof document.body.style.maxHeight === "undefined") {
jQuery(containerIDhash).css({
'position': 'absolute',
'top': $(window).scrollTop() + $(window).height() - 50
});
}
if ( sd > settings.min ) 
jQuery(containerIDhash).fadeIn(settings.inDelay);
else 
jQuery(containerIDhash).fadeOut(settings.Outdelay);
});

};
})(jQuery);