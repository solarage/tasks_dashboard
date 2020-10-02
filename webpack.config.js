const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
require('dotenv').config();

const mode = process.env.NODE_ENV || 'development';
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const babelOptions = (preset) => {
  const options = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: ['@babel/plugin-proposal-class-properties']
  };

  if (preset)
    options.presets.push(preset);

  return options;
};

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }];

  if (isDev)
    loaders.push('eslint-loader')

  return loaders;
};

const getPlugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
      }]
    }),
    new MiniCSSExtractPlugin({
      filename: '[name].[hash].css'
    }),
    new OptimizeCSSAssetsWebpackPlugin(),
    new webpack.EnvironmentPlugin([
      'NODE_ENV', 'REACT_APP_PUBLIC_PATH', 'REACT_APP_BASE_URL'
    ])
  ];

  if (isProd) {
    base.push(new BundleAnalyzerPlugin());
  }

  return base;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode,
  entry: {
    main: ['@babel/polyfill', './index.tsx']
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PUBLIC_PATH
    : '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
    alias: {
      '@': path.resolve(__dirname, 'src'),

    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    port: 5200,
    hot: isDev,
    historyApiFallback: true
  },
  devtool: isDev ? 'source-map' : '',
  plugins: getPlugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(svg|png|jpg|gif)/,
        loader: 'file-loader',
        options: {
          name: 'assets/img/[name].[ext]',
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot)/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[ext]',
        }
      },
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: jsLoaders()
      },
      {
        test: /\.tsx?$/,
        exclude: /node-modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json'
          }
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node-modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react')
        }
      }
    ]
  }
};
