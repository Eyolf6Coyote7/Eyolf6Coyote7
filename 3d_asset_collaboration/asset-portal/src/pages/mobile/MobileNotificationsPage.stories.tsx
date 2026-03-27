import type { Meta, StoryObj } from "@storybook/react";
import MobileNotificationsPage from "./MobileNotificationsPage";
import { withProviders } from "../../../.storybook/decorators";

const meta: Meta<typeof MobileNotificationsPage> = {
  title: "Pages/Mobile/Notifications",
  component: MobileNotificationsPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile1" },
  },
  decorators: [withProviders("/mobile/notifications")],
};

export default meta;
type Story = StoryObj<typeof MobileNotificationsPage>;

export const Default: Story = {};
