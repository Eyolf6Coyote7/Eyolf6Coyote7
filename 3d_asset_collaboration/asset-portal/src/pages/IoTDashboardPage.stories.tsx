import type { Meta, StoryObj } from "@storybook/react";
import IoTDashboardPage from "./IoTDashboardPage";
import { withProviders } from "../../.storybook/decorators";

const meta: Meta<typeof IoTDashboardPage> = {
  title: "Pages/IoTDashboardPage",
  component: IoTDashboardPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withProviders("/iot-dashboard")],
};

export default meta;
type Story = StoryObj<typeof IoTDashboardPage>;

export const Default: Story = {};
