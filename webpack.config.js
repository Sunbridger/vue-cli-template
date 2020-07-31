const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const { VueLoaderPlugin } = require('vue-loader');

const resolve = dir => path.resolve(__dirname, dir);


module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: resolve('./dist')
    },
    resolve: {
        alias: {
            src: resolve('./src'),
            styles: resolve('./src/styles'),
            components: resolve('./src/components'),
            utils: resolve('./src/utils'),
            assets: resolve('./src/assets')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: resolve('./src'),
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                include: resolve('./src'),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            esModule: false
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};
