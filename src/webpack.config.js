const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

function getRootComponents(tmpDir) {
  const rootComponents = fs
    .readdirSync(path.join(tmpDir, "node_modules/@fluentui/react/lib"))
    .filter(
      (filename) =>
        filename[0].toUpperCase() === filename[0] && filename.endsWith(".js")
    )
    .map((filename) => filename.replace(/\.js?/, ""));
  const rootComponentsExposes = {};
  for (const component of rootComponents) {
    rootComponentsExposes[
      `./react/lib/${component}`
    ] = `@fluentui/react/lib/${component}`;
  }

  return rootComponentsExposes;
}

function getPackageExposes() {
  const packages = [
    "react-cards",
    "react-date-time",
    "react-hooks",
    "react-flex",
    "react-tabs",
    "react-slider",
    "react-button",
    "react-focus",
  ];

  return packages.reduce((agg, pkg) => {
    return { ...agg, [`./${pkg}`]: `@fluentui/${pkg}/lib/index` };
  }, {});
}

module.exports = {
  entry: {},
  output: {
    path: path.join(__dirname, "../dist"),
  },
  cache: false,
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: "fluentuiReactMeta",
      filename: "remoteEntry.js",
      exposes: {
        ...getRootComponents(process.env.TMP_DIR),
        "./react/lib/compat/Button": "@fluentui/react/lib/compat/Button",
        "./react": "@fluentui/react/lib/index",
        ...getPackageExposes(),
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
};
