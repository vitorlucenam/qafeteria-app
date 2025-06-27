export default {
  expo: {
    name: "QAfeteria",
    slug: "qafeteria",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.qafeteria.app",
      buildNumber: "1",
      // iOS specific configurations for XCUITest
      infoPlist: {
        // Enable accessibility for testing
        "UIAccessibilityEnabled": true,
        // Allow HTTP connections for testing (if needed)
        "NSAppTransportSecurity": {
          "NSAllowsArbitraryLoads": true,
          "NSExceptionDomains": {
            "localhost": {
              "NSExceptionAllowsInsecureHTTPLoads": true
            }
          }
        },
        // Enable automation for XCUITest
        "CFBundleAllowMixedLocalizations": true
      },
      // Development team for debug builds (only used in CNG/Prebuild)
      // developmentTeam: process.env.APPLE_TEAM_ID || "YOUR_TEAM_ID"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: "com.qafeteria.app",
      versionCode: 1,
      // Android specific configurations for Espresso
      permissions: [
        "android.permission.INTERNET",
        "android.permission.ACCESS_NETWORK_STATE",
        // Permissions for testing
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.READ_EXTERNAL_STORAGE"
      ],
      // Enable debug keystore for testing (only used in CNG/Prebuild)
      // signingKey: process.env.NODE_ENV === 'development' ? 'debug' : undefined
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    // Development and testing configurations
    developmentClient: {
      silentLaunch: true
    },
    // Runtime version for compatibility with different SDK versions
    runtimeVersion: {
      policy: "nativeVersion"
    },
    extra: {
      eas: {
        projectId: "4e7cf5ef-12d1-4745-aded-88fb7c859432"
      },
      // Environment variables for testing
      apiUrl: process.env.API_URL || "http://localhost:3000",
      enableTesting: process.env.ENABLE_TESTING === "true",
      testEnvironment: process.env.TEST_ENV || "development",
      // Appium configuration
      appium: {
        automationName: "XCUITest", // for iOS
        platformName: "iOS",
        platformVersion: "16.0",
        deviceName: "iPhone 14",
        app: "./ios/build/Build/Products/Debug-iphonesimulator/QAfeteria.app",
        // Android Appium config
        androidAutomationName: "UiAutomator2",
        androidPlatformName: "Android",
        androidPlatformVersion: "12",
        androidDeviceName: "Android Emulator",
        androidApp: "./android/app/build/outputs/apk/debug/app-debug.apk"
      }
    },
    // Plugin configurations for testing
    plugins: [
      [
        "expo-build-properties",
        {
          android: {
            // Enable debugging for Espresso
            debuggable: process.env.NODE_ENV === 'development',
            testInstrumentationRunner: "androidx.test.runner.AndroidJUnitRunner",
            compileSdkVersion: 35,
            targetSdkVersion: 34,
            minSdkVersion: 21,
            buildToolsVersion: "34.0.0"
          },
          ios: {
            // Enable debugging for XCUITest
            debuggable: process.env.NODE_ENV === 'development'
          }
        }
      ]
    ],
    // Debugging configurations (custom, not part of Expo schema)
    // debugging: {
    //   // Enable remote debugging
    //   remoteDebugging: process.env.NODE_ENV === 'development',
    //   // Enable accessibility inspector
    //   accessibilityInspector: true,
    //   // Enable element inspector for Appium
    //   elementInspector: process.env.ENABLE_TESTING === "true"
    // }
  }
};