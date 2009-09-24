/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
nitobi.lang.defineNs('nitobi.treegrid');

/**
 * Event arguments passed to handlers before a a Row is deleted.
 * @constructor
 * @param {nitobi.treegrid.Grid} source The object which is firing the event.
 * @param {nitobi.treegrid.Row} cell The Row object of the cell that was clicked.
 * @extends nitobi.treegrid.RowEventArgs
 * @private
 */
nitobi.treegrid.OnBeforeRowDeleteEventArgs = function(source, row)
{
	nitobi.treegrid.OnBeforeRowDeleteEventArgs.baseConstructor.call(this, source, row);
}

nitobi.lang.extend(nitobi.treegrid.OnBeforeRowDeleteEventArgs, nitobi.treegrid.RowEventArgs);