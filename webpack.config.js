const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
let mode = 'development';

if (isProd) {
  mode = 'production';
}

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
};

const plugins = () => {
  const base = [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: `./demo/page/page.pug`,
      filename: `index.html`,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash:5]-bundle.css',
    }),

    new CopyPlugin({
      patterns: [
        {
          from: `${PATHS.src}/demo/assets/img`,
          to: `${PATHS.dist}/img`,
        },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ];
  if (isDev) {
    base.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery',
      }),
    );
  }

  return base;
};

const minimizer = () => {
  if (isProd) {
    return [new TerserPlugin(), new CssMinimizerPlugin()];
  }
  return [];
};

module.exports = {
  stats: {
    errorDetails: true,
    children: true,
  },

  context: PATHS.src,

  mode: mode,
  target: isDev ? 'web' : 'browserslist',
  entry: {
    index: {
      dependOn: 'slider',
      import: ['./demo/page/page.ts', './demo/page/page.scss'],
    },
    slider: ['./slider/slider.ts', './slider/styles/slider.scss'],
  },

  output: {
    filename: 'js/[name]-[contenthash:5]-bundle.js',
    path: PATHS.dist,
    publicPath: '',
  },

  optimization: {
    minimize: isProd,
    minimizer: minimizer(),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@assets': path.resolve(__dirname, 'src/demo/assets'),
      '@fonts': path.resolve(__dirname, 'src/demo/assets/fonts'),
      '@': path.resolve(__dirname, 'src'),
    },
  },

  devServer: {
    contentBase: PATHS.dist,
    port: 8008,
    hot: true,
  },

  plugins: plugins(),

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
        test: /\.(js|jsx|tsx|ts)$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true,
        },
      },
    ],
  },
};
