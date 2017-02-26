var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['react', 
                'react-dom',
                'react-redux',
                'redux',
                'react-router',
                'react-transform-hmr',
                'classnames',
                'babel-plugin-react-transform',
                'echarts'
        ]
    },

    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'build', '[name]-manifest.json'),
            name: '[name]_library'
        })
    ]
};