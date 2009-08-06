/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
/**
 * @ignore
 * @private
 */
nitobi.ui.VerticalScrollbar = function() 
{
	this.uid = "vscroll"+nitobi.base.getUid();
}

nitobi.lang.extend(nitobi.ui.VerticalScrollbar, nitobi.ui.Scrollbar);

/**
 * @ignore
 * @private
 */
nitobi.ui.VerticalScrollbar.prototype.setScrollPercent = function(percent)
{
	this.element.scrollTop=(this.surface.offsetHeight-this.element.offsetHeight)*percent;
	return false;
}

/**
 * @ignore
 * @private
 */
nitobi.ui.VerticalScrollbar.prototype.getScrollPercent = function()
{
	return (this.element.scrollTop/(this.surface.offsetHeight-this.element.offsetHeight));
}

/**
 * @ignore
 * @private
 * @param size A percent value between 0 and 1.
 */ 
nitobi.ui.VerticalScrollbar.prototype.setRange = function(size)
{
	//We've had infinity passed in here for stupid reasons
	if (size >= 0 && size <= 1)
	{
		var st=this.element.scrollTop;
		this.surface.style.height = Math.floor(this.element.offsetHeight / size) + "px";
		this.element.scrollTop=st;
		// This looks stupid but it is necessary to rejig the scroll position. (IE Only) (Of course)
		this.element.scrollTop = this.element.scrollTop;
	}
}
