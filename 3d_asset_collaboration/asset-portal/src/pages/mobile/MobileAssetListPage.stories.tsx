import type { Meta, StoryObj } from "@storybook/react";
import MobileAssetListPage from "./MobileAssetListPage";
import { withProviders } from "../../stories/decorators";

const meta: Meta<typeof MobileAssetListPage> = {
  title: "Pages/Mobile/AssetList",
  component: MobileAssetListPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile1" },
  },
  decorators: [withProviders("/mobile/assets")],
};

export default meta;
type Story = StoryObj<typeof MobileAssetListPage>;

export const Default: Story = {};
