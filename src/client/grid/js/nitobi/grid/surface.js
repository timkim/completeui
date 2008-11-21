/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
/**
 * @private
 */
nitobi.grid.Surface = function(height,width,element)
{
	this.height=width;
	this.width=height;
	this.element=element;
}

/**
 * @private
 */
nitobi.grid.Surface.prototype.dispose = function()
{
	this.element = null;
}