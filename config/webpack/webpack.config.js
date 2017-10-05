'use strict';

const { resolve } = require('path');
const { existsSync } = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const AutodllWebpackPlugin = require('autodll-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

const { resolveAppPath, projectDirectory } = require('../paths');
const babelConfig = require('../babel/babel.config');
const eslintConfig = require('../eslint/eslint.config');
const { browsersList } = require('../globals');
const polyfills = require('../polyfills');
const pkgJson = require(resolveAppPath('package.json'));

const appPath = resolveAppPath('app');
const buildPath = resolveAppPath('dist');

module.exports = (env = { dev: true }) => {
  const { ifProd, ifDev, ifAnalyze } = getIfUtils(env, ['prod', 'dev', 'analyze']);

  const CSSLoaders = (nbLoaders = 1) => [
    {
      loader: require.resolve('css-loader'),
      options: { sourceMap: true, importLoaders: nbLoaders },
    },
    require.resolve('resolve-url-loader'),
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [autoprefixer({ flexbox: 'no-2009', browsers: browsersList })],
        sourceMap: true,
      },
    },
  ];

  const SASSLoaders = [
    ...CSSLoaders(2),
    { loader: require.resolve('sass-loader'), options: { sourceMap: true } },
  ];

  return removeEmpty({
    cache: ifProd(),

    ////////////////////////////////////////////////
    //                  Entry points              //
    ////////////////////////////////////////////////
    entry: {
      app: [...polyfills, './app/app.js'],
    },
    //////////////////////////////////////////////////
    //                 Output                       //
    //////////////////////////////////////////////////
    output: {
      path: buildPath,
      filename: ifProd('[name].[chunkhash].js', '[name].js'),
    },
    ////////////////////////////////////////////////////
    //                 Devtool                        //
    ////////////////////////////////////////////////////
    devtool: ifProd('source-map', 'eval-source-map'),
    //////////////////////////////////////////////////////
    //                 Resolve                          //
    //////////////////////////////////////////////////////
    resolve: {
      modules: ['node_modules', resolveAppPath('node_modules'), appPath],
    },
    //////////////////////////////////////////////////////
    //                 Loaders                          //
    //////////////////////////////////////////////////////
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          include: [appPath],
          use: { loader: require.resolve('eslint-loader'), options: { baseConfig: eslintConfig } },
        },

        {
          /**
           * Only one loader below will be matched and if none are, it will use the last
           * one because it has no test property
           */
          oneOf: [
            { test: /\.html$/, include: [appPath], use: require.resolve('raw-loader') },

            {
              test: /\.(scss|sass)$/,
              include: [appPath],
              use: ifProd(
                ExtractTextPlugin.extract({
                  fallback: require.resolve('style-loader'),
                  use: SASSLoaders,
                }),
                [require.resolve('style-loader'), ...SASSLoaders]
              ),
            },

            {
              test: /\.css$/,
              use: ifProd(
                ExtractTextPlugin.extract({
                  fallback: require.resolve('style-loader'),
                  use: CSSLoaders(),
                }),
                [require.resolve('style-loader'), ...CSSLoaders()]
              ),
            },

            {
              test: /\.js$/,
              include: [appPath],
              use: [
                require.resolve('ng-annotate-loader'),
                { loader: require.resolve('babel-loader'), options: babelConfig },
              ],
            },

            {
              test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              use: require.resolve('file-loader'),
            },

            {
              test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              use: {
                loader: require.resolve('url-loader'),
                options: {
                  limit: 10000,
                  mimetype: 'application/font-woff',
                },
              },
            },

            /**
             * This loader acts as a fail through, if none of the aboves are matched
             * then this one will be used.
             */
            {
              exclude: [/\.js$/, /\.html$/, /\.json$/],
              loader: require.resolve('file-loader'),
              options: {
                name: 'media/[name].[hash:8].[ext]',
              },
            },
            /**
             * DON'T ADD LOADERS BELOW. ALWAYS PUT THEM BEFORE THE ONE ABOVE.
             */
          ],
        },
      ],
    },
    /////////////////////////////////////////////////////////////
    //                       Plugins                           //
    /////////////////////////////////////////////////////////////
    plugins: removeEmpty([
      ifProd(new CleanWebpackPlugin(['dist'], { root: projectDirectory, verbose: true })),

      /**
       * used to define global variable which are configured at compile time
       * @see: http://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env || 'dev'),
        },
      }),

      /**
       * if you want to use interpolation for htmlWebpackPlugin options
       * you have to use a template engine
       * @see: https://github.com/ampedandwired/html-webpack-plugin/blob/master/docs/template-option.md
       */
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'app/index.html',
        hash: true,
        inject: 'body',
      }),

      ifProd(new ExtractTextPlugin('style_[contenthash].css')),

      ifDev(new webpack.HotModuleReplacementPlugin()),

      ifDev(new webpack.NamedModulesPlugin()),

      //////////////////////////////////////////////////////////
      //                     DLL                              //
      //////////////////////////////////////////////////////////
      ifDev(
        new AutodllWebpackPlugin({
          inject: true,
          debug: true,
          filename: '[name]_[hash].js',
          path: './dll',
          entry: {
            vendorDll: Object.keys(pkgJson.dependencies).filter(
              dep => typeof pkgJson.dllIgnore === 'undefined' || !pkgJson.dllIgnore.includes(dep)
            ),
          },
        })
      ),

      //////////////////////////////////////////////////////////
      //                     Chunks                           //
      //////////////////////////////////////////////////////////
      ifProd(
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: module => module.resource && module.resource.indexOf(appPath) === -1,
        })
      ),

      ifProd(new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' })),

      ifProd(
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
        })
      ),

      ifProd(
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: true,
        })
      ),

      ifAnalyze(new BundleAnalyzerPlugin({ analyzerMode: 'static' })),
    ]),
  });
};
