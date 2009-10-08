/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
nitobi.lang.defineNs("nitobi.ui");

/**
* @param {nitobi.ui.Toolbars.VisibleToolbars} visibleToolbars A bitmask representing which toolbars are being shown.
*/
nitobi.ui.Toolbars= function(parentGrid, visibleToolbars) 
{
	this.grid = parentGrid;
	this.uid = "nitobiToolbar_" + nitobi.base.getUid();
	this.toolbars = {};
	this.visibleToolbars = visibleToolbars;	
}

nitobi.ui.Toolbars.VisibleToolbars = {};
nitobi.ui.Toolbars.VisibleToolbars.STANDARD 	= 1;
nitobi.ui.Toolbars.VisibleToolbars.PAGING 		= 1 << 1;


nitobi.ui.Toolbars.prototype.initialize= function() 
{
	this.enabled=true;
	
	this.toolbarXml = nitobi.xml.createXmlDoc(nitobi.xml.serialize(nitobi.grid.toolbarDoc));
	this.toolbarPagingXml = nitobi.xml.createXmlDoc(nitobi.xml.serialize(nitobi.grid.pagingToolbarDoc));
}


nitobi.ui.Toolbars.prototype.attachToParent= function(container)
{
	this.initialize();
	
	this.container = container;
	// If there are no toolbars visible then dont render.
	if (this.standardToolbar == null && this.visibleToolbars)
	{
		this.makeToolbar();
		this.render();
	}
}

nitobi.ui.Toolbars.prototype.setWidth= function(width)
{
	this.width=width;
}

nitobi.ui.Toolbars.prototype.getWidth= function()
{
	return this.width;
}

nitobi.ui.Toolbars.prototype.setHeight= function(height)
{
	this.height=height;
}

nitobi.ui.Toolbars.prototype.getHeight= function()
{
	return this.height;
}

nitobi.ui.Toolbars.prototype.setRowInsertEnabled= function(enable)
{
	this.rowInsertEnabled = enable;
}
nitobi.ui.Toolbars.prototype.isRowInsertEnabled= function()
{
	return this.rowInsertEnabled;
}

nitobi.ui.Toolbars.prototype.setRowDeleteEnabled= function(enable)
{
	this.rowDeleteEnabled = enable;
}
nitobi.ui.Toolbars.prototype.isRowDeleteEnabled= function()
{
	return this.rowDeleteEnabled;
}

nitobi.ui.Toolbars.prototype.makeToolbar= function()
{
	var imgDir = this.findCssUrl();
	this.toolbarXml.documentElement.setAttribute("id","toolbar"+this.uid);	
	
	this.toolbarXml.documentElement.setAttribute("image_directory",imgDir);

	//TODO: This is begging for a cleaner solution.
	var nodes = this.toolbarXml.selectNodes('/toolbar/items/*');
	for (var i = 0; i < nodes.length; i++)
	{
		if (nodes[i].nodeType != 8)
		{
			nodes[i].setAttribute('id',nodes[i].getAttribute('id')+this.uid);
		}
	}

	this.standardToolbar = new nitobi.ui.Toolbar(this.toolbarXml,"toolbar"+this.uid);
	this.toolbarPagingXml.documentElement.setAttribute("id","toolbarpaging"+this.uid);	
	this.toolbarPagingXml.documentElement.setAttribute("image_directory",imgDir);
	
	nodes = (this.toolbarPagingXml.selectNodes('/toolbar/items/*'));
	for (var i = 0; i < nodes.length; i++)
	{
		if (nodes[i].nodeType != 8)
		{
			nodes[i].setAttribute('id',nodes[i].getAttribute('id')+this.uid);
		}
	}
	
	this.pagingToolbar = new nitobi.ui.Toolbar(this.toolbarPagingXml,"toolbarpaging"+this.uid);

}

nitobi.ui.Toolbars.prototype.getToolbar = function(id)
{
	// Good enough for now until this becomes a real collection.
	return eval("this." + id);
}

/**
 * Find the URL of the stylesheet that contains the toolbar classes.
 * @private
 * @return String The URL of the toolbar stylesheet.
 */
nitobi.ui.Toolbars.prototype.findCssUrl = function()
{
	var sheet = nitobi.html.Css.findParentStylesheet(".ntb-toolbar");
	if (sheet==null)
	{
		sheet = nitobi.html.Css.findParentStylesheet(".ntb-grid");
		if (sheet==null)
		{	
			nitobi.lang.throwError("The CSS for the toolbar could not be found.  Try moving the nitobi.grid.css file to a location accessible to the browser's javascript or moving it to the top of the stylesheet list. findParentStylesheet returned " + sheet);
		}
	}
	return nitobi.html.Css.getPath(sheet);
}



nitobi.ui.Toolbars.prototype.isToolbarEnabled= function() {
	return this.enabled;
}

nitobi.ui.Toolbars.prototype.render= function() 
{
	var toolbarDiv = this.container;
	toolbarDiv.style.visibility="hidden";

	var xsl = nitobi.ui.ToolbarXsl;
	if (xsl.indexOf("xsl:stylesheet") == -1)
	{
		xsl = "<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:output method=\"xml\" version=\"4.0\" />" + xsl
		+ "</xsl:stylesheet>";
	}
	var xslDoc = nitobi.xml.createXslDoc(xsl);

	xsl=nitobi.ui.pagingToolbarXsl;
	if(xsl.indexOf("xsl:stylesheet")==-1)
	{
		xsl="<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:output method=\"xml\" version=\"4.0\" />"+xsl+"</xsl:stylesheet>";
	}
	var pagingXslDoc = nitobi.xml.createXslDoc(xsl);

	var toolbarHtml = nitobi.xml.transformToString(this.standardToolbar.getXml(), xslDoc,"xml");
	
	toolbarDiv.innerHTML = toolbarHtml;
	toolbarDiv.style.zIndex="1000";

	var toolbarPagingHtml = nitobi.xml.transformToString(this.pagingToolbar.getXml(), pagingXslDoc,"xml");
	toolbarDiv.innerHTML += toolbarPagingHtml;

	xslDoc = null;
	xmlDoc = null;

	this.standardToolbar.attachToTag();
	this.pagingToolbar.attachToTag();

	this.resize();

	var _this = this;
	var buttons = this.standardToolbar.getUiElements()
	
	// using a foreach loop and a switch statement allows users to create toolbars without some buttons
	// was previously causing an error with custom toolbars
	for (eachbutton in buttons) {
		// Check for 'empty' buttons and skip over.
		if (buttons[eachbutton].m_HtmlElementHandle == null) { continue; }
		buttons[eachbutton].toolbar = this;
		buttons[eachbutton].grid = this.grid;

		if(nitobi.browser.IE && buttons[eachbutton].m_HtmlElementHandle.onbuttonload != null)
		{
			var x = function(item, grid, tbar, iDom) {eval(buttons[eachbutton].m_HtmlElementHandle.onbuttonload);}
			x(buttons[eachbutton], this.grid, this,buttons[eachbutton].m_HtmlElementHandle);
		}
		else if(!nitobi.browser.IE && buttons[eachbutton].m_HtmlElementHandle.hasAttribute('onbuttonload'))
		{
			/**
			 * @public
			 */
			var x = function(item, grid, tbar, iDom) {eval(buttons[eachbutton].m_HtmlElementHandle.getAttribute('onbuttonload'));}
			x(buttons[eachbutton], this.grid, this,buttons[eachbutton].m_HtmlElementHandle);
		}

		switch (eachbutton) {
			case "save"+this.uid:
				buttons[eachbutton].onClick = 
					function()
					{
						_this.fire("Save");
					};
			break;
			case "newRecord"+this.uid:
				buttons[eachbutton].onClick = 
					function()
					{
						_this.fire("InsertRow");
					};
				// disable button i	 row insert is not allowed
				if(!this.isRowInsertEnabled())
				{
					buttons[eachbutton].disable();
				}
			break;
			case "deleteRecord"+this.uid:
				buttons[eachbutton].onClick = 
					function()
					{
						_this.fire("DeleteRow");
					};
				// disable button if row delete is not allowed
				if(!this.isRowDeleteEnabled())
				{
					buttons[eachbutton].disable();
				}
			break;
			case "refresh"+this.uid:
				buttons[eachbutton].onClick = 
					function()
					{
						var refreshOk=confirm("Refreshing will discard any changes you have made. Is it OK to refresh?");
						if (refreshOk)
						{
							_this.fire("Refresh");			
						}
					};
			break;
			case "showhide"+this.uid:
				this.show_hide_btn = buttons[eachbutton];
				buttons[eachbutton].onClick = 
					function()
					{
						  grid = _this.grid;
						  element = _this.show_hide_btn;
						  var menu = $ntb('ntb-grid-showhide' + grid.uid);
  						  nitobi.ui.Toolbars.showMenu(menu, element);
					};
			break;
			case "showhide_master"+this.uid:
				this.show_hide_btn = buttons[eachbutton];
				buttons[eachbutton].onClick = 
					function()
					{
						  grid = _this.grid;
						  element = _this.show_hide_btn;
						  // Try to find the master and the detail
						  var colset = grid.scroller.surface.columnSetId;
						  var menu = $ntb('ntb-treegrid-colmenu-' + colset );
  						  nitobi.ui.Toolbars.showMenu(menu, element);
					};
			break;
			case "showhide_detail"+this.uid:
				this.show_hide_btn = buttons[eachbutton];
				buttons[eachbutton].onClick = 
					function()
					{
						  grid = _this.grid;
						  element = _this.show_hide_btn;
						  // Find the 2nd level
						  var colset = null;
						  var clientSurf = null;
						  for( surf in grid.Scroller.surfaceMap)
						  {
							if(surf.indexOf('0_') != -1 && surf.length == 3)
							{
								colset = grid.Scroller.surfaceMap[surf].columnSetId;
							}		
						  }
						  if(colset != null && grid.Scroller.isColSetVisible(colset))
						  {
						  	var menu = $ntb('ntb-treegrid-colmenu-' + colset);
							nitobi.ui.Toolbars.showMenu(menu, element);
						  }
					};
			break;
			case "firstPage"+this.uid:
				buttons[eachbutton].onClick = 
					function()
					{
						_this.fire("FirstPage");		
						_this.resetCounter();
					};
			break;
			case "lastPage"+this.uid:
				buttons[eachbutton].onClick = 
					function()
					{
						_this.fire("LastPage");	
						_this.maxCounter();		
					};
			break;
			default:
		}
	}
	
	// likewise for paging buttons
	var buttonsPaging = this.pagingToolbar.getUiElements();
	var _this = this;

	for (eachPbutton in buttonsPaging) {
		// Check for empty buttons and skip over if necessary.
		if (buttonsPaging[eachPbutton].m_HtmlElementHandle == null) { continue; }
		buttonsPaging[eachPbutton].toolbar = this;
		buttonsPaging[eachPbutton].grid = this.grid;

		if(nitobi.browser.IE && buttonsPaging[eachPbutton].m_HtmlElementHandle.onbuttonload != null)
		{
			/**
			 * @public
			 */
			var x = function(item, grid, tbar, iDom) {eval(buttonsPaging[eachPbutton].m_HtmlElementHandle.onbuttonload);}
			x(buttonsPaging[eachPbutton], this.grid, this,buttonsPaging[eachPbutton].m_HtmlElementHandle);
		}
		else if(!nitobi.browser.IE && buttonsPaging[eachPbutton].m_HtmlElementHandle.hasAttribute('onbuttonload'))
		{
			/**
			 * @public
			 */
			var x = function(item, grid, tbar, iDom) {eval(buttonsPaging[eachPbutton].m_HtmlElementHandle.getAttribute('onbuttonload'));}
			x(buttonsPaging[eachPbutton], this.grid, this,buttonsPaging[eachPbutton].m_HtmlElementHandle);
		}

		switch (eachPbutton) {
			case "firstPage"+this.uid:
				buttonsPaging[eachPbutton].onClick = 
					function()
					{
						_this.fire("FirstPage");		
						_this.resetCounter();
					};
			break;
			case "previousPage"+this.uid:
				buttonsPaging[eachPbutton].onClick = 
					function()
					{
						_this.fire("PreviousPage");
						_this.decrementCounter();
					};
				buttonsPaging[eachPbutton].disable();
			break;
			case "nextPage"+this.uid:
				buttonsPaging[eachPbutton].onClick = 
					function()
					{
						_this.fire("NextPage");
						_this.incrementCounter();
					};
			break;
			case "lastPage"+this.uid:
				buttonsPaging[eachPbutton].onClick = 
					function()
					{
						_this.fire("LastPage");	
						_this.maxCounter();		
					};
			break;
			case "startPage"+this.uid:
				buttonsPaging[eachPbutton].onBlur = 
					function()
					{	
						_this.inputCounter();		
					};
			break;			
			default:
		}
	}

	if (this.visibleToolbars & nitobi.ui.Toolbars.VisibleToolbars.STANDARD)
	{
		this.standardToolbar.show();
	}
	else
	{
		this.standardToolbar.hide();
	}
	if (this.visibleToolbars & nitobi.ui.Toolbars.VisibleToolbars.PAGING)
	{
		this.pagingToolbar.show();
	}
	else
	{
		this.pagingToolbar.hide();
	}
	toolbarDiv.style.visibility="visible";		
}

nitobi.ui.Toolbars.showMenu = function(menu, element)
{
	if(nitobi.browser.IE)
	{
		// Style it with some default styling
		menu.style.backgroundColor="#efefef";
		menu.style.border="1px solid #000000";
	}
   	if(menu.style.display == "none")
   	{
 		menu.style.position = "absolute";
		// Figure out the height fast!
		menu.style.left = "-5000";
		menu.style.display = "";
		var m_height = menu.clientHeight;
		// Pull it back and put it in the right spot
		menu.style.display = "none";
    		menu.style.top = (element.m_HtmlElementHandle.parentNode.offsetTop - m_height) + "px";
    		menu.style.left = (element.m_HtmlElementHandle.offsetLeft + element.m_HtmlElementHandle.offsetWidth)+ "px";
    		menu.style.display = "";
    	}
    	else
    	{
  		menu.style.position="relative";
    		menu.style.display = "none";
    	}
}

nitobi.ui.Toolbars.prototype.resetCounter = function()
{
	var start_page = $ntb('startPage' + this.uid);
	var total_items = $ntb('endRow' + this.uid);
	var disp_start = $ntb('startRow' + this.uid);
	var disp_end = $ntb('numRows' + this.uid);
	var rows_per_page = this.grid.getRowsPerPage();
	if (start_page)
	{		
		start_page.value = String(1);
	}
	
	if(total_items)
	{
		total_items.innerHTML = "&nbsp;" + this.grid.datatable.totalRowCount;
	}
	
	if(disp_start)
	{
		disp_start.innerHTML = "&nbsp;1";
	}
	
	if(disp_end)
	{
		disp_end.innerHTML = "&nbsp;" + rows_per_page;
	}
}

nitobi.ui.Toolbars.prototype.maxCounter = function()
{
	var start_page = $ntb('startPage' + this.uid);
	var pages = this.grid.datatable.totalRowCount/this.grid.getRowsPerPage();
	if (start_page)
	{		
		start_page.value = String(Math.ceil(pages));	
	}	
}

nitobi.ui.Toolbars.prototype.incrementCounter = function()
{
	var start_page = $ntb('startPage' + this.uid);
	var disp_start = $ntb('startRow' + this.uid);
	var disp_end = $ntb('numRows' + this.uid);
	var rows_per_page = this.grid.getRowsPerPage();
	if (start_page)
	{		
		var val = parseInt(start_page.value);
		start_page.value = String(++val);
	}	
	
	if(disp_start)
	{
		var start_disp = val*rows_per_page;
		disp_start.innerHTML = "&nbsp;" + start_disp;
	}
	
	if(disp_end)
	{
		var end_disp = start_disp+rows_per_page;
		disp_end.innerHTML = "&nbsp;" + end_disp;
	}
}

nitobi.ui.Toolbars.prototype.decrementCounter = function()
{
	var start_page = $ntb('startPage' + this.uid);
	var disp_start = $ntb('startRow' + this.uid);
	var disp_end = $ntb('numRows' + this.uid);
	var rows_per_page = this.grid.getRowsPerPage();
	if (start_page)
	{		
		var val = parseInt(start_page.value);
		start_page.value = String(--val);
	}	
	
	if(disp_start)
	{
		var start_disp = val*rows_per_page;
		disp_start.innerHTML = "&nbsp;" + start_disp;
	}
	
	if(disp_end)
	{
		var end_disp = val+rows_per_page;
		disp_end.innerHTML = "&nbsp;" + end_disp;			
	}
}

nitobi.ui.Toolbars.prototype.inputCounter = function()
{
	var start_page = $ntb('startPage' + this.uid);
	if (start_page)
	{		
		var maxPage = Math.ceil(this.grid.datatable.totalRowCount/this.grid.getRowsPerPage());
		var val = parseInt(start_page.value);
		var isNotNumber = isNaN(start_page.value);
		if(val < 0 || val > maxPage || isNotNumber)
		{
			alert('Please enter a value within the ranges of 1 and ' + maxPage);
		}
		else
		{
			this.fire("InputTextPage");
		}
	}	
}
nitobi.ui.Toolbars.prototype.calculateRange = function()
{
	var pages = this.grid.datatable.totalRowCount/this.grid.getRowsPerPage();
	var total_items = $ntb('endRow' + this.uid);
	var last_page =  $ntb('endPage' + this.uid);
	if(total_items)
	{
		total_items.innerHTML = "&nbsp;" + this.grid.datatable.totalRowCount;
	}
	
	if(last_page)
	{
		last_page.innerHTML = "&nbsp;" + Math.ceil(pages);
	}
}


nitobi.ui.Toolbars.prototype.resize = function()
{
	var standardWidth = this.getWidth();
	if (this.visibleToolbars & nitobi.ui.Toolbars.VisibleToolbars.PAGING) {
		this.standardToolbar.setHeight(this.getHeight());
	}
	if (this.visibleToolbars & nitobi.ui.Toolbars.VisibleToolbars.STANDARD) {
		this.standardToolbar.setHeight(this.getHeight());
	}
}

nitobi.ui.Toolbars.prototype.fire= function(evt,args) 
{
	return nitobi.event.notify(evt+this.uid,args);
}

nitobi.ui.Toolbars.prototype.subscribe= function(evt,func,context)  
{
	if (typeof(context)=="undefined") context=this;
	return nitobi.event.subscribe(evt+this.uid,nitobi.lang.close(context, func));
}

nitobi.ui.Toolbars.prototype.dispose= function()  
{
	this.toolbarXml = null;
	this.toolbarPagingXml = null;
	//	Manually dispose of important objects belonging to Grid
	if(this.toolbar && this.toolbar.dispose)
	{
	 	this.toolbar.dispose();
		this.toolbar = null;
	}

	if(this.toolbarPaging && this.toolbarPaging.dispose)
	{
	 	this.toolbarPaging.dispose();
		this.toolbarPaging = null;
	}
}  

