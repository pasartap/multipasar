jQuery(document).ready(function() {
      window.show_multiple_currencies = '{{ settings.show_multiple_currencies }}';
		jQuery("ul.dropdown li").has("ul.dropdown").find('>span').click(function(e) {
			if (!jQuery(".visible-phone").is(":visible")) {
				e.preventDefault();
				var currentParentMenu = jQuery(this).parents(".parent-mega-menu");
				var subMegaMenu = jQuery(this).parents(".row").find(".sub-mega-menu");
				var parentLink = jQuery(this).prev();
				var grandParentLink = jQuery(this).parents(".inner").find(">a");
				subMegaMenu.find(".inner").html(jQuery(this).next().clone());
				subMegaMenu.find(".parent-link a:eq(0)").attr("href", grandParentLink.attr("href")).text(grandParentLink.text());
				subMegaMenu.find(".parent-link a:eq(1)").attr("href", parentLink.attr("href")).text(parentLink.text());
				subMegaMenu.find(".parent-link span.up").click(function() {
					subMegaMenu.slideUp();
					currentParentMenu.slideDown();
				});
				currentParentMenu.slideUp();
				subMegaMenu.slideDown();
			}
		});
	});
	(function(e) {
		if (!e(".header-mobile").is(":visible")) {
			e(document).on("click touchstart", function(n) {
				var i = e("#dropdown-cart");
				var s = e("#cartToggle");
				if (!i.is(n.target) && i.has(n.target).length === 0 && !s.is(n.target) && s.has(n.target).length === 0) {
					t.closeDropdownCart();
					t.closeEmailModalWindow();
				}
			})
		}
		e(document).keyup(function(n) {
			if (n.keyCode == 27) {
				t.closeDropdownCart();
				if (e(".modal").is(":visible")) {
					e(".modal").fadeOut(500)
				}
			}
		});
		e(document).ready(function() {
			t.init()
		});
		var t = {
			elantraTimeout: null,
			init: function() {
				this.initDropDownCart();
				this.initAddToCart();
     			this.initModal();
				this.initProductAddToCart();
			},

			showModal: function(n) {
				e(n).fadeIn(500);
				t.elantraTimeout = setTimeout(function() {
					e(n).fadeOut(500)
				}, 5e3)
			},
			checkItemsInDropdownCart: function() {
				if (e("#dropdown-cart .mini-products-list").children().length > 0) {
					e("#dropdown-cart .no-items").hide();
					e("#dropdown-cart .has-items").show()
				} else {
					e("#dropdown-cart .has-items").hide();
					e("#dropdown-cart .no-items").show()
				}
			},
			initModal: function() {
				e(".continue-shopping").click(function() {
					clearTimeout(t.elantraTimeout);
					e(".ajax-success-modal").fadeOut(500)
				});
				e(".close-modal, .overlay").click(function() {
					clearTimeout(t.elantraTimeout);
					e(".ajax-success-modal").fadeOut(500)
				})
			},
			initDropDownCart: function() {
				if (window.dropdowncart_type == "click") {
					e("#cartToggle").click(function() {
						if (e("#dropdown-cart").is(":visible")) {
							e("#dropdown-cart").slideUp("fast")
						} else {
							e("#dropdown-cart").slideDown("fast")
						}
					})
				} else {
					if (!("ontouchstart" in document)) {
						e("#cartToggle").hover(function() {
							if (!e("#dropdown-cart").is(":visible")) {
								e("#dropdown-cart").slideDown("fast")
							}
						});
						e(".wrapper-top-cart").mouseleave(function() {
							e("#dropdown-cart").slideUp("fast")
						})
					} else {
						e("#cartToggle").click(function() {
							if (e("#dropdown-cart").is(":visible")) {
								e("#dropdown-cart").slideUp("fast")
							} else {
								e("#dropdown-cart").slideDown("fast")
							}
						})
					}
				}
				t.checkItemsInDropdownCart();
				e("#dropdown-cart .no-items a").click(function() {
					e("#dropdown-cart").slideUp("fast")
				});
				e("#dropdown-cart a.btn-remove").live("click", function(n) {
					n.preventDefault();
					var r = e(this).parents(".item").attr("id");
					r = r.match(/\d+/g);
					Shopify.removeItem(r, function(e) {
						t.doUpdateDropdownCart(e);
                    
					})
                   
				})
			},
			closeDropdownCart: function() {
				if (e("#dropdown-cart").is(":visible")) {
					e("#dropdown-cart").slideUp("fast")
				}
			},
			initProductAddToCart: function() {
				if (e("#product-add-to-cart").length > 0) {
					e("#product-add-to-cart").click(function(n) {
						n.preventDefault();
						if (e(this).attr("disabled") != "disabled") {
							if (!window.ajax_cart) {
								e(this).closest("form").submit()
							} else {
								var r = e("#add-to-cart-form select[name=id]").val();
								if (!r) {
									r = e("#add-to-cart-form input[name=id]").val()
								}
								var i = e("#add-to-cart-form input[name=quantity]").val();
								if (!i) {
									i = 1
								}
								var s = e(".product-title h2").text();
								var o = e("#product-featured-image").attr("src");
								t.doAjaxAddToCart(r, i, s, o)
							}
						}
						return false
					})
				}
			},
			initAddToCart: function() {
				if (e(".add-to-cart-btn").length > 0) {
					e(".add-to-cart-btn").click(function(n) {
						n.preventDefault();
						if (e(this).attr("disabled") != "disabled") {
							var r = e(this).parents(".product-item");
							var i = e(r).attr("data-id");
                          
							i = i.match(/\d+/g);
							if (window.ajax_cart) {
                             
								e(".product-actions-" + i).submit();
							} else {
								var s = e(".product-actions-" + i + " select[name=id]").val();
                             
								if (!s) {
                                 
									s = e(".product-actions-" + i + " input[name=id]").val()
								}
								var o = e(".product-actions-" + i + " input[name=quantity]").val();
								if (!o) {
									o = 1
								}
                               
								var u = e(r).find(".product-title").text();
								var a = e(r).find(".product-grid-image img").attr("src");
								t.doAjaxAddToCart(s, o, u, a)
							}
						}
						return false;
					})
				}
			},
			showLoading: function() {
				e(".loading-modal").show()
			},
			hideLoading: function() {
				e(".loading-modal").hide()
			},
			doAjaxAddToCart: function(n, r, i, s) {
				e.ajax({
					type: "post",
					url: "/cart/add.js",
					data: "quantity=" + r + "&id=" + n,
   
					dataType: "json",
					beforeSend: function() {
						t.showLoading()
					}
                  ,
					success: function(n) {
                       
						t.hideLoading();
						e(".ajax-success-modal").find(".ajax-product-title").text(i);
						e(".ajax-success-modal").find(".ajax-product-image").attr("src", s);
						e(".ajax-success-modal").find(".btn-go-to-cart").show();
						t.showModal(".ajax-success-modal");
                       
						t.updateDropdownCart();
                     //  e(".cart_popup").show();
                      // e(".cart_popup").delay(40).show();
                      e('.cart_popup').delay(300).slideDown(300);
  	                  e('.cart_popup').delay(2000).slideUp(400);
                 
                      
					},
					error: function(n, r) {
						t.hideLoading();
						e(".ajax-error-message").text(e.parseJSON(n.responseText).description);
						t.showModal(".ajax-error-modal")
					}
				})
			},
			updateDropdownCart: function() {
				Shopify.getCart(function(r) {
					t.doUpdateDropdownCart(r)
				})
			},
          
		
	doUpdateDropdownCart: function(n) {
               
               
              
			var r = '<li class="item" id="cart-item-{ID}"><a href="{URL}" title="{TITLE}" class="product-image"><img src="{IMAGE}" alt="{TITLE}"></a><div class="product-details"><a href="javascript:void(0)" title="Remove This Item" class="btn-remove">X</a><p class="product-name"><a href="{URL}">{TITLE}</a></p><div class="cart-collateral">{QUANTITY} x <span class="money">{PRICE}</span></div></div></li>';
			e(".count").text(n.item_count);
      
       		
     e('#currencies > option').each(function() {
       var curtype = Shopify.formatMoney(Currency.convert(n.total_price, shopCurrency, e(this).val()), Currency.money_format[e(this).val()]);
  
         e(".carttop .money").attr('data-currency-'+e(this).val(),curtype);
       e("#dropdown-cart .summary .money").attr('data-currency-'+e(this).val(),curtype);
});
     
                        
       e(".carttop .money").html(Shopify.formatMoney(Currency.convert(n.total_price, shopCurrency, jQuery("#currencies").val()), Currency.money_format[jQuery("#currencies").val()]));
 
      e("#dropdown-cart .summary .money").html(Shopify.formatMoney(Currency.convert(n.total_price, shopCurrency, jQuery("#currencies").val()), Currency.money_format[jQuery("#currencies").val()]));
			
      e("#dropdown-cart .mini-products-list").html("");
				if (n.item_count > 0) {
					for (var i = 0; i < n.items.length; i++) {
						var s = r;
						s = s.replace(/\{ID\}/g, n.items[i].id);
						s = s.replace(/\{URL\}/g, n.items[i].url);
						s = s.replace(/\{TITLE\}/g, n.items[i].title);
						s = s.replace(/\{QUANTITY\}/g, n.items[i].quantity);
						s = s.replace(/\{IMAGE\}/g, Shopify.resizeImage(n.items[i].image, "small"));
						s = s.replace(/\{PRICE\}/g, Shopify.formatMoney(n.items[i].price, window.formatMoney));
						e("#dropdown-cart .mini-products-list").append(s)
					}
					e("#dropdown-cart .btn-remove").click(function(n) {
						n.preventDefault();
						var r = e(this).parents(".item").attr("id");
						r = r.match(/\d+/g);
						Shopify.removeItem(r, function(e) {
							t.doUpdateDropdownCart(e);
                         
						})
                        
					});
					if (t.checkNeedToConvertCurrency()) {
						Currency.convertAll(shopCurrency, jQuery("#currencies").val(), ".top-cart-contain span.money", window.formatMoney)
					}
				}
				t.checkItemsInDropdownCart();
             
			},
			checkNeedToConvertCurrency: function() {
				return window.show_multiple_currencies && Currency.currentCurrency != shopCurrency
			},
			convertToSlug: function(e) {
				return e.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
			}
		}
            

        
	})(jQuery)
    
    

      function currenciesCallbackSpecial(id){ 
      jQuery(id).each(function() {
      jQuery(this).attr('data-currency-{{ shop.currency }}', jQuery(this).html());
    });
    Currency.convertAll(shopCurrency, Currency.cookie.read(), id, window.formatMoney);
  }
  

