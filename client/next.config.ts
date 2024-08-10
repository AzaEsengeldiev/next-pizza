const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.plugins.push(
				new MiniCssExtractPlugin({
					filename: 'static/css/[name].[contenthash].css',
					chunkFilename: 'static/css/[name].[contenthash].css'
				})
			)
		}

		// Правило для обработки CSS файлов
		config.module.rules.push({
			test: /\.css$/,
			use: [MiniCssExtractPlugin.loader, 'css-loader']
		})

		return config
	}
}
