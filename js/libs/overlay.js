rfo.Overlay = {
  opened: false,
  object: null,
  init: function(){
    if(!rfo.Overlay.object) {
      console.info(rfo.Overlay.object);
      rfo.Overlay.object = document.createElement("div");
      try { rfo.Overlay.object.style.backgroundColor = "rgba(0,0,0,.7)"; }
      catch(e) { rfo.Overlay.object.style.background = "url('img/transpbg.png')"; };
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
    _("body")[0].style.overflow = "";
    if(rfo.Overlay.object) {
      _("body").el.removeChild(rfo.Overlay.object);
    }
  },
  object: null
}
rfo.Overlay.init();
