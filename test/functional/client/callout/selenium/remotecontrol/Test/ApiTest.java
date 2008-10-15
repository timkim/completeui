package RemoteControl.Test;

import com.thoughtworks.selenium.*;
import java.util.regex.Pattern;
import RemoteControl.BaseTest;

public class ApiTest extends BaseTest {

  public String[] skins = { "peanut_noaccess", "peanut_talkbubble", "peanut_info", "peanut_exclaim", "clean", "xp", "vista", "impact" };

  public String[] skin_display = { "Peanut (No Access)", "Peanut (Talk Bubble)", "Peanut (Information mark)", "Peanut (Exclaimation mark)", "Clean", "XP", "Vista", "Impact" };

  public String[] directions = { "No Direction", "Top Left" , "Top Right", "Bottom Right", "Bottom Left", "Right Bottom", "Right Top", "Left Bottom", "Left Top"};

  public void setUp() throws Exception {
    super.setUp();

    startSession("/completeui/samples/client/callout/", "http://localhost");
  }

  public void createCallout(String skin, String direction) throws Exception {
		selenium.open("/completeui/samples/client/callout/html/api/index.html");
		selenium.select("skin", "label=" + skin);
    selenium.select("cdir", "label=" + direction);
		selenium.click("//button[@onclick='createCallout(this.form); return false;']");
  }

  public void testCalloutCss() throws Exception {
    for(int i = 0; i < skins.length();; ++i)
    {
      createCallout(skin_display[i], directions[0]);
      assertTrue(isCalloutComplete(skins[i]);      
    }
  }


  /*
   * This does the grunt work of determining which CSS classes are going to be used.
   * It's generally
   */
  protected boolean isCalloutComplete(skin, direction)
  {
    String values[11];
    values[0] = eval("document.getElementsByClassName(\"ntb" + skin + "Callout_bl_main");
    values[1] = eval("document.getElementsByClassName(\"ntb" + skin + "Callout_bl_right");
    values[2] = eval("document.getElementsByClassName(\"ntb" + skin + "Callout_br_plain");
    values[3] = eval("document.getElementsByClassName(\"ntb" + skin + "Callout_titlediv0");
    values[4] = eval("document.getElementsByClassName(\"ntb" + skin + "Callout_close_off");
    values[5] = eval("document.getElementsByClassName(\"ntb" + skin + "Callout_bodydiv0");
    values[6] = eval("document.getElementsByClassName(\"ntb" + skin + "Callout_br_bottom");
    values[7] = eval("document.getElementsByClassName(\"ntb" + skin + "Callout_bl_bottom");
    values[8] = eval("document.getElementsByClassName(\"ntb" + skin + "Callout_br_plain");
    values[9] = eval("document.getElementsByClassName(\"ntb" + skin + "Callout_tl_main");
    values[0] = eval("document.getElementsByClassName(\"ntb" + skin + "Callout_bl_main");   
  }

  public void tearDown() throws Exception {
    super.tearDown();
  }

}
