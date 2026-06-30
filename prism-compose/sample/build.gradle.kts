import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
}

kotlin {
    jvm("desktop")

    sourceSets {
        val desktopMain by getting {
            dependencies {
                implementation(project(":prism-ui"))
                implementation(project(":prism-core"))
                implementation(project(":prism-icons"))
                implementation(project(":prism-charts"))
                implementation(project(":prism-glass"))
                implementation(compose.runtime)
                implementation(compose.foundation)
                implementation(compose.material3)
                implementation(compose.ui)
                implementation(compose.desktop.currentOs)
            }
        }
    }
}

compose.desktop {
    application {
        mainClass = "io.github.heartcoolman.prism.sample.MainKt"
        nativeDistributions {
            targetFormats(TargetFormat.Dmg)
            packageName = "PrismSample"
            packageVersion = "1.0.0"
        }
    }
}
