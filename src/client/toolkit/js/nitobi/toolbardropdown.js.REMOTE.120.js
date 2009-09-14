/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2009, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */

// *****************************************************************************
// *****************************************************************************
// * nitobi.ui.Toolbar
// *****************************************************************************
/// <class name='nitobi.ui.Toolbar'>
/// <summary>

/// </summary>



nitobi.ui.DropDown = function (xml, id)
{
	this.initialize(xml, nitobi.ui.DropDown,id);
	this.enable();
}


nitobi.lang.extend(nitobi.ui.DropDown, nitobi.ui.InteractiveUiElement);


nitobi.ui.DropDown.prototype.onChangeHandler = function(value)
{
	var grid = this.toolbar.grid;
	grid.setRowsPerPage(value);
	grid.bind();
	this.toolbar.resetCounter();
}

nitobi.ui.DropDown.prototype.disable = function()
{
	nitobi.ui.DropDown.base.disable.call(this);
}

nitobi.ui.DropDown.prototype.enable = function()
{
	nitobi.ui.DropDown.base.enable.call(this);
}

nitobi.ui.DropDown.prototype.dispose = function()
{
	nitobi.ui.DropDown.base.dispose.call(this);
}
