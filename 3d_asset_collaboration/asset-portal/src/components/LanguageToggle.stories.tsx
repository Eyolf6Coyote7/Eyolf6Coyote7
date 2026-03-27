import type { Meta, StoryObj } from "@storybook/react";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { LanguageToggle } from "./LanguageToggle";

// Minimal i18n instance for Storybook isolation
const i18nInstance = i18n.createInstance();
void i18nInstance.init({
  lng: "en",
  fallbackLng: "en",
  resources: { en: { translation: {} }, "zh-TW": { translation: {} } },
});

const meta: Meta<typeof LanguageToggle> = {
  title: "Components/LanguageToggle",
  component: LanguageToggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18nInstance}>
        <Story />
      </I18nextProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LanguageToggle>;

export const Default: Story = {};
