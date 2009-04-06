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
  this.grid = grid;
  this.column = column;
  
  var colObject = grid.getColumnObject(column);

  var x = nitobi.html.getEventCoords(evt).x;
 	//	TODO: encapsulate this sort of mouse position calculation stuff in a cross browser lib
	// Calculate the current mouse position.
	if (nitobi.browser.IE) 
	{
		this.surface.style.display="block";
		nitobi.drawing.align(this.surface,this.grid.element,nitobi.drawing.align.SAMEHEIGHT | nitobi.drawing.align.SAMEWIDTH | nitobi.drawing.align.ALIGNTOP | nitobi.drawing.align.ALIGNLEFT);

 	} 

  this.x = x;
// First make the resize line visible
	this.boxstyle.display = "block";

  // Make sure that it is offset to the same area as the column we're dragging
	this.boxstyle.left = colObject.getHeaderElement().offsetLeft + "px";

 	// Fit the line in the viewable area. 26 for the scrollbar
	this.boxstyle.height = this.grid.Scroller.scrollSurface.offsetHeight + "px";
  this.boxstyle.width = colObject.getWidth() + "px";  


  // Align the resize line to the column header element.
 	nitobi.drawing.align(this.dragbox,columnHeaderElement,nitobi.drawing.align.ALIGNTOP,0,0,nitobi.html.getHeight(columnHeaderElement) + 1);

  nitobi.ui.startDragOperation(this.dragbox, evt, false, true, this, this.drop);

}

nitobi.grid.DragDropColumn.prototype.drop = function(dragStopEventArgs)
{

  this.x = dragStopEventArgs.x;
  this.y = dragStopEventArgs.y;

  if (nitobi.browser.IE)
	{
		this.surface.style.display="none";
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
