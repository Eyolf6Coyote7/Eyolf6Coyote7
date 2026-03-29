plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("jacoco")
}

android {
    namespace = "com.workflow.mobile"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.workflow.mobile"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
    }

    buildFeatures {
        compose = true
    }

    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.15"
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    // Compose BOM
    val composeBom = platform("androidx.compose:compose-bom:2024.06.00")
    implementation(composeBom)

    // Compose
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")
    implementation("androidx.activity:activity-compose:1.9.0")

    // Navigation
    implementation("androidx.navigation:navigation-compose:2.7.7")

    // Lifecycle
    implementation("androidx.lifecycle:lifecycle-runtime-compose:2.8.3")

    // Retrofit + OkHttp
    implementation("com.squareup.retrofit2:retrofit:2.11.0")
    implementation("com.squareup.retrofit2:converter-gson:2.11.0")
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.12.0")

    // Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.1")

    // Debug
    debugImplementation("androidx.compose.ui:ui-tooling")

    // Test
    testImplementation("junit:junit:4.13.2")
    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.8.1")
}

tasks.withType<Test> {
    finalizedBy(tasks.named("jacocoTestReport"))
}

tasks.register<JacocoReport>("jacocoTestReport") {
    dependsOn(tasks.named("testDebugUnitTest"))
    reports {
        xml.required.set(true)
        html.required.set(true)
    }
    sourceDirectories.setFrom(files("src/main/kotlin"))
    classDirectories.setFrom(
        fileTree("build/tmp/kotlin-classes/debug") {
            exclude(
                "**/MainActivity*",
                "**/WorkflowApp*",
                "**/ui/screens/**",
                "**/ui/theme/**",
                "**/ComposableSingletons*",
            )
        },
    )
    executionData.setFrom(
        fileTree("build") {
            include("jacoco/testDebugUnitTest.exec")
        },
    )
}
