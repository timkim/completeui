/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
nitobi.lang.defineNs('nitobi.treegrid');

/**
 * Event arguments passed to handlers for the Cell focus event. Cell focus is fired when a Cell
 * is either clicked on using the mouse or navigated to with the keyboard.
 * @constructor
 * @param {nitobi.treegrid.Grid} source The object which is firing the event.
 * @param {nitobi.treegrid.Row} row The Row object of the cell that received focus.
 * @extends nitobi.treegrid.CellEventArgs
 * @private
 */
nitobi.treegrid.OnRowFocusEventArgs = function(source, row)
{
	nitobi.treegrid.OnRowFocusEventArgs.baseConstructor.call(this, source, row);
}

nitobi.lang.extend(nitobi.treegrid.OnRowFocusEventArgs, nitobi.treegrid.RowEventArgs);