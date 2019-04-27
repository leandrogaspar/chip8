const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
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
            // Load a custom template (lodash by default)
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(),
    ],
    devtool: 'source-map'
};
