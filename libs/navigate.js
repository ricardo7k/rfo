/**
 * Navigate - async navigation
 *
 * @package rfo/libs
 # -*- coding: utf-8 -*-
 # @Author: ricardo7k@yahoo.com.br
 # @Date:   2016-06-06 16:00:00
 # @Last Modified by: ricardo7k@yahoo.com.br
 # @Last Modified time:
 */
 cont = "";
 rfo.Navigate = {
  local: 'body',
  title: null,
  meta: [],
  inject: function(html) {
    var obj = new DOMParser();
    var content = obj.parseFromString(html, "text/html");
    var children = content.querySelectorAll('body')[0].children;
    /* CLEAR LOCAL */
    rfo.Navigate.local.innerHTML = "";
    /* Script */
    var scriptsBody = rfo.objectToArray(content.querySelectorAll('body')[0].querySelectorAll('script'));
    var scriptsHead = rfo.objectToArray(content.querySelectorAll('head')[0].querySelectorAll('script'));
    var scripts = scriptsBody.concat(scriptsHead);
    var scps = [];
    for(var i=0; i<scripts.length; i++) {
      if(scripts[i].getAttribute("src")) {
        var scp = document.createElement("script");
        scp.setAttribute("src", scripts[i].getAttribute("src"));
        scps.push(scp);
      }
      scripts[i].parentNode.removeChild(scripts[i]);
    }
    for(var i=0; i<scripts.length; i++) {
      if(!scripts[i].getAttribute("src")) {
        var scp = document.createElement("script");
        scp.innerHTML = scripts[i].innerHTML;
        rfo.Navigate.local.appendChild(scp);
      }
    }
    for(var i=0; i<scps.length; i++) { rfo.Navigate.local.appendChild(scps[i]); }
    /* CSS */
    var styleHead = rfo.objectToArray(content.querySelectorAll('head')[0].querySelectorAll('style'));
    var styleBody = rfo.objectToArray(content.querySelectorAll('body')[0].querySelectorAll('style'));
    var linkHead = rfo.objectToArray(content.querySelectorAll('head')[0].querySelectorAll('link'));
    var linkBody = rfo.objectToArray(content.querySelectorAll('body')[0].querySelectorAll('link'));
    var csss = styleHead.concat(styleBody).concat(linkHead).concat(linkBody);
    for(var i=0; i<csss.length; i++) {
      if(csss[i].getAttribute("href")) {
        var css = document.createElement("link");
        css.setAttribute("href",csss[i].getAttribute("href"))
        rfo.Navigate.local.appendChild(css);
      } else {
        var css = document.createElement("style");
        css.innerHTML = csss[i].innerHTML
        rfo.Navigate.local.appendChild(css);
      }
    }
    rfo.Navigate.local.innerHTML += content.querySelectorAll('body')[0].innerHTML;
    /* HEAD */
    /* HEAD>TITLE */
    if(content.querySelectorAll('head')[0].querySelectorAll('title')[0]) {
      if(!rfo.Navigate.title) {
        rfo.Navigate.title = _("title").el.innerHTML;
      }
      var title = content.querySelectorAll('head')[0].querySelectorAll('title')[0].innerHTML;
      _("title").el.innerHTML = title;
    }
    /* HEAD>META */
    var metas = rfo.objectToArray(content.querySelectorAll('head')[0].querySelectorAll('meta'));
    for(var i=0; i<metas.length; i++) {
      if(metas[i].getAttribute("name")) {
        _("meta").objs.filter(function(n){
          if(n.el.getAttribute("name")==metas[i].getAttribute("name")) {
            n.el.setAttribute("content", metas[i].getAttribute("content"));
          }
        });
      } else if(metas[i].getAttribute("property")) {
        _("meta").objs.filter(function(n){
          if(n.el.getAttribute("property")==metas[i].getAttribute("property")) {
            n.el.setAttribute("content", metas[i].getAttribute("content"));
          }
        });
      }
    }
  },
  go: function(e){
    target = (event.currentTarget) ? event.currentTarget : event.srcElement;
    history.pushState(target.getAttribute("id"), null, target.getAttribute("href").replace(".html",""));
    rfo.Loader.method = "GET";
    rfo.Loader.callback.done = function(e) { rfo.Navigate.inject(e.response); };
    rfo.Loader.call(target.getAttribute("href"));
    rfo.stopEvent(e);
  },
  init: function(local) {
    rfo.Navigate.local = local.el || rfo.Navigate.local;
    window.addEventListener('popstate', function(e){
      if(e.state==null) {
        history.pushState("home", null, "home".replace(".html",""));
      } else {
        rfo.Loader.call(document.location.href);
      }
    });
  }
}
