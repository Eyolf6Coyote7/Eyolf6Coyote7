import type { Meta, StoryObj } from "@storybook/react";
import UnityLoginPage from "./UnityLoginPage";
import { withProviders } from "../../stories/decorators";

const meta: Meta<typeof UnityLoginPage> = {
  title: "Pages/Unity/Login",
  component: UnityLoginPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withProviders("/unity/login")],
};

export default meta;
type Story = StoryObj<typeof UnityLoginPage>;

export const Default: Story = {};
