import type { Meta, StoryObj } from "@storybook/react";
import UnityViewportPage from "./UnityViewportPage";
import { withProviders } from "../../stories/decorators";

const meta: Meta<typeof UnityViewportPage> = {
  title: "Pages/Unity/Viewport",
  component: UnityViewportPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withProviders("/unity/viewport")],
};

export default meta;
type Story = StoryObj<typeof UnityViewportPage>;

export const Default: Story = {};
