import type { Meta, StoryObj } from "@storybook/react";
import { DemoTooltip } from "./DemoTooltip";

const meta: Meta<typeof DemoTooltip> = {
  title: "Components/DemoTooltip",
  component: DemoTooltip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ padding: 60 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DemoTooltip>;

export const Default: Story = {
  args: {
    children: <button>Hover me</button>,
  },
};

export const CustomMessage: Story = {
  args: {
    message: "Upgrade to unlock this feature",
    children: <button>Premium Feature</button>,
  },
};
