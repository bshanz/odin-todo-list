const path = require("path");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.js",
  watch: true,
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
