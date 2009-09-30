/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
nitobi.lang.defineNs('nitobi.treegrid');

/**
 * Event arguments for when the a Column is resized.
 * @constructor
 * @param {nitobi.treegrid.Grid} source The object which is firing the event.
 * @param {nitobi.treegrid.Column} column The Column object of the Column that was resized.
 * @extends nitobi.treegrid.ColumnEventArgs
 * @private
 */
nitobi.treegrid.OnBeforeColumnResizeEventArgs = function(source, column)
{
	nitobi.treegrid.OnBeforeColumnResizeEventArgs.baseConstructor.call(this, source, column);
}

nitobi.lang.extend(nitobi.treegrid.OnBeforeColumnResizeEventArgs, nitobi.treegrid.ColumnEventArgs);