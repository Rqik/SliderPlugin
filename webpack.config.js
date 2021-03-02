const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const fs = require('fs');
const loader = require('sass-loader');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
};
const PAGES_DIR = `${PATHS.src}/.`;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith('.html'));

const plugins = () => {
  const base = [
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page}`,
        })
    ),

    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash:5]-bundle.css',
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery',
    }),
  ];

  if (isDev) {
    // only enable hot in development

    base.push(new webpack.HotModuleReplacementPlugin());
  }

  return base;
};

module.exports = {
  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index.ts',
  output: {
    filename: 'js/[name]-[contenthash:5]-bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // compress: true,
    port: 8008,
    hot: true,
  },
  plugins: plugins(),
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(s[ca]ss|css)$/,
        use: [
          isDev
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../',
                },
              },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name][contenthash].[ext]',
            outputPath: 'img/',
          },
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
        options: {
          name: '[name][contenthash].[ext]',
          outputPath: 'img/',
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name][contenthash:5].[ext]',
            outputPath: 'fonts/',
          },
        },
      },

      {
        test: /\.(js|jsx|tsx|ts)$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};
