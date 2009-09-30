/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
nitobi.lang.defineNs('nitobi.treegrid');

/**
 * Creates a new CellEventArgs object.
 * @class Encapsulates event arguments that are passed to event handlers subscribed to
 * Grid events that deal with cells (e.g oncellclickevent).
 * <br/>
 * <pre class="code">
 * &lt;ntb:grid id="grid1" mode="livescrolling" oncellclickevent="clickHandler(eventArgs)"&gt;&lt;/ntb:grid&gt;
 * </pre>
 * <p>
 * The handler function might look like this:
 * </p>
 * <pre class="code">
 * &#102;unction clickHandler(event)
 * {
 * 	// Note in the sample declaration above, we use the keyword 'eventArgs' to tell the Grid we'd like
 * 	// an instance of CellEventArgs to be passed to our handler.
 * 	var cell = event.getCell();
 * 	cell.getStyle().backgroundColor = "red";
 * }
 * </pre>
 * @constructor
 * @param {nitobi.treegrid.Grid} source The object which is firing the event.
 * @param {nitobi.treegrid.Cell} cell The Cell object of the cell that received focus.
 */
nitobi.treegrid.CellEventArgs = function(source, cell)
{
	nitobi.treegrid.CellEventArgs.baseConstructor.call(this, source);
	/**
	 * @private
	 */
	this.cell = cell;
}

nitobi.lang.extend(nitobi.treegrid.CellEventArgs, nitobi.base.EventArgs);

/**
 * Gets the Cell on which the event was fired.
 * @type nitobi.treegrid.Cell
 */
nitobi.treegrid.CellEventArgs.prototype.getCell = function()
{
	return this.cell;
}
