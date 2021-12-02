const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");

const domain = process.env.PRODUCTION_DOMAIN

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js", // this is done for caching issues
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        // key used in imports: 'name_of_remote@domain_for_remoteEntry.js'
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);