/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
/**
 * @constructor
 * @extends nitobi.grid.Column
 */
nitobi.grid.TextColumn = function(grid, column, surface)
{
	nitobi.grid.TextColumn.baseConstructor.call(this, grid, column, surface);
}

nitobi.lang.extend(nitobi.grid.TextColumn, nitobi.grid.Column);