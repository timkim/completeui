/*
 * Nitobi Complete UI 1.1
 * Copyright(c) 2009, Nitobi
 * support@nitobi.com
 *
 * http://www.nitobi.com/license
 */

nitobi.grid.DragDropColumn = function(grid)
{
  this.grid = grid;

  this.grid_id = this.grid.UiContainer.parentid;

  this.column;
 
  this.targetCol;

  this.onAfterDragDrop = new nitobi.base.Event();

  this.dragbox = $ntb('ntb-column-dragbox' + this.grid.uid);

  this.boxstyle = this.dragbox.style;

  if (nitobi.browser.IE)
	{
		/**
		 * The surface here is slipped underneath the 
		 * resize line to provide a smooth drag surface. Otherwise
		 * IE hooks on other tags. A little trick. The opacity is set to 1
		 * because if the bg is set to transparent, IE treats the element like 
		 * its not there.
		 * @private
		 * @type object
		 */
		this.surface = document.getElementById("ebagridresizesurface_");
		if (this.surface == null)
		{
			this.surface = document.createElement("div");
			this.surface.id = "ebagridresizesurface_";
			this.surface.className = "ntb-column-resize-surface";
			this.grid.UiContainer.appendChild(this.surface);		
		}
	}

}

nitobi.grid.DragDropColumn.prototype.pickUp = function(grid, column, columnHeaderElement, evt)
{
  var C = nitobi.html.Css;

  this.grid = grid;
  
  this.column = column;
 
  this.x = nitobi.html.getEventCoords(evt).x;
 
  var scrollLeft = this.grid.scroller.getScrollLeft(); 
  var scrollTop = this.grid.scroller.getScrollTop();
  var colHdr = column.getHeaderElement();
    
  this.surface = column.surface;

  if (this.surface.key == 0)
  	var groupOffset = 0;
  else
  	var groupOffset = this.grid.getGroupOffset();
	  
  if (nitobi.browser.IE)
  {
    var leftStyleWidth = this.grid.scroller.surface.view.topcenter.element.clientWidth;
  }
  else
  {
    var leftStyleWidth = parseInt(C.getClass(".ntb-grid-leftwidth"+this.grid.uid).width);
  } 

  var x = nitobi.html.getEventCoords(evt).x;

  this.x = x;
  // First make the resize line visible
  this.boxstyle.display = "block";
  var scrollSurface = this.grid.Scroller.scrollSurface;
  this.boxstyle.left = (column.getHeaderElement().offsetLeft + groupOffset - scrollLeft) + "px";
  // Fit the line in the viewable area. 26 for the scrollbar
  var heightOffset = (this.surface.headerAttached?23:this.surface.calculateOffsetTop()) - scrollTop;
  this.boxstyle.height = scrollSurface.offsetHeight - (this.surface.key == "0"?0:heightOffset) + "px"; 
  this.boxstyle.width = column.getWidth() + "px";  

  // Align the resize line to the column header element.
  var topOffset = (this.surface.key == 0?0:scrollTop);
  nitobi.drawing.align(this.dragbox,columnHeaderElement,nitobi.drawing.align.ALIGNTOP,0,0,nitobi.html.getHeight(columnHeaderElement) + 1 - (nitobi.browser.MOZ && !this.surface.headerAttached?topOffset:0));

  nitobi.ui.startDragOperation(this.dragbox, evt, false, true, this, this.drop);

}

nitobi.grid.DragDropColumn.prototype.drop = function(dragStopEventArgs)
{

  this.x = dragStopEventArgs.x;
  this.y = dragStopEventArgs.y;

  // At least try to get the target column, before relying on guesswork
  var target = nitobi.grid.Cell.getColumnNumber(dragStopEventArgs.event.srcElement.parentNode);

  if (target != null)
  {
    targerCol = this.grid.getColumnObject(target);
  }
  

  var gridLeft = nitobi.html.getBoundingClientRect(this.grid.UiContainer).left;

  var ls = this.boxstyle;
	ls.display="none";
	ls.top="-3000px";
	ls.left="-3000px";

  this.onAfterDragDrop.notify(this);
  
}

nitobi.grid.DragDropColumn.prototype.dispose = function()
{
  this.grid = null;
  this.dragbox = null;
  this.boxstyle = null;
  this.surface = null;
}
