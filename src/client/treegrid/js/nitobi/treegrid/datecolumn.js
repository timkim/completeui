/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
/**
 * @constructor
 * @extends nitobi.treegrid.Column
 */
nitobi.treegrid.DateColumn = function(grid, column, surface)
{
	//	Call the base constructor
	nitobi.treegrid.DateColumn.baseConstructor.call(this, grid, column, surface);
}

nitobi.lang.extend(nitobi.treegrid.DateColumn, nitobi.treegrid.Column);

var ntb_datep = nitobi.treegrid.DateColumn.prototype;
ntb_datep.setMask=function(){this.xSET("Mask",arguments);}
ntb_datep.getMask=function(){return this.xGET("Mask",arguments);}
ntb_datep.setCalendarEnabled=function(){this.xSET("CalendarEnabled",arguments);}
ntb_datep.isCalendarEnabled=function(){return nitobi.lang.toBool(this.xGET("CalendarEnabled",arguments), false);}