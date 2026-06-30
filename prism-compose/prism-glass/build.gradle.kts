import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
    alias(libs.plugins.androidLibrary)
}

// Risk-isolated module (plan §2/§5): the only part with platform fidelity
// differences. Ships a dependency-free Skia/own-content approximation that
// compiles on every target; the production Android backdrop-blur path (Haze /
// RenderEffect) plugs in behind the same API. See PrismGlass.kt.
kotlin {
    androidTarget {
        compilerOptions { jvmTarget.set(JvmTarget.JVM_17) }
    }
    jvm("desktop")
    sourceSets {
        val commonMain by getting {
            dependencies {
                api(project(":prism-core"))
                implementation(compose.runtime)
                implementation(compose.foundation)
                implementation(compose.ui)
                implementation(compose.material3)
            }
        }
        val commonTest by getting {
            dependencies { implementation(kotlin("test")) }
        }
    }
}

android {
    namespace = "io.github.heartcoolman.prism.glass"
    compileSdk = 35
    defaultConfig { minSdk = 31 }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
