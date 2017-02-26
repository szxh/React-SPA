var webpack = require('webpack');
var path = require('path');

module.exports = {
    cache: true,

    debug: true,
    
    devtool: '#eval-source-map',
    
    entry: {
        'dll-user': ['./src/index.jsx']
    },

    output: {
        path: 'build',
        filename: '[name].bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: '/node_modules/'
            },
            {
                test: /\.less$/,
                exclude: 'src/styles',
                loaders: [
                    'style',
                    'css?importLoaders=1&modules&localIdentName=[name]__[local]-[hash:base64:5]',
                    'less?sourceMap=true',
                    'postcss'
                ]
            },
            {
                test: /.less$/,
                include: 'src/styles',
                loader: 'style!css!less?sourceMap=true'
            }
        ]
    },

    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,

            manifest: require('./build/vendor-manifest.json')
        }),

        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        inline: true,
        hot: true,
        contentBase: 'build',
        historyApiFallback: true
    },

    postcss: [
        require('autoprefixer')
    ]
};