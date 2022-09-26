const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
	configureWebpack: {
		watch: true,
	},
	devServer: {
		port: 8080
	},
});
