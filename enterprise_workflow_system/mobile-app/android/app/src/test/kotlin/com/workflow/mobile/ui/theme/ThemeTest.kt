package com.workflow.mobile.ui.theme

import org.junit.Assert.*
import org.junit.Test

class ThemeTest {

    /**
     * Helper: extract the ARGB int from a Compose Color.
     * Color(0xFF409EFF) stores the value internally as a ULong.
     * toArgb() requires Android graphics on some versions, so we
     * use the internal representation directly: the upper 32 bits
     * of Color.value hold the packed ARGB when the color space is sRGB.
     */
    private fun argb(color: androidx.compose.ui.graphics.Color): Long =
        (color.value shr 32).toLong()

    // --- Primary colors ---

    @Test
    fun `Primary color is correct blue`() {
        assertEquals(0xFF409EFFL, argb(Primary))
    }

    @Test
    fun `PrimaryDark color is correct`() {
        assertEquals(0xFF0060A9L, argb(PrimaryDark))
    }

    @Test
    fun `OnPrimary is white`() {
        assertEquals(0xFFFFFFFFL, argb(OnPrimary))
    }

    // --- Semantic colors ---

    @Test
    fun `Success color is correct green`() {
        assertEquals(0xFF67C23AL, argb(Success))
    }

    @Test
    fun `SuccessDark color is correct`() {
        assertEquals(0xFF286C00L, argb(SuccessDark))
    }

    @Test
    fun `Warning color is correct amber`() {
        assertEquals(0xFFE6A23CL, argb(Warning))
    }

    @Test
    fun `Danger color is correct red`() {
        assertEquals(0xFFF56C6CL, argb(Danger))
    }

    @Test
    fun `DangerDark color is correct`() {
        assertEquals(0xFFBA1A1AL, argb(DangerDark))
    }

    // --- Text colors ---

    @Test
    fun `TextPrimary is near-black`() {
        assertEquals(0xFF191C1EL, argb(TextPrimary))
    }

    @Test
    fun `TextSecondary is dark gray`() {
        assertEquals(0xFF404752L, argb(TextSecondary))
    }

    @Test
    fun `TextMuted is medium gray`() {
        assertEquals(0xFF707784L, argb(TextMuted))
    }

    @Test
    fun `TextDisabled is light gray`() {
        assertEquals(0xFF909399L, argb(TextDisabled))
    }

    @Test
    fun `TextLink matches PrimaryDark`() {
        assertEquals(argb(PrimaryDark), argb(TextLink))
    }

    // --- Background colors ---

    @Test
    fun `BgPage is light blue-gray`() {
        assertEquals(0xFFF7F9FCL, argb(BgPage))
    }

    @Test
    fun `BgInput is light neutral`() {
        assertEquals(0xFFF4F3F5L, argb(BgInput))
    }

    @Test
    fun `BgSurface is light gray`() {
        assertEquals(0xFFF2F4F7L, argb(BgSurface))
    }

    // --- Border colors ---

    @Test
    fun `Border color is gray`() {
        assertEquals(0xFFE0E3E6L, argb(Border))
    }

    @Test
    fun `BorderLight is lighter than Border`() {
        assertEquals(0xFFECEEF1L, argb(BorderLight))
    }

    // --- Accent ---

    @Test
    fun `ActiveBlue is correct`() {
        assertEquals(0xFF2563EBL, argb(ActiveBlue))
    }
}
