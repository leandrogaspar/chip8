const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/view/index.js',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'CHIP-8',
            template: './src/view/index.html'
        }),
        new CleanWebpackPlugin(),
    ],
    devtool: 'source-map'
};
