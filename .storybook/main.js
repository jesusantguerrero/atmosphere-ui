const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "core": {
    "builder": "storybook-builder-vite"
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    config.resolve.alias['/@/'] = path.resolve(__dirname, './src'),
    config.resolve.alias['/@atoms'] = path.resolve(__dirname, '../src/components/atoms'),
    config.resolve.alias['/@molecules'] = path.resolve(__dirname, '../src/components/molecules'),
    config.resolve.alias['/@organisms'] = path.resolve(__dirname, '../src/components/organisms'),
    config.resolve.alias['/@templates'] = path.resolve(__dirname, '../src/components/templates')

    // return the customized config
    return config;
},
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'vue-style-loader', 'css-loader', 'sass-loader',
        {
          loader: 'postcss-loader',
          options: {
            
            ident: 'postcss',
            plugins: [
              require('tailwindcss'),
              require('autoprefixer'),
            ],
          },
        },
      ],
      include: path.resolve(__dirname, '../src/'),
    })

    return config;
  },
}