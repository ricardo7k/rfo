rfo.extends("overlay","spin","loader","array_extends");
rfo.load = function() {
  console.info(1);
  rfo.resize();
}
rfo.resize = function() {
  console.info(2);
}
var listp = _("p");
