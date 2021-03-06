package RemoteControl.Test;

import RemoteControl.BaseTest;
import RemoteControl.Configuration;
import junit.framework.*;
import com.thoughtworks.selenium.*;

public class ColumnResizeTest extends BaseTest {
	
	public void setUp() throws Exception {		
		super.setUp();

		// Set the ID of the component declaration node
		this.declarationId = "EditorsGrid";

		// Call start session
		startSession(this.baseuri + "/samples/client/grid/php/editors/index.html", "http://localhost");
	}

	public void testColumnResize() throws Exception {
		int origWidth = getColumnWidth(2);
		resizeColumn(2, 100);
    // We should wait for the resize to update the dom before testing this
    pause("1000");
		assertEquals(origWidth + 100, getColumnWidth(2));
	}
	
	public void tearDown() throws Exception {
		//super.tearDown();
	}
}
