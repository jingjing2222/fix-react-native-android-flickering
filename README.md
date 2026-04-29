# React Native Android Fabric Flicker Repro

| As-is | To-be |
| --- | --- |
| <video src="./as-is.mov" controls width="360"></video> | <video src="./to-be.mov" controls width="360"></video> |
| [as-is.mov](./as-is.mov) | [to-be.mov](./to-be.mov) |

This repository contains two React Native CLI workspaces generated with React Native `0.85.2`.

- `apps/rn-flicker-baseline`: stock Android Fabric behavior.
- `apps/rn-flicker-patched`: same JS repro, with Android Fabric NativeAnimated synchronous mount props enabled.

Both apps expose the same two screens:

- `Direct Text`: applies native-driver `transform` directly to `Animated.Text`.
- `Nested`: applies the same native-driver `transform` to an `Animated.View` wrapper around `Text`.

## Patch

The upstream patch changes the feature flag default and regenerates the generated flag files:

```diff
diff --git a/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/internal/featureflags/ReactNativeFeatureFlagsDefaults.kt b/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/internal/featureflags/ReactNativeFeatureFlagsDefaults.kt
index a9e1a1e0cb7..7136c0a4758 100644
--- a/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/internal/featureflags/ReactNativeFeatureFlagsDefaults.kt
+++ b/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/internal/featureflags/ReactNativeFeatureFlagsDefaults.kt
@@ -4,7 +4,7 @@
  * This source code is licensed under the MIT license found in the
  * LICENSE file in the root directory of this source tree.
  *
- * @generated SignedSource<<d2b14345bf627e35562530912b3aae1f>>
+ * @generated SignedSource<<a9a8ce443fa160a7494fc1c9e7baa02f>>
  */
 
 /**
@@ -153,7 +153,7 @@ public open class ReactNativeFeatureFlagsDefaults : ReactNativeFeatureFlagsProvi
 
   override fun hideOffscreenVirtualViewsOnIOS(): Boolean = false
 
-  override fun overrideBySynchronousMountPropsAtMountingAndroid(): Boolean = false
+  override fun overrideBySynchronousMountPropsAtMountingAndroid(): Boolean = true
 
   override fun perfIssuesEnabled(): Boolean = false
 
diff --git a/packages/react-native/ReactCommon/react/featureflags/ReactNativeFeatureFlagsDefaults.h b/packages/react-native/ReactCommon/react/featureflags/ReactNativeFeatureFlagsDefaults.h
index bfbe407374a..10df0490068 100644
--- a/packages/react-native/ReactCommon/react/featureflags/ReactNativeFeatureFlagsDefaults.h
+++ b/packages/react-native/ReactCommon/react/featureflags/ReactNativeFeatureFlagsDefaults.h
@@ -4,7 +4,7 @@
  * This source code is licensed under the MIT license found in the
  * LICENSE file in the root directory of this source tree.
  *
- * @generated SignedSource<<4a2fd61cbcdb28042f09ccb03c970674>>
+ * @generated SignedSource<<d987528598996fc7b1bf3c872f51e2ed>>
  */
 
 /**
@@ -288,7 +288,7 @@ class ReactNativeFeatureFlagsDefaults : public ReactNativeFeatureFlagsProvider {
   }
 
   bool overrideBySynchronousMountPropsAtMountingAndroid() override {
-    return false;
+    return true;
   }
 
   bool perfIssuesEnabled() override {
diff --git a/packages/react-native/scripts/featureflags/ReactNativeFeatureFlags.config.js b/packages/react-native/scripts/featureflags/ReactNativeFeatureFlags.config.js
index 8f5856661e9..6008e3209f1 100644
--- a/packages/react-native/scripts/featureflags/ReactNativeFeatureFlags.config.js
+++ b/packages/react-native/scripts/featureflags/ReactNativeFeatureFlags.config.js
@@ -743,7 +743,7 @@ const definitions: FeatureFlagDefinitions = {
       ossReleaseStage: 'none',
     },
     overrideBySynchronousMountPropsAtMountingAndroid: {
-      defaultValue: false,
+      defaultValue: true,
       metadata: {
         dateAdded: '2025-09-04',
         description:
diff --git a/packages/react-native/src/private/featureflags/ReactNativeFeatureFlags.js b/packages/react-native/src/private/featureflags/ReactNativeFeatureFlags.js
index ad14fb3138a..8f5f75e62a1 100644
--- a/packages/react-native/src/private/featureflags/ReactNativeFeatureFlags.js
+++ b/packages/react-native/src/private/featureflags/ReactNativeFeatureFlags.js
@@ -4,7 +4,7 @@
  * This source code is licensed under the MIT license found in the
  * LICENSE file in the root directory of this source tree.
  *
- * @generated SignedSource<<aa202d346e68c3dd641d557306964ebe>>
+ * @generated SignedSource<<1dd51a152bb30c0e2073a14566c8368d>>
  * @flow strict
  * @noformat
  */
@@ -468,7 +468,7 @@ export const hideOffscreenVirtualViewsOnIOS: Getter<boolean> = createNativeFlagG
 /**
  * Override props at mounting with synchronously mounted (i.e. direct manipulation) props from Native Animated.
  */
-export const overrideBySynchronousMountPropsAtMountingAndroid: Getter<boolean> = createNativeFlagGetter('overrideBySynchronousMountPropsAtMountingAndroid', false);
+export const overrideBySynchronousMountPropsAtMountingAndroid: Getter<boolean> = createNativeFlagGetter('overrideBySynchronousMountPropsAtMountingAndroid', true);
 /**
  * Enable reporting Performance Issues (`detail.devtools.performanceIssue`). Displayed in the V2 Performance Monitor and the "Performance Issues" sub-panel in DevTools.
  */
```

After changing `packages/react-native/scripts/featureflags/ReactNativeFeatureFlags.config.js`, run:

```sh
yarn featureflags --update
```

For the local `0.85.2` app package, the config file is not shipped in the npm tarball, so `apps/rn-flicker-patched` carries the generated defaults through `yarn patch`.

## Environment

The repo pins local tool versions with `mise`:

```sh
mise trust
mise install
```

Yarn is configured for predictable `node_modules` installs:

```text
yarn 4.13.0
nodeLinker: node-modules
nmHoistingLimits: none
```

## Run

Baseline:

```sh
cd apps/rn-flicker-baseline
yarn install
yarn android
```

Patched:

```sh
cd apps/rn-flicker-patched
yarn install
yarn android
```

Clean Android rebuild for the patched app:

```sh
cd apps/rn-flicker-patched
cd android
./gradlew :app:installDebug
```
