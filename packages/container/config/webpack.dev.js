const { merge } = require('webpack-merge');     // to merge webpack.common with webpack.dev
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",  // not require for HOST
      remotes: {
        // key used in imports: 'name_of_remote@uri_for_remoteEntry'
        // import .... from 'marketing/MarketingApp'
        marketing: "marketing@http://localhost:8082/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    })
  ],
};

module.exports = merge(commonConfig, devConfig)
// we set devConfig as a 2nd parameter to override(has priority) any similar config in commonConfig