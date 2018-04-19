const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: './src/egress-intent.ts',
	plugins: [ new CleanWebpackPlugin() ],
	output: {
		library: 'EgressIntent',
		libraryTarget: 'umd',
		filename: 'egress-intent.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{ test: /\.html$/, use: ['html-loader']},
			{ test: /\.tsx?$/, use: ['ts-loader']}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	}
};