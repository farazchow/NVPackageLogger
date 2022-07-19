import path from "path";
import "dotenv/config";
import {
  Configuration as WebpackConfiguration,
  HotModuleReplacementPlugin,
  ProvidePlugin,
} from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

/* TODO: add comments explaining the configs -- why are all of these necessary?*/
const config: Configuration = {
  mode: "development",
  output: {
    publicPath: "/",
  },
  entry: path.join(__dirname, "client", "index.tsx"),
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        // exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            cacheCompression: false,
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
     
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: "file-loader",
      }
      
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/src/index.html",
    }),
    new HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    // Adds React as an external so we don't have to do import 'React'
    // every time; it tells webpack that React is a gloabl module
    new ProvidePlugin({ React: "react" }),
  ],
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "build"),
    historyApiFallback: true,
    port: process.env.WEBPORT,
    open: false,
    // hot: true, automatically applies
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
};

export default config;
