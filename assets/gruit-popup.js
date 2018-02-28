var global = (function(){
  var GruitPopup = function(options) {
    Object.defineProperties(this, {
      // Cache selectors
      _body: {
        value: document.body
      },

      // Popup elements
      _popupContainer: {
        value: document.createElement('div')
      },
      _popupButton: {
        value: document.createElement('div')
      },
      _popupNewsContainer: {
        value: document.createElement('div')
      },
      _closeButton: {
        value: document.createElement('button')
      },
      _pulseShadowBlock: {
        value: document.createElement("div")
      },

      // Animation paths
      _animPaths: {
        value: {}
      },

      // Options
      authorPhotoSrc: {
        value: options.authorPhotoSrc || '',
        writable: true
      },
      authorTitle: {
        value: options.authorTitle || 'Hi, I’m Olia',
        writable: true
      },
      authorInfo: {
        value: options.authorInfo || 'author from Congruity Hub',
        writable: true
      },
      delayShow: {
        value: options.delayShow || 10000,
        writable: true
      },
      newsTitle: {
        value: options.newsTitle || 'Fresh news from Congruity Hub ;)',
        writable: true
      },
      newsText: {
        value: options.newsText || 'Check out our new <a href="facebook.com" title="Congruity Hub Facebook Page">Facebook</a> page',
        writable: true
      },
      linkText: {
        value: options.linkText || 'Link',
        writable: true
      },
      linkHref: {
        value: options.linkHref || 'facebook.com',
        writable: true
      },
      pathToCSS: {
        value: options.pathToCSS || 'css/gruit-popup.css',
        writable: true
      },
      pulseAnimation: {
        value: options.pulseAnimation || false,
        writable: true
      },
      useCookie: {
        value: options.useCookie || false,
        writable: true
      },
      uniqueIdentifier: {
        value: options.uniqueIdentifier || '01',
        writable: true
      }
    });

    this.isOpen = false;
    var _this = this;

    if ( this._checkCookie() ) {
      this._delayShowTimeout = setTimeout(function() {
        _this._initPopup();
      }, this.delayShow);
    } else {
      return 0;
    }
  };

  Object.defineProperties(GruitPopup.prototype, {
    _initPopup: {
      value: function(){
        var _this = this;

        this._insertCSS();
        this._initPopupLayout();
        this._animationInit();
      }
    },

    _initPopupLayout: {
      value: function() {

        var _this = this;

        // Author section
        var authorContainer = document.createElement("div");
        var authorPhoto = document.createElement("img");        
        var authorTitleInfoContainer = document.createElement("div");
        var authorTitle = document.createElement("h2");
        var authorInfo = document.createElement("span");

        // News section
        var newsTitle = document.createElement("h3");
        var newsText = document.createElement("p");

        // Link section
        var link = document.createElement("a");

        // Main button
        this._pulseShadowBlock.className += 'gruit-popup__open-btn-shadow ';
        this._popupButton.className = ' gruit-popup__open-btn showUp ';

        this._animationEndAction(_this._popupButton, function() {

          if ( _this.pulseAnimation ) {
            _this._popupButton.classList.add('pulse');
            _this._pulseShadowBlock.classList.add('pulse-shadow');            
          }
          
          _this._popupButton.classList.remove('showUp');
        });

        this._popupButton.setAttribute('data-morph-start-open', 'M340,170c0,159.5,0,159.5-160,159.5S20,329.5,20,170S20,10.5,180,10.5C341,10.5,340,10.5,340,170L340,170');
        this._popupButton.setAttribute('data-morph-open', 'M360,363H0V-23h360V363z');

        this._popupButton.innerHTML = '<svg class="svg-container" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 360 340"><defs><filter id="dropshadow" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="15"/><feOffset dx="2" dy="2" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.2"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/> </feMerge></filter></defs><path  d="M293.1,283.1c-61.8,61.8-163.9,61.7-225.9-0.4S5.1,118.7,66.9,56.9s163.9-61.7,225.9,0.4S354.9,221.3,293.1,283.1L293.1,283.1"  filter="url(#dropshadow)"/></svg>';

        this._popupButton.addEventListener('click', function(e){
          _this._openPopup(e);
          _this._setCookie();
        });

        this._popupButton.appendChild(this._pulseShadowBlock);
        this._popupContainer.appendChild(this._popupButton);

        // Author section
        authorPhoto.className += ' gruit-popup__author-photo ';
        authorPhoto.src = this.authorPhotoSrc;
        authorPhoto.alt = 'Author of news';

        authorTitle.className += ' gruit-popup__author-title ';
        authorTitle.innerHTML += this.authorTitle;

        authorInfo.className += ' gruit-popup__author-info ';
        authorInfo.innerHTML += this.authorInfo;

        authorTitleInfoContainer.className += ' gruit-popup__about-author ';
        authorTitleInfoContainer.appendChild(authorTitle);
        authorTitleInfoContainer.appendChild(authorInfo);

        authorContainer.className += ' gruit-popup__author ';
        authorContainer.appendChild(authorPhoto);
        authorContainer.appendChild(authorTitleInfoContainer);  

        this._popupNewsContainer.appendChild(authorContainer);  

        // News section
        newsTitle.className += ' gruit-popup__news-title '; 
        newsTitle.innerHTML += this.newsTitle;

        newsText.className += ' gruit-popup__news-text ';
        newsText.innerHTML += this.newsText;  

        this._closeButton.className += ' gruit-popup__close-btn ';
        this._closeButton.addEventListener('click', function(){
          _this._closePopup();
        });
        
        this._popupNewsContainer.appendChild(newsTitle);
        this._popupNewsContainer.appendChild(newsText);
        this._popupNewsContainer.appendChild(this._closeButton);

        // Link section
        link.className += ' gruit-popup__link ';
        link.href = this.linkHref;
        link.innerHTML += this.linkText + ' <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="61" height="12" viewBox="0 0 61 12"><path d="M60.217,1.433 C45.717,2.825 31.217,4.217 16.717,5.609 C13.227,5.944 8.806,6.200 6.390,5.310 C7.803,4.196 11.676,3.654 15.204,3.216 C28.324,1.587 42.033,-0.069 56.184,0.335 C58.234,0.394 60.964,0.830 60.217,1.433 ZM50.155,5.670 C52.205,5.728 54.936,6.165 54.188,6.767 C39.688,8.160 25.188,9.552 10.688,10.943 C7.198,11.278 2.778,11.535 0.362,10.645 C1.774,9.531 5.647,8.988 9.175,8.551 C22.295,6.922 36.005,5.265 50.155,5.670 Z" class="cls-1"/></svg>'; 
        link.target = '_blank';
        link.alt = this.linkText;

        this._popupNewsContainer.appendChild(link);  

        // Insert all elements into the container
        this._popupNewsContainer.className += ' gruit-popup__news ';
        this._popupContainer.appendChild(this._popupNewsContainer);

        this._popupContainer.className += ' gruit-popup close ';

        this._body.appendChild(this._popupContainer);
      }
    },

    _insertCSS: {
      value: function() {
        var cssFile = document.createElement('link'); 
        cssFile.rel = 'stylesheet';
        cssFile.href = this.pathToCSS;

        var elemInsert = document.getElementsByTagName('link')[0]; 
        elemInsert.parentNode.insertBefore(cssFile, elemInsert);
      }
    },

    _openPopup: {
      value: function(e) {
        e.preventDefault();
        if ( !this.isOpen ) {
          var _this = this;

          if ( this.pulseAnimation ) {
            this._popupButton.classList.remove('pulse');
            this._pulseShadowBlock.classList.remove('pulse-shadow');
            this._popupContainer.classList.add('animation');
          }

          // Animation
          this._animPaths.pathButton.stop().animate( { 'path' : this._animPaths.pathsButton.startOpen }, 150, mina.easeout, function() {
            _this._animPaths.pathButton.stop().animate( { 'path' : _this._animPaths.pathsButton.open }, 650, mina.elastic, function() {
              _this._popupContainer.classList.remove('animation');
            } );
          } );

          setTimeout( function() { 
             _this._popupButton.classList.add('gruit-popup-sizeup');
          }, 150 );

          setTimeout( function() { 
            _this._popupContainer.classList.remove('close');
            _this._popupContainer.classList.add('open', 'read');
          }, 500 );

          this.isOpen = true;
        }
      }
    },

    _closePopup: {
      value: function() {
        if ( this.isOpen ) {
          var _this = this;

          this._popupContainer.classList.remove('open');
          this._popupContainer.classList.add('close');
          this._popupContainer.classList.add('animation');

          // Animation
          this._animPaths.pathButton.stop().animate( { 'path' : this._animPaths.pathsButton.reset }, 450, mina.easeout, function() {
            _this._popupContainer.classList.add('close');
            _this._popupContainer.classList.remove('animation');
          } );

          setTimeout( function() { 
             _this._popupButton.classList.remove('gruit-popup-sizeup');
          }, 150 );

          this.isOpen = false;
        }
      }
    },

    _setCookie: {
      value: function() {

        if ( !this.useCookie ) {
          return 0;
        }

        // write cookie one time
        if ( !this._checkCookie() ) {
          return 0;
        }

        var expires = new Date();
        expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = 'gruit=news'+ this.uniqueIdentifier + ';expires=' + expires.toUTCString();
      }
    },

    _checkCookie: {
      value: function() {

        if ( !this.useCookie ) {
          return true;
        }

        var currentCookie = document.cookie.match('(^|;) ?' + 'gruit' + '=([^;]*)(;|$)');
        var popupNumber = 'news' + this.uniqueIdentifier;

        if ( !currentCookie || currentCookie[2] != popupNumber ){
            return true;
        } else {
            return false;
        }
      }
    },

    _animationInit: {
      value: function() {
        var svgElement = this._popupButton.querySelector('svg');
        
        var snapObject = Snap( svgElement );
        this._animPaths.pathButton = snapObject.select('path');
        this._animPaths.pathsButton = {
          reset:        this._animPaths.pathButton.attr('d'),
          startOpen:    this._popupButton.getAttribute('data-morph-start-open'),
          open:         this._popupButton.getAttribute('data-morph-open')
        }
      }
    },

    _animationEndAction: {
      value: function(elementAnimation, callback) {

        if ( !elementAnimation ) {
          return 0;
        }

        // Safari, Chrome, Opera
        elementAnimation.addEventListener('webkitAnimationEnd', function webkitAnimEnd() {
          callback.call();
          elementAnimation.removeEventListener('webkitAnimationEnd', webkitAnimEnd);
        });

        // Standart syntax
        elementAnimation.addEventListener('animationend', function animEnd() {
          callback.call();
          elementAnimation.removeEventListener('animationend', animEnd);
        });

      }
    }
  });

  global.createGruitPopup = function(options) {
    return new GruitPopup(options);
  };

  return global;

})(global || {});