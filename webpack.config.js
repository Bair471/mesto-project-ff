const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    open: true, host: 'localhost'
  },
  mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',

  plugins: [
  
    new MiniCssExtractPlugin(),

    new HtmlWebpackPlugin({template: 'index.html'}),
    
    new CopyPlugin({
      patterns: [
        { from: "public/images", to: "images" }
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/, 
        use: [MiniCssExtractPlugin.loader, "css-loader"], 
      },
      {
        test: /\.js$/, 
        loader: 'babel-loader',
      },
      { 
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',           
      },
    ]
  }
};