!function($,window,document,undefined){"use strict";Foundation.libs.clearing={name:"clearing",version:"4.3.2",settings:{templates:{viewing:'<a href="#" class="clearing-close">&times;</a><div class="visible-img" style="display: none"><img src="//:0"><p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a><a href="#" class="clearing-main-next"><span></span></a></div>'},close_selectors:".clearing-close",init:!1,locked:!1},init:function(scope,method,options){var self=this;return Foundation.inherit(this,"set_data get_data remove_data throttle data_options"),"object"==typeof method&&(options=$.extend(!0,this.settings,method)),"string"!=typeof method?($(this.scope).find("ul[data-clearing]").each(function(){var $el=$(this),options=options||{},lis=$el.find("li"),settings=self.get_data($el);!settings&&lis.length>0&&(options.$parent=$el.parent(),self.set_data($el,$.extend({},self.settings,options,self.data_options($el))),self.assemble($el.find("li")),self.settings.init||self.events().swipe_events())}),this.settings.init):this[method].call(this,options)},events:function(){var self=this;return $(this.scope).on("click.fndtn.clearing","ul[data-clearing] li",function(e,current,target){var current=current||$(this),target=target||current,next=current.next("li"),settings=self.get_data(current.parent()),image=$(e.target);e.preventDefault(),settings||self.init(),target.hasClass("visible")&&current[0]===target[0]&&next.length>0&&self.is_open(current)&&(target=next,image=target.find("img")),self.open(image,current,target),self.update_paddles(target)}).on("click.fndtn.clearing",".clearing-main-next",function(e){this.nav(e,"next")}.bind(this)).on("click.fndtn.clearing",".clearing-main-prev",function(e){this.nav(e,"prev")}.bind(this)).on("click.fndtn.clearing",this.settings.close_selectors,function(e){Foundation.libs.clearing.close(e,this)}).on("keydown.fndtn.clearing",function(e){this.keydown(e)}.bind(this)),$(window).on("resize.fndtn.clearing",function(){this.resize()}.bind(this)),this.settings.init=!0,this},swipe_events:function(){var self=this;$(this.scope).on("touchstart.fndtn.clearing",".visible-img",function(e){e.touches||(e=e.originalEvent);var data={start_page_x:e.touches[0].pageX,start_page_y:e.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:undefined};$(this).data("swipe-transition",data),e.stopPropagation()}).on("touchmove.fndtn.clearing",".visible-img",function(e){if(e.touches||(e=e.originalEvent),!(e.touches.length>1||e.scale&&1!==e.scale)){var data=$(this).data("swipe-transition");if("undefined"==typeof data&&(data={}),data.delta_x=e.touches[0].pageX-data.start_page_x,"undefined"==typeof data.is_scrolling&&(data.is_scrolling=!!(data.is_scrolling||Math.abs(data.delta_x)<Math.abs(e.touches[0].pageY-data.start_page_y))),!data.is_scrolling&&!data.active){e.preventDefault();var direction=data.delta_x<0?"next":"prev";data.active=!0,self.nav(e,direction)}}}).on("touchend.fndtn.clearing",".visible-img",function(e){$(this).data("swipe-transition",{}),e.stopPropagation()})},assemble:function($li){var $el=$li.parent();$el.after('<div id="foundationClearingHolder"></div>');var holder=$("#foundationClearingHolder"),settings=this.get_data($el),grid=$el.detach(),data={grid:'<div class="carousel">'+this.outerHTML(grid[0])+"</div>",viewing:settings.templates.viewing},wrapper='<div class="clearing-assembled"><div>'+data.viewing+data.grid+"</div></div>";return holder.after(wrapper).remove()},open:function($image,current,target){var root=target.closest(".clearing-assembled"),container=root.find("div").first(),visible_image=container.find(".visible-img"),image=visible_image.find("img").not($image);this.locked()||(image.attr("src",this.load($image)).css("visibility","hidden"),this.loaded(image,function(){image.css("visibility","visible"),root.addClass("clearing-blackout"),container.addClass("clearing-container"),visible_image.show(),this.fix_height(target).caption(visible_image.find(".clearing-caption"),$image).center(image).shift(current,target,function(){target.siblings().removeClass("visible"),target.addClass("visible")})}.bind(this)))},close:function(e,el){e.preventDefault();var container,visible_image,root=function(target){return/blackout/.test(target.selector)?target:target.closest(".clearing-blackout")}($(el));return el===e.target&&root&&(container=root.find("div").first(),visible_image=container.find(".visible-img"),this.settings.prev_index=0,root.find("ul[data-clearing]").attr("style","").closest(".clearing-blackout").removeClass("clearing-blackout"),container.removeClass("clearing-container"),visible_image.hide()),!1},is_open:function(current){return current.parent().prop("style").length>0},keydown:function(e){var clearing=$(".clearing-blackout").find("ul[data-clearing]");39===e.which&&this.go(clearing,"next"),37===e.which&&this.go(clearing,"prev"),27===e.which&&$("a.clearing-close").trigger("click")},nav:function(e,direction){var clearing=$(".clearing-blackout").find("ul[data-clearing]");e.preventDefault(),this.go(clearing,direction)},resize:function(){var image=$(".clearing-blackout .visible-img").find("img");image.length&&this.center(image)},fix_height:function(target){var lis=target.parent().children(),self=this;return lis.each(function(){var li=$(this),image=li.find("img");li.height()>self.outerHeight(image)&&li.addClass("fix-height")}).closest("ul").width(100*lis.length+"%"),this},update_paddles:function(target){var visible_image=target.closest(".carousel").siblings(".visible-img");target.next().length>0?visible_image.find(".clearing-main-next").removeClass("disabled"):visible_image.find(".clearing-main-next").addClass("disabled"),target.prev().length>0?visible_image.find(".clearing-main-prev").removeClass("disabled"):visible_image.find(".clearing-main-prev").addClass("disabled")},center:function(target){return target.css(this.rtl?{marginRight:-(this.outerWidth(target)/2),marginTop:-(this.outerHeight(target)/2)}:{marginLeft:-(this.outerWidth(target)/2),marginTop:-(this.outerHeight(target)/2)}),this},load:function($image){if("A"===$image[0].nodeName)var href=$image.attr("href");else var href=$image.parent().attr("href");return this.preload($image),href?href:$image.attr("src")},preload:function($image){this.img($image.closest("li").next()).img($image.closest("li").prev())},loaded:function(image,callback){function loaded(){callback()}function bindLoad(){if(this.one("load",loaded),/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var src=this.attr("src"),param=src.match(/\?/)?"&":"?";param+="random="+(new Date).getTime(),this.attr("src",src+param)}}return image.attr("src")?void(image[0].complete||4===image[0].readyState?loaded():bindLoad.call(image)):void loaded()},img:function(img){if(img.length){var new_img=new Image,new_a=img.find("a");new_img.src=new_a.length?new_a.attr("href"):img.find("img").attr("src")}return this},caption:function(container,$image){var caption=$image.data("caption");return caption?container.html(caption).show():container.text("").hide(),this},go:function($ul,direction){var current=$ul.find(".visible"),target=current[direction]();target.length&&target.find("img").trigger("click",[current,target])},shift:function(current,target,callback){var skip_shift,clearing=target.parent(),old_index=this.settings.prev_index||target.index(),direction=this.direction(clearing,current,target),left=parseInt(clearing.css("left"),10),width=this.outerWidth(target);target.index()===old_index||/skip/.test(direction)?/skip/.test(direction)&&(skip_shift=target.index()-this.settings.up_count,this.lock(),skip_shift>0?clearing.animate({left:-(skip_shift*width)},300,this.unlock()):clearing.animate({left:0},300,this.unlock())):/left/.test(direction)?(this.lock(),clearing.animate({left:left+width},300,this.unlock())):/right/.test(direction)&&(this.lock(),clearing.animate({left:left-width},300,this.unlock())),callback()},direction:function($el,current,target){var response,lis=$el.find("li"),li_width=this.outerWidth(lis)+this.outerWidth(lis)/4,up_count=Math.floor(this.outerWidth($(".clearing-container"))/li_width)-1,target_index=lis.index(target);return this.settings.up_count=up_count,response=this.adjacent(this.settings.prev_index,target_index)?target_index>up_count&&target_index>this.settings.prev_index?"right":target_index>up_count-1&&target_index<=this.settings.prev_index?"left":!1:"skip",this.settings.prev_index=target_index,response},adjacent:function(current_index,target_index){for(var i=target_index+1;i>=target_index-1;i--)if(i===current_index)return!0;return!1},lock:function(){this.settings.locked=!0},unlock:function(){this.settings.locked=!1},locked:function(){return this.settings.locked},outerHTML:function(el){return el.outerHTML||(new XMLSerializer).serializeToString(el)},off:function(){$(this.scope).off(".fndtn.clearing"),$(window).off(".fndtn.clearing"),this.remove_data(),this.settings.init=!1},reflow:function(){this.init()}}}(Foundation.zj,this,this.document);