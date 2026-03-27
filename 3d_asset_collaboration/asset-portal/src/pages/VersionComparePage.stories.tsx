import type { Meta, StoryObj } from "@storybook/react";
import VersionComparePage from "./VersionComparePage";
import { withProviders } from "../stories/decorators";

const meta: Meta<typeof VersionComparePage> = {
  title: "Pages/VersionComparePage",
  component: VersionComparePage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withProviders("/compare")],
};

export default meta;
type Story = StoryObj<typeof VersionComparePage>;

export const Default: Story = {};
