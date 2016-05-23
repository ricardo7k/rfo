/**
 * rfo - simple javascript dom/events controller
 *
 * @package rfo
 # -*- coding: utf-8 -*-
 # @Author: ricardo7k@yahoo.com.br
 # @Date:   2016-05-23 15:00:00
 # @Last Modified by: ricardo7k@yahoo.com.br
 # @Last Modified time: 2016-05-23 15:00:00
 */
// Create object
var rfo = function(selector) {
  this.selector = selector || null;
  this.element = this.el = null;
  this.elements = this.elmts = this.els = null;
  this.objects = this.objs = [];
};
//Static Functions
rfo.extends = function() {
  for(var i=0; i<arguments.length; i++) {
    var scp = document.createElement("script");
    scp.src = "js/libs/" + arguments[i] + ".js";
    _("head").el.appendChild(scp);
  }
}
rfo.resize = function() { }
rfo.load = function() { }
rfo.dump = function(obj) {
  var out = '';
  for (var i in obj) {
      out += i + ": " + obj[i] + "\n";
  }
  if(console.info) {
    console.info(out);
  } else if(console.log){
    console.log(out);
  }
}
rfo.setCookie = function(c_name, value, exdays) {
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) +
    ((exdays==null) ? "" : ("; expires="+exdate.toUTCString()));
  document.cookie=c_name + "=" + c_value;
}
rfo.getCookie = function(c_name) {
  var i,x,y,ARRcookies=document.cookie.split(";");
  for (i=0;i<ARRcookies.length;i++) {
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");
    if (x==c_name) {
      return unescape(y);
    }
  }
}
rfo.stopEvent = function(e) {
  if(!e) var e = window.event;
  e.cancelBubble = true;
  e.returnValue = false;
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  return false;
}
rfo.stageSize = function() {
  if( typeof( window.innerWidth ) == 'number' ) {
      _width = window.innerWidth;
      _height = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
      _width = document.documentElement.clientWidth;
      _height = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
      _width = document.body.clientWidth;
      _height = document.body.clientHeight;
  }
  return { width: _width, height: _height };
}
rfo.navigator = {
  isIE: function () {
      var myNav = navigator.userAgent.toLowerCase();
      return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
  },
  isSafari: (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1),
  ieVersion: /*@cc_on (function() {switch(@_jscript_version) {case 1.0: return 3; case 3.0: return 4; case 5.0: return 5; case 5.1: return 5; case 5.5: return 5.5; case 5.6: return 6; case 5.7: return 7; case 5.8: return 8; case 9: return 9; case 10: return 10;}})() || @*/ 0,
  name: function() {
    return navigator.userAgent.toLowerCase();
  }
}
rfo.device = {
  ipad: function() {
    return (navigator.userAgent.match(/iPad/i))?true:false;
  },
  name: function() {
    this.navAgentName = navigator.userAgent||navigator.vendor||window.opera,"";
    return this.navAgentName;
  },
  isMobile: function() {
    this.navAgentName = navigator.userAgent||navigator.vendor||window.opera,"";
    if(!/android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(this.navAgentName)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) {
      return false;
    } else {
      return true;
    }
  }
}
//Prototype object Functions
rfo.prototype.scrollTo = function(duration) {
    if(this.offset()) {
      if (duration <= 0) return;
      var difference = this.offset().top - _("body").el.scrollTop;
      var perTick = difference / duration * 10;
      setTimeout(function(_this) {
          _("body").el.scrollTop = _("body").el.scrollTop + perTick;
          if (_("body").el.scrollTop === _this.offset().top) return;
          _this.scrollTo(duration - 10);
      }, 10, this);
    } else {
      throw 'ErroRFO(#002) - Precisa do rfo.offset().';
    }
}

rfo.prototype.addClass = function(classe) {
  if(this.element.className.indexOf(classe)>-1) {
    return false;
  } else {
    this.element.className += " " + classe;
  }
}

rfo.prototype.removeClass = function(classe) {
  if(classe == "all") {
    this.element.className = "";
  } else {
    if(this.element.className.indexOf(classe)==-1) {
      return false;
    } else {
      this.element.className = this.element.className.split(classe).join("");
    }
  }
}
rfo.prototype.init = function() {
  switch (this.selector[0]) {
    case '<':
      var matches = this.selector.match(/<([\w-]*)>/);
      if (matches === null || matches === undefined) {
        throw 'ErroRFO(#003) - Selector Inválido / Node';
        return false;
      }
      var nodeName = matches[0].replace('<', '').replace('>', '');
      this.element = document.createElement(nodeName);
      break;
    default:
      if(document.querySelectorAll(this.selector)[1]) {
        this.elements = document.querySelectorAll(this.selector);
        for(var k in document.querySelectorAll(this.selector)) {
          if(typeof document.querySelectorAll(this.selector)[k]=="object") {
            var obj = document.querySelectorAll(this.selector)[k];
            var aid = obj.id || null;
            if(aid==null) { obj.id = "tmp_id_" + (new Date()).getTime(); }
            this.objects.push(_("#" + obj.id));
            if(aid==null) { obj.removeAttribute("id"); }
          }
        }
      }
      this.element = document.querySelector(this.selector);
      this.el = this.element;
      this.elmts = this.els = this.elements;
      this.objs = this.objects;

  }
};
rfo.prototype.mouse = function(e) {
  var rect = this.element.getBoundingClientRect();
  var rectLeft = rect.left;
  var rectTop = rect.top;
  var cssScaleX = (this.element.width||this.element.offsetWidth) / this.element.offsetWidth;
  var cssScaleY = (this.element.height||this.element.offsetHeight) / this.element.offsetHeight;
  return {
    x: (e.clientX - rectLeft) * cssScaleX,
    y: (e.clientY - rectTop) * cssScaleY,
    element: this.element
  }
}

rfo.prototype.each = function(_function) {
  if(rfo.navigator.isIE && rfo.navigator.ieVersion<8) {
      var k=0;
      while(k<this.elements.length){
          _function(this.elements[k], k);
          k++;
      }
  } else {
      Array.prototype.forEach.call(this.elements, _function);
  }
};
rfo.prototype.child = function(selector) {
  return this.element.querySelectorAll(selector);
};
rfo.prototype.rect = function(borders) {
  if(borders) {
    this.element.style.border = "1px solid black";
  } else {
    this.element.style.border = "auto";
    this.element.style.border = "initial";
  }
  return {
    width: this.element.offsetWidth,
    height: this.element.offsetHeight
  };
};
rfo.prototype.offset = function() {
  return {
    top: this.element.getBoundingClientRect().top + document.body.scrollTop,
    left: this.element.getBoundingClientRect().left + document.body.scrollLeft
  };
};
//Event Functions
rfo.prototype.addEventListener = function(event, callback, siblings) {
  if(siblings) {
    for(obj in this.elements) {
      if(typeof this.elements[obj]=="object") {
        var evt = this.eventHandler.bindEvent(event, callback, this.elements[obj]);
      }
    }
  } else {
    var evt = this.eventHandler.bindEvent(event, callback, this.element);
  }
}
rfo.prototype.removeEventListener = function(event, siblings) {
  if(siblings) {
    for(obj in this.elements) {
      if(typeof this.elements[obj]=="object") {
        var evt = this.eventHandler.unbindEvent(event, this.elements[obj]);
      }
    }
  } else {
    var evt = this.eventHandler.unbindEvent(event, this.element);
  }
}
rfo.prototype.eventHandler = {
  events: [],
  bindEvent: function(event, callback, targetElement) {
    this.unbindEvent(event, targetElement);
    targetElement.addEventListener(event, callback, false);
    this.events.push({
      type: event,
      event: callback,
      target: targetElement
    });
  },
  findEvent: function(event) {
    return this.events.filter(function(evt) {
      return (evt.type === event);
    }, event)[0];
  },
  unbindEvent: function(event, targetElement) {
    var foundEvent = this.findEvent(event);
    if (foundEvent !== undefined) {
      targetElement.removeEventListener(event, foundEvent.event, false);
    }
    this.events = this.events.filter(function(evt) {
      return (evt.type !== event);
    }, event);
  }
};
//Abstract Static to Object Link
var _ = function(selector) {
  var el = new rfo(selector);
  el.init();
  if(el.elements || el.element) {
    return el;
  } else {
    throw 'ErroRFO(#001) - Seletor não encontrado.';
  }
}
// Simple init onLoad, resize and Animation
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

window.onresize = new function(e) { };
window.onload = new function(e) { };

if(window.onresize) {
  window.onresize = function(e) {
    rfo.resize(e);
  }
}
if(window.onload) {
  window.onload = function(e) {
      rfo.load(e);
  }
} else {
  document.addEventListener('DOMContentLoaded', function(e){
    rfo.load(e);
  }, false);
}
//Fallback document.getElementsByClassName
if(!document.getElementsByClassName) {
    document.getElementsByClassName = function(className) {
        return this.querySelectorAll("." + className);
    };
    Element.prototype.getElementsByClassName = document.getElementsByClassName;
}
