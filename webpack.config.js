const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { NODE_ENV } = process.env;
const PREFIX = "/";

module.exports = {
  mode: "development",

  entry: {
    main: path.resolve(__dirname, "./src/index.ts"),
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: PREFIX,
    clean: true,
    environment: {
      arrowFunction: false,
    },
  },
  devtool: NODE_ENV === "production" ? "hidden-source-map" : "eval-source-map",
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(?:js|mjs|cjs|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(?:ico|gif|png|jpeg|jpg|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name]-[hash:5][ext]",
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "404.html",
    }),
  ],

  devServer: {
    client: {
      logging: "info",
    },
    compress: false,
    open: true,
    port: 9000,
    hot: true,
    historyApiFallback: true,
  },
};
