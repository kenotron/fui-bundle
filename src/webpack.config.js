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
      `./lib/${component}`
    ] = `@fluentui/react/lib/${component}`;
  }

  return rootComponentsExposes;
}

function getPackageExposes() {
  const packages = [
    "date-time-utilities",
    "font-icons-mdl2",
    "merge-styles",
    "scheme-utilities",
    "style-utilities",
    "theme",
    "utilities",
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
      name: "fluentuiReact",
      filename: "remoteEntry.js",
      exposes: {
        ...getRootComponents(process.env.TMP_DIR),
        "./lib/compat/Button": "@fluentui/react/lib/compat/Button",
        ".": "@fluentui/react/lib/index",
        "./tabs": "@fluentui/react-tabs",
        "./internal": "@fluentui/react-internal/lib/index",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
};
