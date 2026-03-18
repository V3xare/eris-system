const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: { 
		main: "./source/main.tsx",
		index: "./source/index.ts",
	},
	//watch: true,
	//watchOptions: {
	//	aggregateTimeout: 50,
	//	poll: 50
	//},
	output: {
		path: path.join(__dirname, "./release/esm"),
		//publicPath: "/",
		filename: "[name].js"
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.([cm]?ts|tsx)$/,
				use: [ 
					{ 
						loader: 'ts-loader',
						options: {
							//transpileOnly: true
						}					
					}
				],
				exclude: /node_modules/,			
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader" ]
			},
			{
				test: /\.scss$/,
				use: [ "style-loader", "css-loader", "sass-loader" ]
			}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js', '.scss' ],
		alias: {
			"@assets": path.resolve( __dirname, "assets" ),
			"@styles": path.resolve( __dirname, "assets", "styles" ),
			"@core": path.resolve( __dirname, "source", "core" ),
			"@components": path.resolve( __dirname, "source", "components" ),
			"@examples": path.resolve( __dirname, "source", "examples" ),
			"@utility": path.resolve( __dirname, "source", "utility" ),
		}
	},
	devServer: {
		hot: false,
		liveReload: false,
		port: 8080,
		devMiddleware: {
			writeToDisk: true,
		},
		static: { 
			directory: path.resolve(__dirname, "") 
		},
		historyApiFallback: {
			index: 'index.html'
		}
	}
};