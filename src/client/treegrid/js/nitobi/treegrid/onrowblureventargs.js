/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
nitobi.lang.defineNs('nitobi.treegrid');

/**
 * Event arguments passed to handlers for the Cell blur event. Cell blur is fired when a Cell
 * is loses focus by another Cell gaining the focus.
 * @constructor
 * @param {nitobi.treegrid.Grid} source The object which is firing the event.
 * @param {nitobi.treegrid.Row} row The Row object of the cell that received focus.
 * @extends nitobi.treegrid.CellEventArgs
 * @private
 */
nitobi.treegrid.OnRowBlurEventArgs = function(source, row)
{
	nitobi.treegrid.OnRowBlurEventArgs.baseConstructor.call(this, source, row);
}

nitobi.lang.extend(nitobi.treegrid.OnRowBlurEventArgs, nitobi.treegrid.RowEventArgs);