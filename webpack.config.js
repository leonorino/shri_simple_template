const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new StatoscopePlugin({
      saveStatsTo: 'stats.json',
      saveOnlyStats: false,
      open: false,
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    open: true,
  },
  devtool: process.env.NODE_ENV === 'production' ? 'cheap-source-map' : 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      { // JavaScript and JSX Babel loader
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
            plugins: ['lodash']
          }
        }
      },
      { // CSS loaders
        test: /\.css/,
        // exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader',]
      }
    ],
  },
  resolve: {
    fallback: { // Node polyfills for crypto and stream
      'crypto': require.resolve('crypto-browserify'),
      'stream': false,
      'buffer': require.resolve('buffer'),
    }
  },
  optimization: {
    minimize: true, 
    concatenateModules: true,
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      minChunks: 2,
      chunks: 'all',
      minSize: 0
    },
  }
};

module.exports = config;
