/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

// web pack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkerPlugin = require('worker-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const favicons = require('./favicon.config');

var config = {
    entry: ['@babel/polyfill', `./src/index.tsx`],
    plugins: [
        new CleanWebpackPlugin(),
        new FaviconsWebpackPlugin({
            logo: './static/logo.svg',
            cache: true,
            outputPath: '/static/assets/icons',
            publicPath: '',
            prefix: 'static/assets/icons',
            inject: true,
            favicons,
        }),
        new WorkerPlugin(),
    ],
    module: {
        rules: [
            {
                // Загрузчик typescript
                test: /\.tsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                // Загрузчик typescript
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                // Загрузчик css
                test: /\.(css)$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                // Загрузчик картинок
                test: /\.(png|svg|jpg|jpeg|gif|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            outputPath: (_url, resourcePath, context) => {
                                const relativePath = path.relative(context, resourcePath);
                                return relativePath;
                            },
                        },
                    },
                ],
            },
            {
                // Загрузчик шрифтов
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,
                            outputPath: (_url, resourcePath, context) => {
                                const relativePath = path.relative(context, resourcePath);
                                return relativePath;
                            },
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'scripts/[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist/'),
        host: 'localhost',
        publicPath: '/',
        https: true,
        port: 3000,
        hot: true,
        historyApiFallback: {
            verbose: true,
            disableDotRule: true,
        },
    },
};

module.exports = (env, argv) => {
    let htmlBase = argv['html-base'];
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
        const port = process.argv.find((x) => x.startsWith('--port='))?.replace('--port=', '') ?? config.devServer.port;
        const host = process.argv.find((x) => x.startsWith('--host='))?.replace('--host=', '') ?? config.devServer.host;
        htmlBase = `https://${host}:${port}`;
    }
    config.plugins.push(
        new HtmlWebpackPlugin({
            template: 'static/index.html',
            base: htmlBase,
        }),
    );
    return config;
};
