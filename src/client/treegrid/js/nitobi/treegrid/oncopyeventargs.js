/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
nitobi.lang.defineNs('nitobi.treegrid');

/**
 * Constructs a OnCopyEventArgs object.
 * @class When you subscribe to Grid events through the declaration, you
 * can optionally pass information about the event to the function
 * registered to handle it.  You do this by using the eventArgs keyword.
 * @constructor
 * @param {nitobi.treegrid.Grid} source The object which is firing the event.
 * @param {String} data The data that was copied in HTML table format.
 * @param {Object} coords The top left and bottom right coords, which are nitobi.drawing.Point objects. {"top":POINT,"bottom":POINT}.
 * @extends nitobi.treegrid.SelectionEventArgs
 * @private
 */
nitobi.treegrid.OnCopyEventArgs = function(source, data, coords)
{
	nitobi.treegrid.OnCopyEventArgs.baseConstructor.apply(this, arguments);
}

nitobi.lang.extend(nitobi.treegrid.OnCopyEventArgs, nitobi.treegrid.SelectionEventArgs);