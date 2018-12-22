const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/EgressIntent.ts',
	output: {
		library: 'EgressIntent',
		libraryTarget: 'umd',
		filename: 'EgressIntent.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{ test: /\.tsx?$/, use: ['ts-loader']}]
	},
	resolve: {
		extensions: ['.ts', '.js']
	}
};
