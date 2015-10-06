(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['editor'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"row page-nav-row\">      \n	<div class=\"page-tab-nav page-tab-nav-rightpad col-xs-2 text-center page-tab-nav-active\" >\n	"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "\n	</div>\n</div>\n<div id=\"elements\"></div>\n";
},"useData":true});
templates['sidebar'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<input id=\"page-title\" class=\"sidebar-font page-tab-fonts\" placeholder=\""
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "\" maxlength=\"12\" readonly/>\n<span class=\"page-tab-settings-icons page-edit glyphicon glyphicon-pencil\"></span>\n<span class=\"page-tab-settings-icons page-delete glyphicon glyphicon-remove\"></span>\n<div class=\"page-tab-bg\"></div>";
},"useData":true});
})();
