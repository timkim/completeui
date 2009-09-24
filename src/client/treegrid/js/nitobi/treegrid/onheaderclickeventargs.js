/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
nitobi.lang.defineNs('nitobi.treegrid');

/**
 * Event arguments for when the user clicks on a column header.
 * @constructor
 * @param {nitobi.treegrid.Grid} source The object which is firing the event.
 * @param {nitobi.treegrid.Column} column The Column object of the Column to which the header belongs.
 * @extends nitobi.treegrid.ColumnEventArgs
 * @private
 */
nitobi.treegrid.OnHeaderClickEventArgs = function(source, column)
{
	nitobi.treegrid.OnHeaderClickEventArgs.baseConstructor.call(this, source, column);
}

nitobi.lang.extend(nitobi.treegrid.OnHeaderClickEventArgs, nitobi.treegrid.ColumnEventArgs);