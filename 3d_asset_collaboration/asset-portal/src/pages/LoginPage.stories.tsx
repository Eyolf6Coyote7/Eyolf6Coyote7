import type { Meta, StoryObj } from "@storybook/react";
import LoginPage from "./LoginPage";
import { withProviders } from "../stories/decorators";

const meta: Meta<typeof LoginPage> = {
  title: "Pages/LoginPage",
  component: LoginPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withProviders("/login")],
};

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {};
