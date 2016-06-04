/**
 * Overlay - simple overlay dum function and crontrol
 *
 * @package rfo/libs
 # -*- coding: utf-8 -*-
 # @Author: ricardo7k@yahoo.com.br
 # @Date:   2016-05-23 15:00:00
 # @Last Modified by: ricardo7k@yahoo.com.br
 # @Last Modified time: 2016-05-23 15:00:00
 */
rfo.Overlay = {
  opened: false,
  object: null,
  init: function(){
    if(!rfo.Overlay.object) {
      rfo.Overlay.object = document.createElement("div");
      rfo.Overlay.object.style.backgroundColor = "rgba(0,0,0,.7)";
      rfo.Overlay.object.style.width = "100%";
      rfo.Overlay.object.style.height = "100%";
      rfo.Overlay.object.style.position = "fixed";
      rfo.Overlay.object.style.zIndex = "100";
      rfo.Overlay.object.id = "rfo_overlay";
      rfo.Overlay.object.className = "fullScale"
    }
  },
  position: function() {
    rfo.Overlay.object.style.top = "0";
    rfo.Overlay.object.style.left = "0";
  },
  show: function() {
    if(rfo.Overlay.opened) return;
    rfo.Overlay.opened = true;
    rfo.Overlay.position();
    if(rfo.Overlay.object) {
      _("body").el.appendChild(rfo.Overlay.object);
    }
  },
  hide: function() {
    if(!rfo.Overlay.opened) return;
    rfo.Overlay.opened = false;
    _("body").el.style.overflow = "";
    if(rfo.Overlay.object) {
      _("body").el.removeChild(rfo.Overlay.object);
    }
  },
  object: null
}
rfo.Overlay.init();
