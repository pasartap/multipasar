/*!
 * Validator v0.11.9 for Bootstrap 3, by @1000hz
 * Copyright 2017 Cina Saffary
 * Licensed under http://opensource.org/licenses/MIT
 *
 * https://github.com/1000hz/bootstrap-validator
 RFQv2.0
 */

+function(a){"use strict";function b(b){return b.is('[type="checkbox"]')?b.prop("checked"):b.is('[type="radio"]')?!!a('[name="'+b.attr("name")+'"]:checked').length:b.is("select[multiple]")?(b.val()||[]).length:b.val()}function c(b){return this.each(function(){var c=a(this),e=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b),f=c.data("bs.validator");(f||"destroy"!=b)&&(f||c.data("bs.validator",f=new d(this,e)),"string"==typeof b&&f[b]())})}var d=function(c,e){this.options=e,this.validators=a.extend({},d.VALIDATORS,e.custom),this.$element=a(c),this.$btn=a('button[type="submit"], input[type="submit"]').filter('[form="'+this.$element.attr("id")+'"]').add(this.$element.find('input[type="submit"], button[type="submit"]')),this.update(),this.$element.on("input.bs.validator change.bs.validator focusout.bs.validator",a.proxy(this.onInput,this)),this.$element.on("submit.bs.validator",a.proxy(this.onSubmit,this)),this.$element.on("reset.bs.validator",a.proxy(this.reset,this)),this.$element.find("[data-match]").each(function(){var c=a(this),d=c.attr("data-match");a(d).on("input.bs.validator",function(){b(c)&&c.trigger("input.bs.validator")})}),this.$inputs.filter(function(){return b(a(this))&&!a(this).closest(".has-error").length}).trigger("focusout"),this.$element.attr("novalidate",!0)};d.VERSION="0.11.9",d.INPUT_SELECTOR=':input:not([type="hidden"], [type="submit"], [type="reset"], button)',d.FOCUS_OFFSET=20,d.DEFAULTS={delay:500,html:!1,disable:!0,focus:!0,custom:{},errors:{match:"Does not match",minlength:"Not long enough"},feedback:{success:"glyphicon-ok",error:"glyphicon-remove"}},d.VALIDATORS={"native":function(a){var b=a[0];return b.checkValidity?!b.checkValidity()&&!b.validity.valid&&(b.validationMessage||"error!"):void 0},match:function(b){var c=b.attr("data-match");return b.val()!==a(c).val()&&d.DEFAULTS.errors.match},minlength:function(a){var b=a.attr("data-minlength");return a.val().length<b&&d.DEFAULTS.errors.minlength}},d.prototype.update=function(){var b=this;return this.$inputs=this.$element.find(d.INPUT_SELECTOR).add(this.$element.find('[data-validate="true"]')).not(this.$element.find('[data-validate="false"]').each(function(){b.clearErrors(a(this))})),this.toggleSubmit(),this},d.prototype.onInput=function(b){var c=this,d=a(b.target),e="focusout"!==b.type;this.$inputs.is(d)&&this.validateInput(d,e).done(function(){c.toggleSubmit()})},d.prototype.validateInput=function(c,d){var e=(b(c),c.data("bs.validator.errors"));c.is('[type="radio"]')&&(c=this.$element.find('input[name="'+c.attr("name")+'"]'));var f=a.Event("validate.bs.validator",{relatedTarget:c[0]});if(this.$element.trigger(f),!f.isDefaultPrevented()){var g=this;return this.runValidators(c).done(function(b){c.data("bs.validator.errors",b),b.length?d?g.defer(c,g.showErrors):g.showErrors(c):g.clearErrors(c),e&&b.toString()===e.toString()||(f=b.length?a.Event("invalid.bs.validator",{relatedTarget:c[0],detail:b}):a.Event("valid.bs.validator",{relatedTarget:c[0],detail:e}),g.$element.trigger(f)),g.toggleSubmit(),g.$element.trigger(a.Event("validated.bs.validator",{relatedTarget:c[0]}))})}},d.prototype.runValidators=function(c){function d(a){return c.attr("data-"+a+"-error")}function e(){var a=c[0].validity;return a.typeMismatch?c.attr("data-type-error"):a.patternMismatch?c.attr("data-pattern-error"):a.stepMismatch?c.attr("data-step-error"):a.rangeOverflow?c.attr("data-max-error"):a.rangeUnderflow?c.attr("data-min-error"):a.valueMissing?c.attr("data-required-error"):null}function f(){return c.attr("data-error")}function g(a){return d(a)||e()||f()}var h=[],i=a.Deferred();return c.data("bs.validator.deferred")&&c.data("bs.validator.deferred").reject(),c.data("bs.validator.deferred",i),a.each(this.validators,a.proxy(function(a,d){var e=null;!b(c)&&!c.attr("required")||void 0===c.attr("data-"+a)&&"native"!=a||!(e=d.call(this,c))||(e=g(a)||e,!~h.indexOf(e)&&h.push(e))},this)),!h.length&&b(c)&&c.attr("data-remote")?this.defer(c,function(){var d={};d[c.attr("name")]=b(c),a.get(c.attr("data-remote"),d).fail(function(a,b,c){h.push(g("remote")||c)}).always(function(){i.resolve(h)})}):i.resolve(h),i.promise()},d.prototype.validate=function(){var b=this;return a.when(this.$inputs.map(function(){return b.validateInput(a(this),!1)})).then(function(){b.toggleSubmit(),b.focusError()}),this},d.prototype.focusError=function(){if(this.options.focus){var b=this.$element.find(".has-error:first :input");0!==b.length&&(a("html, body").animate({scrollTop:b.offset().top-d.FOCUS_OFFSET},250),b.focus())}},d.prototype.showErrors=function(b){var c=this.options.html?"html":"text",d=b.data("bs.validator.errors"),e=b.closest(".form-group"),f=e.find(".help-block.with-errors"),g=e.find(".form-control-feedback");d.length&&(d=a("<ul/>").addClass("list-unstyled").append(a.map(d,function(b){return a("<li/>")[c](b)})),void 0===f.data("bs.validator.originalContent")&&f.data("bs.validator.originalContent",f.html()),f.empty().append(d),e.addClass("has-error has-danger"),e.hasClass("has-feedback")&&g.removeClass(this.options.feedback.success)&&g.addClass(this.options.feedback.error)&&e.removeClass("has-success"))},d.prototype.clearErrors=function(a){var c=a.closest(".form-group"),d=c.find(".help-block.with-errors"),e=c.find(".form-control-feedback");d.html(d.data("bs.validator.originalContent")),c.removeClass("has-error has-danger has-success"),c.hasClass("has-feedback")&&e.removeClass(this.options.feedback.error)&&e.removeClass(this.options.feedback.success)&&b(a)&&e.addClass(this.options.feedback.success)&&c.addClass("has-success")},d.prototype.hasErrors=function(){function b(){return!!(a(this).data("bs.validator.errors")||[]).length}return!!this.$inputs.filter(b).length},d.prototype.isIncomplete=function(){function c(){var c=b(a(this));return!("string"==typeof c?a.trim(c):c)}return!!this.$inputs.filter("[required]").filter(c).length},d.prototype.onSubmit=function(a){this.validate(),(this.isIncomplete()||this.hasErrors())&&a.preventDefault()},d.prototype.toggleSubmit=function(){this.options.disable&&this.$btn.toggleClass("disabled",this.isIncomplete()||this.hasErrors())},d.prototype.defer=function(b,c){return c=a.proxy(c,this,b),this.options.delay?(window.clearTimeout(b.data("bs.validator.timeout")),void b.data("bs.validator.timeout",window.setTimeout(c,this.options.delay))):c()},d.prototype.reset=function(){return this.$element.find(".form-control-feedback").removeClass(this.options.feedback.error).removeClass(this.options.feedback.success),this.$inputs.removeData(["bs.validator.errors","bs.validator.deferred"]).each(function(){var b=a(this),c=b.data("bs.validator.timeout");window.clearTimeout(c)&&b.removeData("bs.validator.timeout")}),this.$element.find(".help-block.with-errors").each(function(){var b=a(this),c=b.data("bs.validator.originalContent");b.removeData("bs.validator.originalContent").html(c)}),this.$btn.removeClass("disabled"),this.$element.find(".has-error, .has-danger, .has-success").removeClass("has-error has-danger has-success"),this},d.prototype.destroy=function(){return this.reset(),this.$element.removeAttr("novalidate").removeData("bs.validator").off(".bs.validator"),this.$inputs.off(".bs.validator"),this.options=null,this.validators=null,this.$element=null,this.$btn=null,this.$inputs=null,this};var e=a.fn.validator;a.fn.validator=c,a.fn.validator.Constructor=d,a.fn.validator.noConflict=function(){return a.fn.validator=e,this},a(window).on("load",function(){a('form[data-toggle="validator"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery);

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD (Register as an anonymous module)
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {

  var pluses = /\+/g;

  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }

  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
      // Replace server-side written pluses with spaces.
      // If we can't decode the cookie, ignore it, it's unusable.
      // If we can't parse the cookie, ignore it, it's unusable.
      s = decodeURIComponent(s.replace(pluses, ' '));
      return config.json ? JSON.parse(s) : s;
    } catch(e) {}
  }

  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }

  var config = $.cookie = function (key, value, options) {

    // Write

    if (arguments.length > 1 && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
      }

      return (document.cookie = [
        encode(key), '=', stringifyCookieValue(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        options.secure  ? '; secure' : ''
      ].join(''));
    }

    // Read

    var result = key ? undefined : {},
        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        cookies = document.cookie ? document.cookie.split('; ') : [],
        i = 0,
        l = cookies.length;

    for (; i < l; i++) {
      var parts = cookies[i].split('='),
          name = decode(parts.shift()),
          cookie = parts.join('=');

      if (key === name) {
        // If second argument (value) is a function it's a converter...
        result = read(cookie, value);
        break;
      }

      // Prevent storing a cookie that we couldn't decode.
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }

    return result;
  };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    // Must not alter options, thus extending a fresh object...
    $.cookie(key, '', $.extend({}, options, { expires: -1 }));
    return !$.cookie(key);
  };

}));


(function(){

  window.GRFQApp = {};

  var loadScript = function(url, callback, errcallback){
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState){// If the browser is Internet Explorer.
      script.onreadystatechange = function(){
        if (script.readyState == "loaded" || script.readyState == "complete"){
          script.onreadystatechange = null;
          callback();
        }
      };
      setTimeout(function(){
        if(script.onreadystatechange !== null){
          if(errcallback !== undefined) errcallback();
        }
      },3000);
    } else { // For any other browser.
      script.onload = function(){
        callback();
      };
      script.onerror = function(){
        if(errcallback !== undefined) errcallback();
      }
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };
  GRFQApp.AppURL = "//app.shopifydevelopers.net/requestforquotev2";
  GRFQApp.init = function($){
    window.spuritJQ = $;
    //AnhEz
    GRFQApp.UpdateQuoteCart();
    //
    $(document).ready(function(){
      var installed = false;
      $("script").each(function() {
        if ($(this).text().indexOf("globorequestforquote_init.js?") != -1 && $(this).text().indexOf("asyncLoad") != -1 && $(this).text().indexOf("initSchema") == -1) {
          installed = true;
        }
      });
      if(installed){
        $(window).keydown(function(event){
          if(event.keyCode == 13) {
            var parent_ = event.target.closest("#rfq_form");
            if(parent_ != null){
                event.preventDefault();
              return false;
            }
          }
        });
        // Show hide Add to cart
        if(GRFQConfigs.show_atc=='0' || GRFQConfigs.show_atc=='1') $(GRFQConfigs.selector.addtocart_selector).attr('style','display:none !important');
        if(GRFQConfigs.show_atc=='2') $(GRFQConfigs.selector.addtocart_selector).attr('style','display:initial !important');

		if(GRFQConfigs.show_price=='0' || GRFQConfigs.show_price=='1') $(GRFQConfigs.selector.price_selector).attr('style','display:none !important');
        if(GRFQConfigs.show_price=='2') $(GRFQConfigs.selector.price_selector).attr('style','display:initial !important');

        if(GRFQApp.getPageType() == 'collection'){

          $.each(GRFQConfigs.disabled_products, function(index, value){
            	// Find add to cart in collection page
            	var parent_cart_selector = $('script[data-id="'+value+'"]').parent();
            	var cart_selector = parent_cart_selector.find(GRFQConfigs.selector.addtocart_selector);
            	var max_loop = 0;
                do{
                  max_loop++;
                  parent_cart_selector = parent_cart_selector.parent();
                  cart_selector = parent_cart_selector.find(GRFQConfigs.selector.addtocart_selector);
                }
                while (cart_selector.length==0 && max_loop<6);
          		if(cart_selector.length>0&&GRFQConfigs.show_atc=='1'){
                  	cart_selector.attr('style','display:initial !important');
            	}
            	// Find price in collection page
            	var parent_price_selector = $('script[data-id="'+value+'"]').parent();
            	var price_selector = parent_price_selector.find(GRFQConfigs.selector.price_selector);
            	var max_loop_ = 0;
            	while (price_selector.length==0 && max_loop_<6){
                  max_loop_++;
                  parent_price_selector = parent_price_selector.parent();
                  price_selector = parent_price_selector.find(GRFQConfigs.selector.price_selector);
                };
          		if(price_selector.length>0&&GRFQConfigs.show_price=='1'){
                  	price_selector.attr('style','display:initial !important');
            	}

          });


        }


        if(GRFQApp.getPageType() == 'product'){

          var id_product = GRFQConfigs.product.id;
          var is_disabled = false;
          $.each(GRFQConfigs.disabled_products, function(index, value){
            if(id_product == value)
              is_disabled = true;
          });

          if(is_disabled){

            if(GRFQConfigs.show_atc=='1') {
              console.log($(GRFQConfigs.selector.addtocart_selector));
              $(GRFQConfigs.selector.addtocart_selector).attr('style','display:initial !important');
            }
            if(GRFQConfigs.show_price=='1') {
              console.log($(GRFQConfigs.selector.price_selector));
              $(GRFQConfigs.selector.price_selector).attr('style','display:initial !important');
            }
          }


          if(GRFQConfigs.product_enable != false && is_disabled == false ){





            if(GRFQConfigs.product_enable == 2){

              var ajax_data = "shop="+GRFQConfigs.shop_url;

              if(GRFQConfigs.customer.name != false)
                ajax_data += "&customer_name="+GRFQConfigs.customer.name;

              if(GRFQConfigs.customer.email != false)
                ajax_data += "&customer_email="+GRFQConfigs.customer.email;

              if(GRFQConfigs.customer.id != false)
                ajax_data += "&customer_id="+GRFQConfigs.customer.id;

              var quote_id = $.cookie(GRFQConfigs.shop_url+"quote.id");
              if (typeof quote_id != 'undefined')
                ajax_data += '&quote='+quote_id;

              $.ajax({
                url: GRFQApp.AppURL+"/getform",
                dataType: 'jsonp',
                type: "POST",
                data: ajax_data,
                success: function(result){
                  if(result.success == true){
                    $(result.html).insertAfter( $("form[action*='cart']:visible, form[action*='checkout']:visible").first() );

                    if( $( ".datepicker" ).length > 0 ){

                      if (typeof jQuery.ui === 'undefined') {
                        loadScript('//code.jquery.com/ui/1.10.4/jquery-ui.min.js', function(){
                          $( ".datepicker" ).datepicker({dateFormat: 'd MM, yy'});
                        });
                      }
                    }

                    $('#rfq_product_form').validator().on('submit', function (e) {
                      if (e.isDefaultPrevented()) {
                        return false;
                      } else {
                        var product_id = GRFQConfigs.product.id
                        data = $('#rfq_product_form').serialize();
                        data += '&product_id='+GRFQConfigs.product.id;

                        var options = "";
                        if($('[name=id]').length > 0){

                          if($('[name=id]').length > 1){
                            var variant_id = $('[name=id]:checked').val();
                          }else{
                            var variant_id = $('[name=id]').val();
                          }


                          data += '&variant_id='+variant_id;
                          data += '&name='+encodeURIComponent(GRFQConfigs.product.title);

                          $.each(GRFQConfigs.product.variants, function(i, variant){
                            if( variant.id == variant_id ){
                              if(variant.title.indexOf('Default') == -1)
                                options = '&option='+variant.title;

                              if( variant.featured_image != null )
                                data += '&image='+variant.featured_image.src;
                              else if( GRFQConfigs.product.featured_image != null )
                                data += '&image='+GRFQConfigs.product.featured_image;
                              else
                                data += '&image='+GRFQConfigs.product.images[0];
                            }
                          });
                        }
                        // Check if Product has price
                        var priceSelector = $("#productPrice");
                        if(priceSelector.length>0||GRFQConfigs.product.price){
                          var price = 0;
                          if(priceSelector.length==1) price = parseFloat((priceSelector.html()).replace(/\D+/g, ''));
                          else price =  GRFQConfigs.product.price;
                          price = (parseFloat(price)/100).toFixed(2);
                          console.log(price);
                          data += '&price='+price;
                        }
                        if( $('[name^="properties"]').length){
                          var properties = {};
                          properties = {};
                          var product_ids = '';
                          var variant_ids='';
                          var product_names='';
                          var product_prices='';
                          var product_qties='';
                          if($('[name="properties[_boldProductIds]"]').length) product_ids    = $('[name="properties[_boldProductIds]"]').val().split(",");
                          if($('[name="properties[_boldVariantIds]"]').length) variant_ids    = $('[name="properties[_boldVariantIds]"]').val().split(",");
                          if($('[name="properties[_boldVariantNames]"]').length) product_names    = $('[name="properties[_boldVariantNames]"]').val().split(",");
                          if($('[name="properties[_boldVariantPrices]"]').length) product_prices    = $('[name="properties[_boldVariantPrices]"]').val().split(",");
                          if($('[name="properties[_boldVariantQtys]"]').length) product_qties    = $('[name="properties[_boldVariantQtys]"]').val().split(",");


                          if(options != '')
                            properties[product_id] = {variant_id: null, name: options, price: null, qty: null};

                          $.each(product_ids, function(i, propertie_product_id){
                            properties[propertie_product_id] = {};
                            properties[propertie_product_id]['variant_id'] = variant_ids[i] || null;
                            properties[propertie_product_id]['name'] = product_names[i].replace("%2C", ",") || null;
                            properties[propertie_product_id]['price'] = product_prices[i] || null;
                            properties[propertie_product_id]['qty'] = product_qties[i] || 1;
                          });
                          options = JSON.stringify(properties);
                        }

//========================================== Running Test for serveral day . Get Option================================================================

                        var add_data = 'product_id='+product_id+'&shop='+GRFQConfigs.shop_url;

                        var form = $('#rfq_product_form');
                        var variant_selector =  form.find('[name=id]');
                        var qty = 0;
                        if($(variant_selector).length > 0){
                          if($(variant_selector).length > 1){
                            var variant_id = form.find('[name=id]:checked').val();
                          }else{
                            var variant_id = $(variant_selector).val();
                          }
                          // SKU

                          if(variant_id){
                            var sku = 0;
                            $.each(GRFQConfigs.product.variants,function(key,item){
                              if(item.id==variant_id){
                                sku = item.sku;
                              }
                            });
                            if(sku) add_data += '&sku='+sku;
                          }


                          add_data += '&variant_id='+variant_id;
                        }
                        var vendor = GRFQConfigs.product.vendor;
                        if(vendor!='') add_data += "&vendor="+vendor;

                        if($('input[name=quantity]').length > 0){
                          add_data += '&qty='+$('[name=quantity]').val();
                          qty = $('[name=quantity]').val();
                        }
                        else {
                          qty = 1;
                          add_data += '&qty=1';
                        }
                        add_data += '&name='+encodeURIComponent(GRFQConfigs.product.title);

                        var options = "";

                        var quote_id = $.cookie(GRFQConfigs.shop_url+"quote.id");
                        console.log(quote_id);
                        if (typeof quote_id != 'undefined')
                          add_data += '&quote='+quote_id;

                      var wrong_variant = true;
                      var image = '';
                        $.each(GRFQConfigs.product.variants, function(i, variant){
                          if( variant.id == variant_id ){
                            wrong_variant = false;
                              console.log("Right variant");
                            if(variant.title.indexOf('Default') == -1)
                              options = variant.title;

                            if( variant.featured_image != null ){
                              image = variant.featured_image.src;
                              add_data += '&image='+variant.featured_image.src;
                            }else if( GRFQConfigs.product.featured_image != null ){
                              image = GRFQConfigs.product.featured_image;
                              add_data += '&image='+GRFQConfigs.product.featured_image;
                            }else{
                              image = GRFQConfigs.product.images[0];
                              add_data += '&image='+GRFQConfigs.product.images[0];
                            }
                          }

                        });
                        if(wrong_variant){
                          image = GRFQConfigs.product.featured_image;
                          add_data += '&image='+GRFQConfigs.product.featured_image;
                        }


                        // Check if Product has price
                        var price = 0;
                        var priceSelector = $("#productPrice");
                        if(priceSelector.length>0||GRFQConfigs.product.price){
                          if(priceSelector.length==1) price = parseFloat((priceSelector.html()).replace(/\D+/g, ''));
                          else price =  GRFQConfigs.product.price;
                          price = (parseFloat(price)/100).toFixed(2);
                          add_data += '&price='+price;;
                        }
                        console.log("option has value is : "+options);
                        if ($('[name^="properties"]').length) {
                            console.log("1");
                            if($('[name="properties[_boldProductIds]"]').length){
                              console.log("1.1");
                              var properties = {};
                              var product_ids = '';
                              var variant_ids='';
                              var product_names='';
                              var product_prices='';
                              var product_qties='';
                              if($('[name="properties[_boldProductIds]"]').length) product_ids    = $('[name="properties[_boldProductIds]"]').val().split(",");
                              if($('[name="properties[_boldVariantIds]"]').length) variant_ids    = $('[name="properties[_boldVariantIds]"]').val().split(",");
                              if($('[name="properties[_boldVariantNames]"]').length) product_names    = $('[name="properties[_boldVariantNames]"]').val().split(",");
                              if($('[name="properties[_boldVariantPrices]"]').length) product_prices    = $('[name="properties[_boldVariantPrices]"]').val().split(",");
                              if($('[name="properties[_boldVariantQtys]"]').length) product_qties    = $('[name="properties[_boldVariantQtys]"]').val().split(",");

                              if (options != '')
                                properties[product_id] = {
                                  variant_id: null,
                                  name: options,
                                  price: null,
                                  qty: null
                                };
                              $.each(product_ids, function(i, propertie_product_id) {
                                properties[propertie_product_id] = {};
                                properties[propertie_product_id].variant_id = variant_ids[i] || null;
                                properties[propertie_product_id].name = product_names[i].replace("%2C", ",") || null;
                                properties[propertie_product_id].price = product_prices[i] || null;
                                properties[propertie_product_id].qty = product_qties[i] || 1
                              });
                              console.log("1.1.1 Prop: ");
                              console.log(properties);
                              options = JSON.stringify(properties);
                            }else{
                              console.log("1.2");
                              var properties = {};
                              if(options!=""){
                                properties["Variant"] = {"name":options};
                              }

                              $.each($('[name^="properties"]').serializeArray(), function(i, input){
                                if(input.value&&input.value!=''){
                                    var k = input.name.replace('properties[', '').replace(']', '');
                                    properties[k] = {};
                                    properties[k].name = k+': '+input.value;
                                }
                              });
                              console.log(properties);
                              options = JSON.stringify(properties);

                            }
                          }
                        add_data += '&option='+options;
                        console.log(options);

                        var dataForm = new FormData($('#rfq_product_form')[0]);
                        console.log(add_data);
                        dataForm.append('shop', GRFQConfigs.shop_url);
                        dataForm.append('name', GRFQConfigs.product.title);
                        dataForm.append('product_id', product_id);
                        dataForm.append('variant_id', variant_id);
                        dataForm.append('vendor', vendor);
                        dataForm.append('sku', sku);
                        dataForm.append('image', image);
                        dataForm.append('option', options);
                        dataForm.append('qty', qty);
                        dataForm.append('price', price);
//========================================== EDD ====================================================================================



                        if($('[name=quantity]').length > 0)
                          data += '&qty='+$('[name=quantity]').val();
                        $.ajax({
                          url: GRFQApp.AppURL+'/quickquote',
                          type: "POST",
                          dataType: 'json',
                          cache: false,
                          contentType: false,
                          processData: false,
                          data: dataForm,
                          crossDomain:true,
                          headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                          success: function(result){
                            if(result.success == true)
                              $('#rfq_product_form').html(result.html);
                          },
                          beforeSend: function() {
                            $("#submitRFQForm").attr("disabled", "disabled");
                          },
                          complete: function() {
                            $("#submitRFQForm").removeAttr("disabled");
                          }
                        });

                        return false;
                      }
                    });
                  }
                },
              });
            }else if(GRFQConfigs.product_enable == 1){
              var index_form = 0;
              var addtocart_btn = $("form[action*='cart'], form[action*='checkout']:visible").first().find('[type=submit]').first();
              $("form[action*='cart'], form[action*='checkout']:visible").each(function(index, element){
                if( $(this).find('[name=id]').length > 0 ){
                  index_form = index;
                  addtocart_btn = $(this).find('[type=submit]').first();
                }
                // find add to cart if not found
                // Please add an class 'g-atc' to button add to cart in liquid file
                if($(addtocart_btn).length==0){
                  addtocart_btn = $(this).find('.g-atc');
                }
              });



              var class_by_theme = '';
              if(typeof GRFQConfigs.theme_store_id !== 'undefined'){
                class_by_theme = 'rfq-btn-'+GRFQConfigs.theme_store_id;
                if(GRFQConfigs.theme_store_id == 782){
                  class_by_theme += ' btn--fill btn--regular btn--color';
                }else if(GRFQConfigs.theme_store_id == 578){
                  class_by_theme += ' btn--secondary';
                }
              }
              if($('.button.rfq-btn').length==0){
                var additional_button_html = '';
                if(GRFQConfigs.shop_url=="foundpop.myshopify.com") additional_button_html = '<svg xmlns="http://www.w3.org/2000/svg" class="foundop-custom-icon" data-name="Layer 1" viewBox="0 0 25 25"><title>FoundPop-Icons</title><path d="M12,0h1V25H12ZM0,13H8.83V12H0Zm16.17-1v1H25V12Z"/></svg>';
                if(GRFQConfigs.shop_url!="jndaudio.myshopify.com" ){
                  if( $(addtocart_btn).length){
                    $('<button type="button" class="btn button rfq-btn '+class_by_theme+'" onclick="GRFQApp.addProduct(this, '+GRFQConfigs.product.id+')">'+GRFQConfigs.translations.button+additional_button_html+'</button>').insertAfter( $(addtocart_btn) );
                  }else if($("form[action*='cart'], form[action*='checkout']").length){
                    $("form[action*='cart']:visible, form[action*='checkout']:visible").first().append($('<button type="button" class="btn button rfq-btn '+class_by_theme+'" onclick="GRFQApp.addProduct(this, '+GRFQConfigs.product.id+')">'+GRFQConfigs.translations.button+additional_button_html+'</button>'));
                  }else{
                    $('<button type="button" class="btn button rfq-btn '+class_by_theme+'" onclick="GRFQApp.addProduct(this, '+GRFQConfigs.product.id+')">'+GRFQConfigs.translations.button+additional_button_html+'</button>').insertAfter( 'select[name="id"]' );
                  }
                }
                else {
                  if( $(addtocart_btn).length){
                    $('<button type="button" class="btn btn-primary rfq-btn '+class_by_theme+'" onclick="GRFQApp.addProduct(this, '+GRFQConfigs.product.id+')">'+GRFQConfigs.translations.button+'</button>').insertAfter( $(addtocart_btn) );
                  }else if($("form[action*='cart'], form[action*='checkout']").length){
                    $("form[action*='cart']:visible, form[action*='checkout']:visible").first().append($('<button type="button" class="btn btn-primary rfq-btn '+class_by_theme+'" onclick="GRFQApp.addProduct(this, '+GRFQConfigs.product.id+')">'+GRFQConfigs.translations.button+'</button>'));
                  }else{
                    $('<button type="button" class="btn btn-primary rfq-btn '+class_by_theme+'" onclick="GRFQApp.addProduct(this, '+GRFQConfigs.product.id+')">'+GRFQConfigs.translations.button+'</button>').insertAfter( 'select[name="id"]' );
                  }
                  //console.log('1');return false;
                }
              }


            }
          }
        }else if(GRFQApp.getPageType() == 'rfq_page') {

          var ajax_data = "shop="+GRFQConfigs.shop_url;

          if(GRFQConfigs.customer.name != false)
            ajax_data += "&customer_name="+GRFQConfigs.customer.name;

          if(GRFQConfigs.customer.email != false)
            ajax_data += "&customer_email="+GRFQConfigs.customer.email;

          if(GRFQConfigs.customer.id != false)
            ajax_data += "&customer_id="+GRFQConfigs.customer.id;

          var quote_id = $.cookie(GRFQConfigs.shop_url+"quote.id");
          if (typeof quote_id != 'undefined')
            ajax_data += '&quote='+quote_id;

          $.ajax({
            url: GRFQApp.AppURL+"/getmainform",
            dataType: 'jsonp',
            type: "POST",
            data: ajax_data,
            success: function(result){
              if(result.success == true){
                $('.rfq_form_page').html(result.html).promise().done(function( arg1 ) {
         					// Custom for foundpop.myshopify.com
                  if(GRFQConfigs.shop_url=="foundpop.myshopify.com"){
                    	 // Check if device is Mobile
                    var isMobile = window.matchMedia("only screen and (max-width: 749px)");
                      if (isMobile.matches) {
                        $.each($('.rfq-table tbody tr'),function(key,row){
                           var price_area = $(this).find('.item_price')
                           if(price_area.length){
                           		$(this).closest('tr').find('td.cart_meta').append(price_area.html());
                             	price_area.parent().remove();
                           }

                        });
                      }else{
                      	loadScript('//unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js', function(){
                        	$('#rfq_form').imagesLoaded( function() {
                            	var height_table = $('#rfq_form > table').height();
                                  if (height_table<200) {
                                      height_table = 200;
                                      $('#rfq_form > table').css('min-height',$('.g-first-left').height()+1);
                                  }
                                                $('.g-first-left').css('min-height',height_table+30);
                              });
                          });
                      }






                  }

        				});

                if( $( ".datepicker" ).length > 0 ){
                  if (typeof jQuery.ui === 'undefined') {
                    loadScript('//code.jquery.com/ui/1.10.4/jquery-ui.min.js', function(){
                      if(GRFQConfigs.shop_url=='foundpop.myshopify.com'){
                          var today = new Date();
                          var next2week = new Date(today.getFullYear(), today.getMonth(),today.getDate() + 14);
                          $( ".datepicker" ).datepicker({
                            dateFormat: 'd MM, yy',
                            minDate: next2week
                          });
                      }else {
                        $( ".datepicker" ).datepicker({dateFormat: 'd MM, yy'});
                      }
                    });
                  }
                }


                // AnhEZ
                $('#rfq_form').validator().on('submit', function (e) {
                  var hasClass_disable = $('#submitRFQForm').hasClass('g-disabled');
                  if (e.isDefaultPrevented()||hasClass_disable) {
                    return false;
                  } else {
                    data = new FormData($('form#rfq_form')[0]);
                    if (typeof quote_id != 'undefined')
                      data.append('quote', quote_id);
                    data.append('shop',GRFQConfigs.shop_url);
                    $.ajax({
                      url: $('#rfq_form').attr('action'),
                      type: "POST",
                      dataType: 'json',
                      cache: false,
                      contentType: false,
                      processData: false,
                      data: data,
                      crossDomain:true,
                      headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                      success: function(result){
                        if(result.success == true){
                          $.removeCookie(GRFQConfigs.shop_url+"quote.id", { path: '/' });
                          $('.rfq_form_page').addClass('text-center').html(result.html);
                        }else {
                          $("#submitRFQForm").val(GRFQConfigs.translations.button);
                          $("#submitRFQForm").removeAttr("disabled").parent().removeClass('g-disabled');
                          $(".submit_error").remove();
                          $('#submitRFQForm').parent().prepend('<div class="submit_error">'+result.html+'</div>');
                        }
                      },
                      beforeSend: function() {
                        if(GRFQConfigs.shop_url=='foundpop.myshopify.com'){
                          //$("#submitRFQForm").attr("disabled", "disabled");
                        }else{
                          $("#submitRFQForm").attr("disabled", "disabled").parent().addClass('g-disabled');
                        }
                        $("#submitRFQForm").val(GRFQConfigs.translations.pagesubmitting);
                      },
                      complete: function(data) {
                      if(data.success == true){
                        $("#submitRFQForm").val(GRFQConfigs.translations.button);
                        $("#submitRFQForm").removeAttr("disabled").parent().removeClass('g-disabled');
                        $('html, body').animate({scrollTop : 0},800);
                        if(GRFQConfigs.redirectUrl!=undefined&&GRFQConfigs.redirectUrl!=""){
                            window.location.href = GRFQConfigs.redirectUrl;
                        }

                      }
                    }
                    });
                    return false;
                  }
                });
                // Anh Ez



                // $('#rfq_form').validator().on('submit', function (e) {
                //     if (e.isDefaultPrevented()) {
                //         return false;
                //     } else {
                //         data = $('#rfq_form').serialize();
                //         if (typeof quote_id != 'undefined')
                //             data += '&quote='+quote_id;
                //         $.ajax({
                //             url: $('#rfq_form').attr('action'),
                //             type: "GET",
                //             dataType: "jsonp",
                //             data: data+'&shop='+GRFQConfigs.shop_url,
                //             success: function(result){
                //                 if(result.success == true){
                //                     $.removeCookie(GRFQConfigs.shop_url+"quote.id", { path: '/' });
                //                     $('.rfq_form_page').html(result.html);
                //                 }
                //             },
                //             beforeSend: function() {
                //                 $("#submitRFQForm").attr("disabled", "disabled");
                //             },
                //             complete: function() {
                //                 $("#submitRFQForm").removeAttr("disabled");
                //             }
                //         });
                //         return false;
                //     }
                // });
              }
            },
          });
        }else if(GRFQApp.getPageType() == 'rfq_history') {
          if(GRFQConfigs.customer.id != false){
            $.ajax({
              url: GRFQApp.AppURL+"/history",
              dataType: 'jsonp',
              type: "POST",
              data: "customer="+GRFQConfigs.customer.id+"&shop="+GRFQConfigs.shop_url,
              success: function(result){
                if(result.success)
                  $('.rfq_history_page').html(result.html);
              }
            });
          }else{
            window.location.href = "/account/login";
          }
        }

        if( GRFQConfigs.collection_enable == true ){

          $('.rfq-collection-script').each(function(){

            var id_product = $(this).data('id');

            var is_disabled = false;

            $.each(GRFQConfigs.disabled_products, function(index, value){
              if(id_product == value){
                is_disabled = true;
              }
            });
            console.log(is_disabled);
            if( is_disabled == false )
              $('<button class="btn button rfq-btn" onclick="GRFQApp.add(this, '+id_product+')">'+GRFQConfigs.translations.button+'</button>').insertAfter(this);


          });

        }
      }

      if(typeof GRFQConfigs.theme_store_id !== 'undefined' && GRFQConfigs.theme_store_id == 782){
        $('button.rfq-btn').addClass('btn--fill btn--regular btn--color');
      }
    });
  }

  GRFQApp.add = function(el, product_id){

    var product_name = GRFQCollection[product_id].title;


    // Custom AnhEz
    var option = "";
    if(GRFQConfigs.shop_url == "airbag-man-suspension.myshopify.com"){
      option = $(el).closest('div.product__inside').find('div.hidden div.rfq_collection div.title').text();
      if(option=="") option = $('#pageContent div.hidden div.rfq_collection div.title').text();
      option = option.replace("Air bag suspension for" , "");

      var productDetail = "";
      var listDetail = $(el).closest('div.product__inside').find('div.hidden div.rfq_collection div.detail ul.vpdetails > li');
      if(listDetail.length==0){
        listDetail = $("#pageContent div.hidden div.rfq_collection div.detail ul.vpdetails > li");

      }
      $.each(listDetail,function(k,line){
        console.log($(line).text());
        productDetail += "<li class='bullet'>"+$(line).text()+"</li>";
      });
      option = encodeURIComponent(option+"<br><b>Product/Vehicle Details:</b><br><ul class='product_detail'>"+productDetail+"</ul>");
    }
    if(GRFQConfigs.shop_url == "pasartap.myshopify.com"){
    	var variant_id = null;
      	var variant_title = null;
        if(GRFQCollection[product_id].variants[0].id) variant_id =  GRFQCollection[product_id].variants[0].id;
    	if(GRFQCollection[product_id].variants[0].title) variant_title = GRFQCollection[product_id].variants[0].title;
    	console.log($(el).closest('div.product-list-item').find('input.qty').val());
    	var qty = 0;
        if(parseInt($(el).closest('div.product-list-item').find('input.qty').val())>0) qty =  parseInt($(el).closest('div.product-list-item').find('input.qty').val()); 
    }
    // Custom AnhEz


    if( GRFQCollection[product_id].featured_image != null )
      product_image = GRFQCollection[product_id].featured_image;
    else
      product_image = GRFQCollection[product_id].images[0];

    var add_data = 'product_id='+product_id+'&name='+product_name+'&image='+product_image+'&option='+option+'&shop='+GRFQConfigs.shop_url;
	if(variant_id) add_data += '&variant_id='+variant_id;
    if(variant_title) add_data += '&option='+variant_title;
    if(qty&&qty>0) add_data += '&qty='+qty; 
    // Check if Product has price
    var priceSelector = $("#productPrice");
    if(priceSelector.length>0||GRFQCollection[product_id].price){
      var price = 0;
      if(priceSelector.length==1) price = parseFloat((priceSelector.html()).replace(/\D+/g, ''));
      else price =  GRFQCollection[product_id].price;
      price = (parseFloat(price)/100).toFixed(2);
      console.log(price);
      add_data += '&price='+price;
    }
    var vendor = GRFQCollection[product_id].vendor;
    if(vendor!='') add_data += "&vendor="+vendor;
    var sku = GRFQCollection[product_id].variants["0"].sku;
    if(sku!='') add_data += "&sku="+sku;
    var quote_id = $.cookie(GRFQConfigs.shop_url+"quote.id");

    if (typeof quote_id != 'undefined')
      add_data += '&quote='+quote_id;
    console.log(add_data);
    $.ajax({
      url: GRFQApp.AppURL+"/add",
      type: "GET",
      dataType: 'jsonp',
      data: add_data,
      success: function(response) {
        if(response.success == true){

          $.cookie(GRFQConfigs.shop_url+"quote.id", response.quote, { expires: 7, path: '/' });

          $("body").append(response.html);
          $('.rfq_overlay').fadeIn();
          $('#rfq_continue_shopping, #close_rfq_popup').click(function(){
            $('.rfq_overlay').fadeOut(300, function(){
              $('.rfq_overlay').remove();
            });
          });
          //AnhEz
          GRFQApp.UpdateQuoteCart();
          //
        }
      },
      beforeSend: function() {
        $(el).attr("disabled", "disabled");
      },
      complete: function() {
        $(el).removeAttr("disabled");
      }
    });
  }

  GRFQApp.addProduct = function(el, product_id){

    var add_data = 'product_id='+product_id+'&shop='+GRFQConfigs.shop_url;

    var form = $(el).closest('form');
    var variant_selector =  form.find('[name=id]');

    if($(variant_selector).length > 0){
      if($(variant_selector).length > 1){
        var variant_id = form.find('[name=id]:checked').val();
      }else{
        var variant_id = $(variant_selector).val();
      }
      // SKU
      console.log(variant_id);
      if(variant_id){
        var sku = '';
        $.each(GRFQConfigs.product.variants,function(key,item){
          if(item.id==variant_id){
            sku = item.sku;
          }
        });
        console.log(sku);
        if(sku) add_data += '&sku='+sku;
      }


      add_data += '&variant_id='+variant_id;
    }
    var vendor = GRFQConfigs.product.vendor;
    if(vendor!='') add_data += "&vendor="+vendor;

    if($('input[name=quantity]').length > 0)
      add_data += '&qty='+$('[name=quantity]').val();
    else add_data += '&qty=1';
    add_data += '&name='+encodeURIComponent(GRFQConfigs.product.title);

    var options = "";

    var quote_id = $.cookie(GRFQConfigs.shop_url+"quote.id");
    console.log(quote_id);
    if (typeof quote_id != 'undefined')
      add_data += '&quote='+quote_id;

  var wrong_variant = true;
    $.each(GRFQConfigs.product.variants, function(i, variant){
      if( variant.id == variant_id ){
        wrong_variant = false;
    console.log("Right variant");
        if(variant.title.indexOf('Default') == -1)
          options = variant.title;

        if( variant.featured_image != null ){
          add_data += '&image='+variant.featured_image.src;
        }else if( GRFQConfigs.product.featured_image != null ){
          add_data += '&image='+GRFQConfigs.product.featured_image;
        }else{

          add_data += '&image='+GRFQConfigs.product.images[0];
        }
      }

    });
    if(wrong_variant){
      add_data += '&image='+GRFQConfigs.product.featured_image;
    }


    // Check if Product has price
    var priceSelector = $("#productPrice");
    if(priceSelector.length>0||GRFQConfigs.product.price){
      var price = 0;
      if(priceSelector.length==1) price = parseFloat((priceSelector.html()).replace(/\D+/g, ''));
      else price =  GRFQConfigs.product.price;
      price = (parseFloat(price)/100).toFixed(2);
      console.log(price);
      add_data += '&price='+price;
    }
    console.log("option has value is : "+options);
    if ($('[name^="properties"]').length) {
        console.log("1");
        if($('[name="properties[_boldProductIds]"]').length){
          console.log("1.1");
          var properties = {};
          var product_ids = '';
          var variant_ids='';
          var product_names='';
          var product_prices='';
          var product_qties='';
          if($('[name="properties[_boldProductIds]"]').length) product_ids    = $('[name="properties[_boldProductIds]"]').val().split(",");
          if($('[name="properties[_boldVariantIds]"]').length) variant_ids    = $('[name="properties[_boldVariantIds]"]').val().split(",");
          if($('[name="properties[_boldVariantNames]"]').length) product_names    = $('[name="properties[_boldVariantNames]"]').val().split(",");
          if($('[name="properties[_boldVariantPrices]"]').length) product_prices    = $('[name="properties[_boldVariantPrices]"]').val().split(",");
          if($('[name="properties[_boldVariantQtys]"]').length) product_qties    = $('[name="properties[_boldVariantQtys]"]').val().split(",");

          if (options != '')
            properties[product_id] = {
              variant_id: null,
              name: options,
              price: null,
              qty: null
            };
          $.each(product_ids, function(i, propertie_product_id) {
            properties[propertie_product_id] = {};
            properties[propertie_product_id].variant_id = variant_ids[i] || null;
            properties[propertie_product_id].name = product_names[i].replace("%2C", ",") || null;
            properties[propertie_product_id].price = product_prices[i] || null;
            properties[propertie_product_id].qty = product_qties[i] || 1
          });
          console.log("1.1.1 Prop: ");
          console.log(properties);
          options = JSON.stringify(properties);
        }else{
          console.log("1.2");
          var properties = {};
          if(options!=""){
            properties["Variant"] = {"name":options};
          }

          $.each($('[name^="properties"]').serializeArray(), function(i, input){
            if(input.value&&input.value!=''){
            	var k = input.name.replace('properties[', '').replace(']', '');
                properties[k] = {};
                properties[k].name = k+': '+input.value;
            }

          });
          console.log(properties);
          options = JSON.stringify(properties);

        }
      }
    console.log(add_data);
    add_data += '&option='+options;
    console.log(add_data);
    $.ajax({
      url: GRFQApp.AppURL+'/add',
      type: "GET",
      dataType: 'jsonp',
      data: add_data,
      success: function(response) {
        if(response.success == true){

          $.cookie(GRFQConfigs.shop_url+"quote.id", response.quote, { expires: 7, path: '/' });

          $("body").append(response.html);
          $('.rfq_overlay').fadeIn();
          $('#rfq_continue_shopping, #close_rfq_popup').click(function(){
            $('.rfq_overlay').fadeOut(300, function(){
              $('.rfq_overlay').remove();
            });
          });
        }
      },
      beforeSend: function() {
        $(el).attr("disabled", "disabled");
      },
      complete: function() {
        $(el).removeAttr("disabled");
        GRFQApp.UpdateQuoteCart();
      }
    });
  }

  GRFQApp.addCustom = function(el, product_id,product_name,product_option,product_image){
    console.log(GRFQConfigs.shop_url);
    var add_data = 'product_id='+product_id+'&name='+product_name+'&image='+product_image+'&option='+product_option+'&shop='+GRFQConfigs.shop_url;

    var quote_id = $.cookie(GRFQConfigs.shop_url+"quote.id");

    if (typeof quote_id != 'undefined')
      add_data += '&quote='+quote_id;

    $.ajax({
      url: "https://app.shopifydevelopers.net/requestforquotev2/add",
      type: "GET",
      dataType: 'jsonp',
      data: add_data,
      success: function(response) {
        if(response.success == true){

          $.cookie(GRFQConfigs.shop_url+"quote.id", response.quote, { expires: 7, path: '/' });

          $("body").append(response.html);
          $('.rfq_overlay').fadeIn();
          $('#rfq_continue_shopping, #close_rfq_popup').click(function(){
            $('.rfq_overlay').fadeOut(300, function(){
              $('.rfq_overlay').remove();
            });
          });
          //AnhEz
          GRFQApp.UpdateQuoteCart();
          //
        }
      },
      beforeSend: function() {
        $(el).attr("disabled", "disabled");
      },
      complete: function() {
        $(el).removeAttr("disabled");
      }
    });
  }
  GRFQApp.viewQuote = function(quote_id){
    $.ajax({
      url: GRFQApp.AppURL+"/viewquote",
      dataType: 'jsonp',
      type: "POST",
      data: "id="+quote_id+"&shop="+GRFQConfigs.shop_url,
      beforeSend: function() {
        $('body, html').animate({scrollTop: $('#quote-preview').offset().top },300);
        $('#quote-preview #quote-preview-loaded').slideUp(150, function(){
          $('#quote-preview #quote-preview-loaded').html("");
          $('#quote-preview #loading-mask').show(150);
        });
      },
      success: function(result){
        $('#quote-preview #loading-mask').hide(150,function(){
          $('#quote-preview #quote-preview-loaded').html(result.html).slideDown(150);
        });
      },
    });
    return false;
  };

  GRFQApp.remove = function(el, item_id){

    var data = "shop="+GRFQConfigs.shop_url+"&item_id="+parseInt(item_id);
    var quote_id = $.cookie(GRFQConfigs.shop_url+"quote.id");
    if (typeof quote_id != 'undefined')
      data += '&quote='+quote_id;

    $.ajax({
      url: GRFQApp.AppURL+"/delete",
      type: "GET",
      dataType: 'jsonp',
      data: data,
      success: function(response){
        if(response.success == true){

          $.cookie(GRFQConfigs.shop_url+"quote.id", response.quote, { expires: 7, path: '/' });
		  var last_row_h = $('#item-'+parseInt(item_id)).height();
          $('#item-'+parseInt(item_id)).fadeOut(150, function(){
            $('#item-'+parseInt(item_id)).remove();
          })
          // if(GRFQConfigs.shop_url=="restaurant-furniture-depot.myshopify.com"){
          //   $(el).closest('tr').fadeOut(150, function(){
          //     $(el).closest('tr').remove();
          //   })
          // }

          if(response.html != ''){
            $('.rfq_form_page').html(response.html);
          }
          //AnhEz
          GRFQApp.UpdateQuoteCart();
          //
          // foundpop.myshopify.com
          if(GRFQConfigs.shop_url=="foundpop.myshopify.com"){
                var height_table = $('#rfq_form > table').height()-last_row_h;
            	var height_left = $('.g-first-left').height();
                if (height_table<200) {
                    height_table = 200;
                    $('#rfq_form > table').css('min-height',$('.g-first-left').height()+1);
                }
                if(height_left>height_table){
                    height_table = height_left-50;
                  	$('#rfq_form > table').css('min-height',height_table);
                }


            	setTimeout(function () {
                    $('.g-first-left').css('min-height',height_table+30);
                 }, 150);

          }

        }
      },
      beforeSend: function() {
        $(el).attr("disabled", "disabled");
      },
      complete: function() {
        $(el).removeAttr("disabled");
      }
    });
  }

  GRFQApp.getPageType = function(){
    var url = window.location.toString();
    if(url.match(/\/products\//) !== null || url.match(/\/products_preview/) !== null){
      return 'product';
    }else if(url.match(/\/cart/) !== null){
      return 'cart';
    }else if(url.match(/\/collections\//) !== null){
      return 'collection';
    }else if(url.match(/\/pages\//) !== null){
      if( url.indexOf(GRFQConfigs.rfq_page) !== -1 )
        return 'rfq_page';
      else if( url.indexOf(GRFQConfigs.rfq_history) !== -1 )
        return 'rfq_history';
      else
        return 'page';
    }else{
      return '';
    }
  };
  // AnhEz
  GRFQApp.UpdateQuoteCart = function(){
    if(GRFQConfigs.shop_url == "airbag-man-suspension.myshopify.com"||GRFQConfigs.shop_url == "foundpop.myshopify.com"){
      var quote_id__ = $.cookie(GRFQConfigs.shop_url+"quote.id");
      console.log("UpdateQuoteCart : before send");
      $.ajax({
        url: "https://"+GRFQApp.AppURL+"/numitem",
        type: "GET",
        dataType: "jsonp",
        data: '&quote_id='+quote_id__,
        success: function(result){
          $(".quotecounter .bigquotecounter").text(result.numberofenquiry);
          $(".cart-icon .quotecount").text(result.numberofenquiry);
          $('.g-quote-item span.g-badge').text(result.numberofenquiry);
          $('.medium-up--hide.small--one-half .site-header__cart span.quotecount').text(result.numberofenquiry);
          if(result.numberofenquiry==0){
            $('.g-quote-item span.g-wrapper-badge , .medium-up--hide.small--one-half .site-header__cart span.quotecount-wrapper').css('display','none');
          }else {
            $('.g-quote-item span.g-wrapper-badge , .medium-up--hide.small--one-half .site-header__cart span.quotecount-wrapper').css('display','initial');
          }
        }
      });
      console.log("UpdateQuoteCart : after send");
    }
  };
  //
  try{
    if ( typeof jQuery === 'undefined' || (jQuery.fn.jquery.split(".")[0] < 2 && jQuery.fn.jquery.split(".")[1] < 7)) {
      var doNoConflict = true;
      if (typeof jQuery === 'undefined') {doNoConflict = false;}
      loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js', function(){
        if (doNoConflict) {
          jQuery17 = jQuery.noConflict(true);
        } else {
          jQuery17 = jQuery;
        }
        GRFQApp.init(jQuery17);
      });
    } else {
      GRFQApp.init(jQuery);
    }
  }
  catch (e){ console.log('GRFQApp app exception: ' + e)}
})();
