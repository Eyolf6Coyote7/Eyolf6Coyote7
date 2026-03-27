import type { Meta, StoryObj } from "@storybook/react";
import MobileAssetDetailPage from "./MobileAssetDetailPage";
import { withProviders } from "../../../.storybook/decorators";

const meta: Meta<typeof MobileAssetDetailPage> = {
  title: "Pages/Mobile/AssetDetail",
  component: MobileAssetDetailPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile1" },
  },
  decorators: [withProviders("/mobile/assets/1", "/mobile/assets/:id")],
};

export default meta;
type Story = StoryObj<typeof MobileAssetDetailPage>;

export const Default: Story = {};
