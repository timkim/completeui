from selenium import selenium
import unittest, time, re

class ColumnSort(unittest.TestCase):
    def setUp(self):
        self.grid = "EditorsGrid"
        self.state_host = "http://localhost/gitcui/samples/client/grid/asp/editors/index.html"
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", self.state_host)
        self.selenium.start()

    def test_sort(self):
        sel = self.selenium
        sel.open(self.state_host)
        time.sleep(2)
        # In grid, we don't click, we use mouse_down AND mouse_up.  This is important
        sel.mouse_down("dom=window.document.getElementById('columnheader_3_" + self.grid + "')")
        sel.mouse_up("dom=window.document.getElementById('columnheader_3_" + self.grid + "')")
        time.sleep(1)
        for x in range(0, 5):
            script = "window.document.getElementById('cell_" + str(x) + "_3_" + self.grid + "').firstChild.innerHTML"
            cellval = sel.get_eval(script)
            self.assertEqual("Adhesive",cellval)
        sel.mouse_down("dom=window.document.getElementById('columnheader_3_" + self.grid + "')")
        sel.mouse_up("dom=window.document.getElementById('columnheader_3_" + self.grid + "')")
        time.sleep(1)
        for x in range(0, 5):
            script = "window.document.getElementById('cell_" + str(x) + "_3_" + self.grid + "').firstChild.innerHTML"
            cellval = sel.get_eval(script)
            self.assertTrue(cellval.index("Wood") == 0)
            
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
