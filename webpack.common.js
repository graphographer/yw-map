const path = require('path');

module.exports = {
	mode: 'production',
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: ['.ts', '.tsx', '.js', '.css'],
		// Add support for TypeScripts fully qualified ESM imports.
		extensionAlias: {
			'.js': ['.js', '.ts'],
			'.cjs': ['.cjs', '.cts'],
			'.mjs': ['.mjs', '.mts']
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [{ loader: 'css-loader' }]
			},
			// all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
			{ test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader' }
		]
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
};
