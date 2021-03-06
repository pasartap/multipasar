jQuery(document).ready(function() {
	// disable quick view button
  $("product-grid-image").hover(function() {
      $('.sca-qv-button').contents().remove('');
  });

  // set checkout button enablement when timeslot is selected
  (function ($) {
    $.each(['show', 'hide'], function (i, ev) {
      var el = $.fn[ev];
      $.fn[ev] = function () {
        this.trigger(ev);

        
          if ($(this).is('.pt-time')) {
            var totalPrice  = parseFloat(document.querySelector('.money').innerHTML.replace('RM', ''));        
            var order_minimum = parseFloat(20).toFixed(2);
            if (ev == 'show' && totalPrice >= order_minimum) {
              $("#dropdown-cart").find('.btn').removeAttr('disabled');
              $("#mobile-cart").find('.btn-checkout-mobile').removeAttr('disabled'); 
            } else if (ev == 'hide') {
              $("#dropdown-cart").find('.btn').attr('disabled', 'disabled');
              $("#mobile-cart").find('.btn-checkout-mobile').attr('disabled', 'disabled');   
            }           
          }
        

        return el.apply(this, arguments);
      };
    });
  })(jQuery);
  
  // fix issue of clicking prev/next datepicker buttons closes the cart
  $(".ui-datepicker-prev").live('click', function(e) {
    e.stopPropagation();
  });

  $(".ui-datepicker-next").live('click', function(e) {
    e.stopPropagation();
  });

  // apply styling to 'edit account details' page
  $('#customr h1').replaceWith(function () {
      return '<h2 class="page_title">Edit Account Details</h2>';
  });

  $('#customr a[href="/account"]').remove();

  $('#customr-edit').find(':text').addClass('form-control');
  $('#customr-edit').find(':text').attr('size', '40');
  $('#customr-edit').find(':text').css({
    "margin-top": "5px",
    "font-weight": "normal"
  });

  $('#customr-edit').find('input[type=email]').addClass('form-control');
  $('#customr-edit').find('input[type=email]').attr('size', '40');
  $('#customr-edit').find('input[type=email]').css({
    "margin-top": "5px",
    "font-weight": "normal"
  });

  $('#customr').find(':submit').addClass('btn btn-primary');
  $('<a class="btn btn-primary" style="margin-right:5px" href="/account">Back</a>').insertBefore('#customr-edit :submit');
  $('.reset-password').css('margin-top', '5px');
});