const { mergeWithRules } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merged = mergeWithRules({
	module: {
		rules: 'replace'
	}
})(common, {
	mode: 'production',
	entry: {
		YWMap: './src/YWMap.ts'
	},
	module: {
		rules: [
			{
				test: /\.(s?)css$/i,
				use: [
					{ loader: 'css-loader' },
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: false,
							postcssOptions: {
								plugins: [
									[
										'cssnano',
										{
											preset: [
												'default',
												{
													discardComments: {
														removeAll: true
													},
													normalizeWhitespace: true
												}
											]
										}
									],
									require('postcss-import'),
									require('autoprefixer')
								]
							}
						}
					}
				]
			},
			// all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
			{
				test: /\.([cm]?ts|tsx)$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							plugins: [
								[
									'template-html-minifier',
									{
										modules: {
											'lit-html': ['html'],
											lit: ['html', { name: 'css', encapsulation: 'style' }]
										},
										strictCSS: true,
										htmlMinifier: {
											collapseWhitespace: true,
											conservativeCollapse: true,
											removeComments: true,
											caseSensitive: true,
											minifyCSS: true
										}
									}
								]
							]
						}
					},
					{
						loader: 'ts-loader'
					}
				]
			}
		]
	}
});

module.exports = merged;
