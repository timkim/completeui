/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
nitobi.lang.defineNs('nitobi.treegrid');

/**
 * Constructs a OnBeforeCellClickEventArgs object.  
 * @class When you subscribe to Grid events through the declaration, you
 * can optionally pass information about the event to the function
 * registered to handle it.  You do this by using the eventArgs keyword.
 * <p>
 * <b>Example</b>
 * </p>
 * <div class="code">
 * <pre><code class="html">
 * &lt;ntb:grid id="grid1" mode="livescrolling" onbeforecellclickevent="clickHandler(eventArgs)"&gt;&lt;/ntb:grid&gt;
 * </code></pre>
 * </div>
 * <p>
 * The handler function might look like this:
 * </p>
 * <div class="code">
 * <pre><code class="javascript">
 * &#102;unction clickHandler(event)
 * {
 * 	var cell = event.getCell();
 * 	if (cell.getValue() == "No Click")
 * 	{
 * 		return false;
 * 	}
 * }
 * </code></pre>
 * </div>
 * <p>
 * <b>N.B.</b>:  Note that by returning false from clickHandler, we can
 * cancel out of the click.
 * </p>
 * @constructor
 * @param {nitobi.treegrid.Grid} source The object which is firing the event.
 * @param {nitobi.treegrid.Cell} cell The Cell object of the cell that was clicked.
 * @extends nitobi.treegrid.CellEventArgs
 * @private
 */
nitobi.treegrid.OnBeforeCellClickEventArgs = function(source, cell)
{
	nitobi.treegrid.OnBeforeCellClickEventArgs.baseConstructor.call(this, source, cell);
}

nitobi.lang.extend(nitobi.treegrid.OnBeforeCellClickEventArgs, nitobi.treegrid.CellEventArgs);