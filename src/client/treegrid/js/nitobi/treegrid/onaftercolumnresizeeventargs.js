/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
nitobi.lang.defineNs('nitobi.treegrid');

/**
 * Constructs a new OnAfterColumnResizeEventArgs object.
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
 * 	// an instance of CellEventArgs to be passed to our handler.
 * 	var column = event.getColumn();
 * 	column.getDomNode().style.backgroundColor = "red";
 * }
 * </pre>
 * @constructor
 * @param {nitobi.treegrid.Grid} source The object which is firing the event.
 * @param {nitobi.treegrid.Column} column The Column object of the Column that was resized.
 * @extends nitobi.treegrid.ColumnEventArgs
 * @private
 */
nitobi.treegrid.OnAfterColumnResizeEventArgs = function(source, column)
{
	nitobi.treegrid.OnAfterColumnResizeEventArgs.baseConstructor.call(this, source, column);
}

nitobi.lang.extend(nitobi.treegrid.OnAfterColumnResizeEventArgs, nitobi.treegrid.ColumnEventArgs);