const { mergeWithRules } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = mergeWithRules({
	plugins: 'replace'
})(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		app: './src/app/index.ts'
	},
	devServer: {
		static: './dist',
		compress: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Development',
			template: 'src/app/index.html'
		})
	]
});
