const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

module.exports = {
  context: process.env.REPO_DIR || process.cwd(),
  entry: "./src/bundle.js",
  output: {
    path: "dist",
    filename: "fui.js",
    library: "FUI",
    libraryTarget: "umd",
  },
  cache: false,
};
