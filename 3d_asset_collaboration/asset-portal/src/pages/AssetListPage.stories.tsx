import type { Meta, StoryObj } from "@storybook/react";
import AssetListPage from "./AssetListPage";
import { withProviders } from "../stories/decorators";

const meta: Meta<typeof AssetListPage> = {
  title: "Pages/AssetListPage",
  component: AssetListPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withProviders("/assets")],
};

export default meta;
type Story = StoryObj<typeof AssetListPage>;

export const Default: Story = {};
