package com.demoproject;
import com.facebook.react.ReactActivity;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen; 

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "demoproject";
  }

  /** 
   * This change is required to avoid crashes related to View state being not persisted consistently across Activity restarts.
   * https://reactnavigation.org/docs/getting-started#installing-dependencies-into-a-bare-react-native-project
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
  }
}
