import type { Meta, StoryObj } from "@storybook/react";
import BrandSettingsPage from "./BrandSettingsPage";
import { withProviders } from "../../.storybook/decorators";

const meta: Meta<typeof BrandSettingsPage> = {
  title: "Pages/BrandSettingsPage",
  component: BrandSettingsPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withProviders("/settings")],
};

export default meta;
type Story = StoryObj<typeof BrandSettingsPage>;

export const Default: Story = {};
