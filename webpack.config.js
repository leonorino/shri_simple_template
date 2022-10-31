const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;

const config = {
    devServer: {
        hot: true,
        port: 9000
    },
    resolve: {
        fallback: {
            'stream': require.resolve('stream-browserify'),
            'crypto': require.resolve('crypto-browserify')
        }
    },
    entry: {
        main: {
            import: './src/index.js'
        }
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveOnlyStats: false,
            open: false,
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    module: {
        rules: [
            { // JavaScript rule
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            { // CSS rule
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    // TODO: optimizations
    // TODO: lodash treeshaking
    // TODO: chunk for lodash
    // TODO: chunk for runtime
    // TODO: fallback for crypto
};

module.exports = config;
