import type { Meta, StoryObj } from "@storybook/react";
import AssetDetailPage from "./AssetDetailPage";
import { withProviders } from "../../.storybook/decorators";

const meta: Meta<typeof AssetDetailPage> = {
  title: "Pages/AssetDetailPage",
  component: AssetDetailPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withProviders("/assets/1", "/assets/:id")],
};

export default meta;
type Story = StoryObj<typeof AssetDetailPage>;

export const Default: Story = {};
