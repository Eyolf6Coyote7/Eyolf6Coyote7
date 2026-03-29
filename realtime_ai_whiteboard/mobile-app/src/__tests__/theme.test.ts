import { colors, fonts, radii, shadows } from "../theme";

describe("whiteboard mobile theme", () => {
  describe("colors", () => {
    it("should export primary palette", () => {
      expect(colors.primary).toBe("#2563EB");
      expect(colors.primaryDark).toBe("#004AC6");
      expect(colors.primaryLight).toBe("rgba(172, 191, 255, 0.2)");
    });

    it("should export text colors", () => {
      expect(colors.heading).toBe("#191C1E");
      expect(colors.body).toBe("#434655");
      expect(colors.muted).toBe("#737686");
    });

    it("should export background colors", () => {
      expect(colors.bg).toBe("#F8F9FB");
      expect(colors.cardBg).toBe("#FFFFFF");
      expect(colors.inputBg).toBe("#F3F4F6");
    });

    it("should export semantic colors", () => {
      expect(colors.danger).toBe("#BC000A");
      expect(colors.success).toBe("#16A34A");
    });

    it("should export white and black", () => {
      expect(colors.white).toBe("#FFFFFF");
      expect(colors.black).toBe("#000000");
    });
  });

  describe("fonts", () => {
    it("should use Inter as the regular font", () => {
      expect(fonts.regular).toBe("Inter");
    });

    it("h1 should have correct size and weight", () => {
      expect(fonts.h1.fontSize).toBe(24);
      expect(fonts.h1.fontWeight).toBe("600");
      expect(fonts.h1.lineHeight).toBe(32);
      expect(fonts.h1.letterSpacing).toBe(-0.48);
    });

    it("body should have correct size and weight", () => {
      expect(fonts.body.fontSize).toBe(16);
      expect(fonts.body.fontWeight).toBe("400");
      expect(fonts.body.lineHeight).toBe(24);
    });

    it("label should be uppercase", () => {
      expect(fonts.label.textTransform).toBe("uppercase");
      expect(fonts.label.letterSpacing).toBe(1.1);
    });

    it("tabLabel should be uppercase", () => {
      expect(fonts.tabLabel.textTransform).toBe("uppercase");
    });

    it("button should have bold weight", () => {
      expect(fonts.button.fontWeight).toBe("700");
    });
  });

  describe("radii", () => {
    it("should export size scale", () => {
      expect(radii.sm).toBe(8);
      expect(radii.md).toBe(12);
      expect(radii.lg).toBe(16);
      expect(radii.xl).toBe(24);
      expect(radii.pill).toBe(9999);
    });

    it("pill should be the largest radius", () => {
      expect(radii.pill).toBeGreaterThan(radii.xl);
    });
  });

  describe("shadows", () => {
    it("card shadow should have low elevation", () => {
      expect(shadows.card.elevation).toBe(2);
      expect(shadows.card.shadowOpacity).toBe(0.1);
    });

    it("elevated shadow should have medium elevation", () => {
      expect(shadows.elevated.elevation).toBe(8);
      expect(shadows.elevated.shadowRadius).toBe(20);
    });

    it("fab shadow should use primary color and high elevation", () => {
      expect(shadows.fab.shadowColor).toBe("#004AC6");
      expect(shadows.fab.elevation).toBe(12);
      expect(shadows.fab.shadowOpacity).toBe(0.3);
    });

    it("all shadows should have shadowOffset with width and height", () => {
      [shadows.card, shadows.elevated, shadows.fab].forEach((s) => {
        expect(s.shadowOffset).toHaveProperty("width");
        expect(s.shadowOffset).toHaveProperty("height");
      });
    });
  });
});
