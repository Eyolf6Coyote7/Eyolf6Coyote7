import type { Meta, StoryObj } from "@storybook/react";
import ThreeViewer from "./ThreeViewer";

const meta: Meta<typeof ThreeViewer> = {
  title: "Components/ThreeViewer",
  component: ThreeViewer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    // Disable chromatic snapshot — animated 3D canvas produces flaky diffs
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof ThreeViewer>;

export const Default: Story = {};

export const CustomSize: Story = {
  args: {
    style: { width: 600, height: 400 },
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <Story />
      </div>
    ),
  ],
};
