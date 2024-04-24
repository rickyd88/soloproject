const path = require('path');

module.exports = {
    mode: 'production',
    entry: './frontend/pokedex.js', // Entry point of your application
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'bundle.js' // Output bundle file name
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Apply this rule to JavaScript files
                exclude: /node_modules/, // Don't apply this rule to files in node_modules
                use: {
                    loader: 'babel-loader', // Use Babel to transpile JavaScript files
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    }
};