/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
nitobi.lang.defineNs('nitobi.treegrid');

/**
 * Event arguments passed to handlers after a Row is inserted.
 * @constructor
 * @param {nitobi.treegrid.Grid} source The object which is firing the event.
 * @param {nitobi.treegrid.Row} cell The Row object of the cell that was clicked.
 * @extends nitobi.treegrid.RowEventArgs
 * @private
 */
nitobi.treegrid.OnAfterRowInsertEventArgs = function(source, row)
{
	nitobi.treegrid.OnAfterRowInsertEventArgs.baseConstructor.call(this, source, row);
}

nitobi.lang.extend(nitobi.treegrid.OnAfterRowInsertEventArgs, nitobi.treegrid.RowEventArgs);