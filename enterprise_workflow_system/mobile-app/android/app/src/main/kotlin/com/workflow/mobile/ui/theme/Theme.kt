package com.workflow.mobile.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight

// WorkflowOS Design System Colors (from Figma)
val Primary = Color(0xFF409EFF)
val PrimaryDark = Color(0xFF0060A9)
val OnPrimary = Color.White
val Success = Color(0xFF67C23A)
val SuccessDark = Color(0xFF286C00)
val Warning = Color(0xFFE6A23C)
val Danger = Color(0xFFF56C6C)
val DangerDark = Color(0xFFBA1A1A)

val TextPrimary = Color(0xFF191C1E)
val TextSecondary = Color(0xFF404752)
val TextMuted = Color(0xFF707784)
val TextDisabled = Color(0xFF909399)
val TextLink = Color(0xFF0060A9)

val BgPage = Color(0xFFF7F9FC)
val BgCard = Color.White
val BgInput = Color(0xFFF4F3F5)
val BgSurface = Color(0xFFF2F4F7)
val Border = Color(0xFFE0E3E6)
val BorderLight = Color(0xFFECEEF1)

val ActiveBlue = Color(0xFF2563EB)

private val LightColors = lightColorScheme(
    primary = Primary,
    onPrimary = OnPrimary,
    primaryContainer = Color(0xFFD3E4FF),
    onPrimaryContainer = Color(0xFF003460),
    secondary = Color(0xFF475569),
    onSecondary = Color.White,
    secondaryContainer = Color(0xFFF1F5F9),
    tertiary = Warning,
    error = Danger,
    onError = Color.White,
    errorContainer = Color(0xFFFFDAD6),
    background = BgPage,
    onBackground = TextPrimary,
    surface = BgCard,
    onSurface = TextPrimary,
    surfaceVariant = BgSurface,
    onSurfaceVariant = TextSecondary,
    outline = Border,
    outlineVariant = BorderLight,
)

private val DarkColors = darkColorScheme(
    primary = Color(0xFF90CAF9),
    onPrimary = Color(0xFF003460),
    primaryContainer = PrimaryDark,
    secondary = Color(0xFF90A4AE),
    tertiary = Color(0xFFCE93D8),
    error = Color(0xFFEF9A9A)
)

@Composable
fun WorkflowTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = false, // Use our design system colors
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColors
        else -> LightColors
    }

    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}
