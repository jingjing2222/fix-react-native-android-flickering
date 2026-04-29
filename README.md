# React Native Android Fabric Flicker Repro

| As-is | To-be |
| --- | --- |
| ![Baseline Android Fabric flicker repro](https://raw.githubusercontent.com/jingjing2222/fix-react-native-android-flickering/main/as-is.gif) | ![Patched Android Fabric flicker result](https://raw.githubusercontent.com/jingjing2222/fix-react-native-android-flickering/main/to-be.gif) |
| [as-is.gif](./as-is.gif) · [as-is.mov](./as-is.mov) | [to-be.gif](./to-be.gif) · [to-be.mov](./to-be.mov) |

This repository is the minimal reproduction and visual explanation for
[facebook/react-native#56652](https://github.com/facebook/react-native/pull/56652).
The GIFs above are provided for inline README preview, and the linked `.mov`
files are kept for closer frame-by-frame inspection.

The PR enables `overrideBySynchronousMountPropsAtMountingAndroid` by default on
Android. The issue being demonstrated is a Fabric/Native Animated race where a
regular mount update can apply stale props after Native Animated has already
applied newer synchronous `transform` props on the UI thread, producing a
visible jump during native-driver animations.

## PR Diff Summary

The PR diff is intentionally small. It changes the feature flag default from
`false` to `true` and includes the generated outputs from that flag update:

- `packages/react-native/scripts/featureflags/ReactNativeFeatureFlags.config.js`
  sets the source flag default to `true`.
- `packages/react-native/ReactAndroid/src/main/java/com/facebook/react/internal/featureflags/ReactNativeFeatureFlagsDefaults.kt`
  regenerates the Android Kotlin default provider.
- `packages/react-native/ReactCommon/react/featureflags/ReactNativeFeatureFlagsDefaults.h`
  regenerates the C++ default provider.
- `packages/react-native/src/private/featureflags/ReactNativeFeatureFlags.js`
  regenerates the JS feature flag getter default.

## Repro Apps

This repository contains two React Native CLI workspaces generated with React Native `0.85.2`.

- `apps/rn-flicker-baseline`: stock Android Fabric behavior.
- `apps/rn-flicker-patched`: same JS repro, with Android Fabric NativeAnimated synchronous mount props enabled.

Both apps expose the same two screens:

- `Direct Text`: applies native-driver `transform` directly to `Animated.Text`.
- `Nested`: applies the same native-driver `transform` to an `Animated.View` wrapper around `Text`.

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
