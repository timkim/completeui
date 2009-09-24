/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
nitobi.lang.defineNs('nitobi.treegrid');

/**
 * Constructs a OnAfterSortEventArgs object.
 * @class Encapsulates event arguments that are passed to event handlers subscribed to
 * Grid events that deal with sorting (e.g onaftersortevent).
 * <br/>
 * <pre class="code">
 * &lt;ntb:grid id="grid1" mode="livescrolling" onaftersortevent="clickHandler(eventArgs)"&gt;&lt;/ntb:grid&gt;
 * </pre>
 * <p>
 * The handler function might look like this:
 * </p>
 * <pre class="code">
 * &#102;unction clickHandler(event)
 * {
 * 	// Note in the sample declaration above, we use the keyword 'eventArgs' to tell the Grid we'd like
 * 	// an instance of OnAfterSortEvent to be passed to our handler.
 * 	var direction = event.getDirection();
 * }
 * </pre>
 * @constructor
 * @param {nitobi.treegrid.Grid} source The object which is firing the event.
 * @param {nitobi.treegrid.Column} cell The Column object of the Column that was sorted.
 * @param {String} direction The direction of the sort. This is either "Asc" or "Desc".
 * @extends nitobi.treegrid.ColumnEventArgs
 */
nitobi.treegrid.OnAfterSortEventArgs = function(source, column, direction)
{
	nitobi.treegrid.OnAfterSortEventArgs.baseConstructor.call(this, source, column);
	/**
	 * @private
	 */
	this.direction = direction;
}

nitobi.lang.extend(nitobi.treegrid.OnAfterSortEventArgs, nitobi.treegrid.ColumnEventArgs);

/**
 * Returns the direction of the sort.  Either "Asc" or "Desc".
 * @type String
 */
nitobi.treegrid.OnAfterSortEventArgs.prototype.getDirection = function()
{
	return this.direction;
}