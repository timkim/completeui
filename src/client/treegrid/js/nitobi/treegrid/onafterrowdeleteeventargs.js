/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
nitobi.lang.defineNs('nitobi.treegrid');

/**
 * Event arguments passed to handlers after a Row is deleted.
 * @constructor
 * @param {nitobi.treegrid.Grid} source The object which is firing the event.
 * @param {nitobi.treegrid.Row} cell The Row object of the cell that was clicked.
 * @extends nitobi.treegrid.RowEventArgs
 * @private
 */
nitobi.treegrid.OnAfterRowDeleteEventArgs = function(source, row)
{
	nitobi.treegrid.OnAfterRowDeleteEventArgs.baseConstructor.call(this, source, row);
}

nitobi.lang.extend(nitobi.treegrid.OnAfterRowDeleteEventArgs, nitobi.treegrid.RowEventArgs);