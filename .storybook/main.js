module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/preset-create-react-app'
  ],
  "webpackFinal": async (config, { configType }) => {
    config.devtool = 'source-map' // adding source map https://github.com/storybookjs/storybook/issues/9901
    return config;
  },  
}