var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

var plugins = [
    new CopyWebpackPlugin([
        {from: './index.html', to: './index.html'},
        {from: './home.html', to: './home.html'}
    ]),
    //第三方库自动注入
    new  webpack.ProvidePlugin({
        '_':'lodash',
        '$':'jquery',
        'React':'react',
        'ReactDOM':'react-dom'
    })
];
/*module.exports = function (webpackConfig) {
    webpackConfig.babel.plugins.push(['antd', {
        style: 'css', // if true, use less
    }]);

    // Fix ie8 compatibility
    webpackConfig.module.loaders.unshift({
        test: /\.jsx?$/,
        loader: 'es3ify-loader',
    });

    return webpackConfig;
};*/
module.exports = {
    entry: {
        mainPage: './mainPage.js',
        table: './table.js'
    },
    output: {
        path: './build/',
        filename: '[name].js'
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