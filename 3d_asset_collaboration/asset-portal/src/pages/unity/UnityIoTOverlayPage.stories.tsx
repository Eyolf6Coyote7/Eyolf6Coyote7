import type { Meta, StoryObj } from "@storybook/react";
import UnityIoTOverlayPage from "./UnityIoTOverlayPage";
import { withProviders } from "../../stories/decorators";

const meta: Meta<typeof UnityIoTOverlayPage> = {
  title: "Pages/Unity/IoTOverlay",
  component: UnityIoTOverlayPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withProviders("/unity/iot")],
};

export default meta;
type Story = StoryObj<typeof UnityIoTOverlayPage>;

export const Default: Story = {};
