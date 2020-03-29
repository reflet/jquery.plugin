/*
 * 	exTable 0.1.1 - jQuery plugin
 *	written by Cyokodog	
 *
 *	Copyright (c) 2009 Cyokodog (http://d.hatena.ne.jp/cyokodog/)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
(function($){
	var myDefaults = {
		scrollbarWidth :16,
		height : 200,
		onInit : null
	}

	$.ex = $.ex || {};
	$.ex.table = function(idx , targets , option)
	{
		var o = this, c;
		
		c = o.config = $.extend({} , myDefaults , option);
		c.targets = targets;
		c.target = c.targets.eq(idx);
		c.index = idx;
		c.container = $('<div class="ex-table-container">' +
			'<div class="ex-table-head"><table/></div>' +
			'<div class="ex-table-body"></div>' +
			'<div class="ex-table-foot"><table/></div>' +
			'</div>');
		c.head = c.container.find('> div.ex-table-head').css({
			'padding-right':c.scrollbarWidth
		});
		c.foot = c.container.find('> div.ex-table-foot').css({
			'padding-right':c.scrollbarWidth
		});
		c.headTable = c.head.find('> table');
		c.footTable = c.foot.find('> table');
		c.body = c.container.find('> div.ex-table-body').css({
			'overflow-x' : 'hidden',
			'overflow-y' : 'scroll',
			height : c.height
		});
		
		var thead = c.target.find('> thead')
			,tfoot = c.target.find('> tfoot')
			,tbody = c.target.find('> tbody');
		
		o._fixedWidth(thead);
		o._fixedWidth(tfoot);
		o._fixedWidth(tbody);
		c.container.width(c.target.width() + c.scrollbarWidth + 1);
		c.target.after(c.container);
		
		c.target
			.find('> thead').appendTo(c.head.find('> table')).end()
			.find('> tfoot').appendTo(c.foot.find('> table')).end()
			.appendTo(c.body);

		$([c.target[0],c.headTable[0],c.footTable[0]]).css({
			'table-layout':'fixed',
			'margin':0
		});
	
		if (c.onInit) c.onInit.apply(c.targets , [ o ]);
	}

	$.extend($.ex.table.prototype,{
		_fixedWidth : function(stack){
			var cols = stack.find('> tr:eq(0) > *');
			cols.each(function( idx ){
				var col = cols.eq(idx);
				col.width(col.width()).css('overflow','hidden');
			});
		}
		,getIndex : function(){ return this.config.index; }
		,getTargets : function(){ return this.config.targets; }
		,getTarget: function(){ return this.config.target; }
		,getContainer : function(){ return this.config.container; }
		,getHead : function(){ return this.config.head; }
		,getHeadTable : function(){ return this.config.headTable; }
		,getBody : function(){ return this.config.body; }
		,getBodyTable: function(){ return this.config.target; }
		,getFoot : function(){ return this.config.foot; }
		,getFootTable : function(){ return this.config.footTable; }
	});

	$.fn.exTable = function(option){
		var targets = this;
		return targets.each(function(idx){
			targets.eq(idx).data(
				 'ex-table'
				,new $.ex.table(idx,targets,option)
			);
		});
	}
})(jQuery);

