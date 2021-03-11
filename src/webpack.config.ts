const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  context: process.env.REPO_DIR || process.cwd(),
  entry: "./lib/core.js",
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "fui.js",
    library: "FUI",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: fuiLoaderInclude,
        use: require("./fui-loader"),
      },
    ],
  },
  // plugins: [new BundleAnalyzerPlugin()],
  cache: false,
};

function fuiLoaderInclude(input) {
  const delayList = ["ConextualMenu", "Callout", "DetailsList"];
  const matchPattern = input.split(/[\\/]/).slice(-6).join("/");
  const matched = delayList.find(
    (name) =>
      matchPattern === `@fluentui/react/lib/components/${name}/${name}.js`
  );

  if (matched) {
    console.log(input);
  }

  return matched !== undefined;
}
