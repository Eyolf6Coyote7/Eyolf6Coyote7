import type { Meta, StoryObj } from "@storybook/react";
import MobileProfilePage from "./MobileProfilePage";
import { withProviders } from "../../stories/decorators";

const meta: Meta<typeof MobileProfilePage> = {
  title: "Pages/Mobile/Profile",
  component: MobileProfilePage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile1" },
  },
  decorators: [withProviders("/mobile/profile")],
};

export default meta;
type Story = StoryObj<typeof MobileProfilePage>;

export const Default: Story = {};
