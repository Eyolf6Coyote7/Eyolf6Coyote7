import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: { name: "@storybook/react-vite", options: {} },
  viteFinal: (config) => {
    config.define = {
      ...config.define,
      "import.meta.env.VITE_MOCK": JSON.stringify("true"),
    };
    return config;
  },
};

export default config;
