/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
/**
 * @constructor
 * @extends nitobi.treegrid.Column
 */
nitobi.treegrid.TextColumn = function(grid, column, surface)
{
	nitobi.treegrid.TextColumn.baseConstructor.call(this, grid, column, surface);
}

nitobi.lang.extend(nitobi.treegrid.TextColumn, nitobi.treegrid.Column);