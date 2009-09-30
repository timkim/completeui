/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
nitobi.lang.defineNs('nitobi.treegrid');

/**
 * Event arguments for when data is pasted into the Grid.
 * @constructor
 * @param {nitobi.treegrid.Grid} source The Grid which is firing the event.
 * @param {String} data The data that is being copied in either tab separated or HTML table format.
 * @param {Object} coords The top left and bottom right coords, which are nitobi.drawing.Point objects. {"top":POINT,"bottom":POINT}.
 * @extends nitobi.treegrid.SelectionEventArgs
 * @private
 */
nitobi.treegrid.OnPasteEventArgs = function(source, data, coords)
{
	nitobi.treegrid.OnPasteEventArgs.baseConstructor.apply(this, arguments);
}

nitobi.lang.extend(nitobi.treegrid.OnPasteEventArgs, nitobi.treegrid.SelectionEventArgs);