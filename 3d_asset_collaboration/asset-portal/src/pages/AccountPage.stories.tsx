import type { Meta, StoryObj } from "@storybook/react";
import AccountPage from "./AccountPage";
import { withProviders } from "../../.storybook/decorators";

const meta: Meta<typeof AccountPage> = {
  title: "Pages/AccountPage",
  component: AccountPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withProviders("/account")],
};

export default meta;
type Story = StoryObj<typeof AccountPage>;

export const Default: Story = {};
