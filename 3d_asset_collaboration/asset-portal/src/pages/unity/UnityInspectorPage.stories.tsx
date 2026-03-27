import type { Meta, StoryObj } from "@storybook/react";
import UnityInspectorPage from "./UnityInspectorPage";
import { withProviders } from "../../../.storybook/decorators";

const meta: Meta<typeof UnityInspectorPage> = {
  title: "Pages/Unity/Inspector",
  component: UnityInspectorPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withProviders("/unity/inspector/1", "/unity/inspector/:id")],
};

export default meta;
type Story = StoryObj<typeof UnityInspectorPage>;

export const Default: Story = {};
