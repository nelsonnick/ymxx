var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');



var plugins = [
    // new CopyWebpackPlugin([
    //     {from: './index.html', to: './index.html'},
    //     {from: './home.html', to: './home.html'}
    // ]),
    //第三方库自动注入
    new  webpack.ProvidePlugin({
        '_':'lodash',
        '$':'jquery',
        'React':'react',
        'ReactDOM':'react-dom'
    }),
    new HtmlwebpackPlugin({
        title: 'Hello World app'
    })
];

module.exports = {
    entry: APP_PATH,
// {
//         mainPage: './mainPage.js',
//         table: './table.js'
//        
//     },
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
    },
    plugins: plugins,

    module: {
        loaders: [

            {test: /(\.js$|\.jsx$)/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            { test: /\.css$/, loader: "style!css" },
            {test: /\.less/,loader: 'style-loader!css-loader!less-loader'}
        ]
    }
};