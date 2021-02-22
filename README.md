# RNBP-Camera
React Native Camera


1. npm i react-native-camera 
 2. npm i rn-fetch-blob 
 3.Insert the following lines in android/app/src/main/AndroidManifest.xml 

uses-permission android:name="android.permission.CAMERA" /
        uses-permission android:name="android.permission.RECORD_AUDIO"/
      uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" /
      uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" /
     

4.Insert the following lines in android/app/build.gradle: 
android {
  ...
  defaultConfig {
    ...
    missingDimensionStrategy 'react-native-camera', 'general' // --- insert this line
  }
}

5. npx react-native run-android done
