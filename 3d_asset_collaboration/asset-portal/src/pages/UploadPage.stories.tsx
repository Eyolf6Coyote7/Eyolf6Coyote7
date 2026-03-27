import type { Meta, StoryObj } from "@storybook/react";
import UploadPage from "./UploadPage";
import { withProviders } from "../../.storybook/decorators";

const meta: Meta<typeof UploadPage> = {
  title: "Pages/UploadPage",
  component: UploadPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withProviders("/upload")],
};

export default meta;
type Story = StoryObj<typeof UploadPage>;

export const Default: Story = {};
