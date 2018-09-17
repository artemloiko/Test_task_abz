const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: ["webpack/hot/dev-server", "./src/js/index.js", "./src/scss/index.scss"],
    signup: ["webpack/hot/dev-server", "./src/js/signup.index.js", "./src/scss/signup.index.scss"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, "src/js"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react"]
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "img/css-bg/[name].[ext]" }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};
