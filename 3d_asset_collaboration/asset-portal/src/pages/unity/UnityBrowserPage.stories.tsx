import type { Meta, StoryObj } from "@storybook/react";
import UnityBrowserPage from "./UnityBrowserPage";
import { withProviders } from "../../../.storybook/decorators";

const meta: Meta<typeof UnityBrowserPage> = {
  title: "Pages/Unity/Browser",
  component: UnityBrowserPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withProviders("/unity/browser")],
};

export default meta;
type Story = StoryObj<typeof UnityBrowserPage>;

export const Default: Story = {};
