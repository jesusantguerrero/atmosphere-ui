const path = require('path');
module.exports = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "staticDirs": ['../public'],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/addon-mdx-gfm"],
  "framework": {
    name: "@storybook/vue3-vite",
    options: {}
  },
  "features": {
    "storyStoreV7": true
  },
  async viteFinal(config, {
    configType
  }) {
    // customize the Vite config here
    config.resolve.alias['/@/'] = path.resolve(__dirname, './src'), config.resolve.alias['~atoms'] = path.resolve(__dirname, '../src/components/atoms'), config.resolve.alias['~molecules'] = path.resolve(__dirname, '../src/components/molecules'), config.resolve.alias['~organisms'] = path.resolve(__dirname, '../src/components/organisms'), config.resolve.alias['~templates'] = path.resolve(__dirname, '../src/components/templates'); // return the customized config
    config.resolve.alias['~utils'] = path.resolve(__dirname, '../src/utils'); // return the customized config

    return config;
  },
  docs: {
    autodocs: true
  }
};