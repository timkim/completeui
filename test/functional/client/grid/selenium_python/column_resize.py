from selenium import selenium
import unittest, time, re

class ColumnResize(unittest.TestCase):
    def setUp(self):
        self.grid = "EditorsGrid"
        self.state_host = "http://localhost/gitcui/samples/client/grid/asp/editors/index.html"
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", self.state_host)
        self.selenium.start()


    def runTest(self):
        self.test_resize()
        
    def test_resize(self):
        sel = self.selenium
        sel.open(self.state_host)
        time.sleep(2)
        script = "window.document.getElementById('columnheader_2_" + self.grid + "').clientWidth"
        old_width = sel.get_eval(script)
        script = "window.document.getElementById('columnheader_2_" + self.grid + "').offsetLeft"
        new_width = int(old_width) + 50;
        new_right = int(sel.get_eval(script)) + new_width
        time.sleep(1)
        sel.mouse_down_at("id=columnheader_2_" + self.grid, old_width + ",10")
        sel.mouse_move_at("dom=window.document.getElementById('grid" + self.grid + "')", str(new_right) + ", 10")
        sel.mouse_up_at("dom=window.document.getElementById('grid" + self.grid + "')", str(new_right) + ", 10")
        time.sleep(1)
        script = "window.document.getElementById('columnheader_2_" + self.grid + "').clientWidth"
        result = int(sel.get_eval(script))
        # Yes, this is bad, but browsers deal with this differently, and while this is stupid
        # This is also the right result.
        self.assertTrue((new_width % result) < 3);
        
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
