!function($,window){"use strict";Foundation.libs.tooltips={name:"tooltips",version:"4.3.2",settings:{selector:".has-tip",additionalInheritableClasses:[],tooltipClass:".tooltip",touchCloseText:"tap to close",appendTo:"body","disable-for-touch":!1,tipTemplate:function(selector,content){return'<span data-selector="'+selector+'" class="'+Foundation.libs.tooltips.settings.tooltipClass.substring(1)+'">'+content+'<span class="nub"></span></span>'}},cache:{},init:function(scope,method,options){Foundation.inherit(this,"data_options");var self=this;return"object"==typeof method?$.extend(!0,this.settings,method):"undefined"!=typeof options&&$.extend(!0,this.settings,options),"string"==typeof method?this[method].call(this,options):void(Modernizr.touch?$(this.scope).on("click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip","[data-tooltip]",function(e){var settings=$.extend({},self.settings,self.data_options($(this)));settings["disable-for-touch"]||(e.preventDefault(),$(settings.tooltipClass).hide(),self.showOrCreateTip($(this)))}).on("click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip",this.settings.tooltipClass,function(e){e.preventDefault(),$(this).fadeOut(150)}):$(this.scope).on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip","[data-tooltip]",function(e){var $this=$(this);/enter|over/i.test(e.type)?self.showOrCreateTip($this):("mouseout"===e.type||"mouseleave"===e.type)&&self.hide($this)}))},showOrCreateTip:function($target){var $tip=this.getTip($target);return $tip&&$tip.length>0?this.show($target):this.create($target)},getTip:function($target){var selector=this.selector($target),tip=null;return selector&&(tip=$('span[data-selector="'+selector+'"]'+this.settings.tooltipClass)),"object"==typeof tip?tip:!1},selector:function($target){var id=$target.attr("id"),dataSelector=$target.attr("data-tooltip")||$target.attr("data-selector");return(id&&id.length<1||!id)&&"string"!=typeof dataSelector&&(dataSelector="tooltip"+Math.random().toString(36).substring(7),$target.attr("data-selector",dataSelector)),id&&id.length>0?id:dataSelector},create:function($target){var $tip=$(this.settings.tipTemplate(this.selector($target),$("<div></div>").html($target.attr("title")).html())),classes=this.inheritable_classes($target);$tip.addClass(classes).appendTo(this.settings.appendTo),Modernizr.touch&&$tip.append('<span class="tap-to-close">'+this.settings.touchCloseText+"</span>"),$target.removeAttr("title").attr("title",""),this.show($target)},reposition:function(target,tip,classes){var width,nub,nubHeight,nubWidth,objPos;if(tip.css("visibility","hidden").show(),width=target.data("width"),nub=tip.children(".nub"),nubHeight=this.outerHeight(nub),nubWidth=this.outerHeight(nub),objPos=function(obj,top,right,bottom,left,width){return obj.css({top:top?top:"auto",bottom:bottom?bottom:"auto",left:left?left:"auto",right:right?right:"auto",width:width?width:"auto"}).end()},objPos(tip,target.offset().top+this.outerHeight(target)+10,"auto","auto",target.offset().left,width),$(window).width()<767)objPos(tip,target.offset().top+this.outerHeight(target)+10,"auto","auto",12.5,$(this.scope).width()),tip.addClass("tip-override"),objPos(nub,-nubHeight,"auto","auto",target.offset().left);else{var left=target.offset().left;Foundation.rtl&&(left=target.offset().left+target.offset().width-this.outerWidth(tip)),objPos(tip,target.offset().top+this.outerHeight(target)+10,"auto","auto",left,width),tip.removeClass("tip-override"),classes&&classes.indexOf("tip-top")>-1?objPos(tip,target.offset().top-this.outerHeight(tip),"auto","auto",left,width).removeClass("tip-override"):classes&&classes.indexOf("tip-left")>-1?objPos(tip,target.offset().top+this.outerHeight(target)/2-2.5*nubHeight,"auto","auto",target.offset().left-this.outerWidth(tip)-nubHeight,width).removeClass("tip-override"):classes&&classes.indexOf("tip-right")>-1&&objPos(tip,target.offset().top+this.outerHeight(target)/2-2.5*nubHeight,"auto","auto",target.offset().left+this.outerWidth(target)+nubHeight,width).removeClass("tip-override")}tip.css("visibility","visible").hide()},inheritable_classes:function(target){var inheritables=["tip-top","tip-left","tip-bottom","tip-right","noradius"].concat(this.settings.additionalInheritableClasses),classes=target.attr("class"),filtered=classes?$.map(classes.split(" "),function(el){return-1!==$.inArray(el,inheritables)?el:void 0}).join(" "):"";return $.trim(filtered)},show:function($target){var $tip=this.getTip($target);this.reposition($target,$tip,$target.attr("class")),$tip.fadeIn(150)},hide:function($target){var $tip=this.getTip($target);$tip.fadeOut(150)},reload:function(){var $self=$(this);return $self.data("fndtn-tooltips")?$self.foundationTooltips("destroy").foundationTooltips("init"):$self.foundationTooltips("init")},off:function(){$(this.scope).off(".fndtn.tooltip"),$(this.settings.tooltipClass).each(function(i){$("[data-tooltip]").get(i).attr("title",$(this).text())}).remove()},reflow:function(){}}}(Foundation.zj,this,this.document);