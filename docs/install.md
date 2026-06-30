# Get Started

## Requirements

| | Version |
|---|---|
| Kotlin | 2.1.0 |
| Compose Multiplatform | 1.7.3 |
| Gradle | 8.9+ |
| Android `minSdk` | 31 (Android 12 — hardware backdrop blur) |
| JDK | 17+ |

Targets: `android` · `ios` · `desktop (jvm)`. The web is a separate React package, [`@prism-ds/react`](https://github.com/Heartcoolman/prism-ds).

## Add the dependency

!!! warning "Pre-release"
    Prism Compose is not yet on Maven Central. For now consume the modules from source — clone the repo and add them as an included build, or copy the `prism-compose/` modules into your project. The coordinates below are the planned published form.

=== "Gradle (planned coordinates)"

    ```kotlin
    // build.gradle.kts
    dependencies {
        implementation("io.github.heartcoolman.prism:prism-core:0.1.0")
        implementation("io.github.heartcoolman.prism:prism-ui:0.1.0")
        implementation("io.github.heartcoolman.prism:prism-icons:0.1.0")
        // optional:
        implementation("io.github.heartcoolman.prism:prism-charts:0.1.0")
        implementation("io.github.heartcoolman.prism:prism-glass:0.1.0")
    }
    ```

=== "From source (today)"

    ```kotlin
    // settings.gradle.kts
    includeBuild("path/to/prism-ds/prism-compose")
    ```

    Then depend on the modules by their project coordinates.

## Wrap your app

Put `PrismTheme` at the root. It provides the token `CompositionLocal`s and a Material 3 base, and follows the system light/dark setting by default.

```kotlin
import io.github.heartcoolman.prism.core.PrismTheme
import io.github.heartcoolman.prism.core.tokens.appleBrand

@Composable
fun App() {
    PrismTheme(brand = appleBrand) {       // or neutralBrand, or your own
        Home()
    }
}
```

## Use a component

```kotlin
import io.github.heartcoolman.prism.ui.*

@Composable
fun Home() {
    Column(
        verticalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s3),
        modifier = Modifier.padding(PrismTheme.spacing.s5),
    ) {
        PrismButton(onClick = { /* … */ }, variant = PrismButtonVariant.Filled) {
            Text("Get started")
        }

        PrismTextField(
            value = name,
            onValueChange = { name = it },
            label = "Name",
        )

        PrismTag("Selected", selected = true, onClick = {})
    }
}
```

## Run the sample

The repo ships a desktop gallery that instantiates every component:

```bash
cd prism-compose
./gradlew :sample:run
```

Or run the full cross-verification gate (token parity + desktop compile/tests + android compile):

```bash
./verify.sh
```
