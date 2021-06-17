const webpack = require("webpack");
const path = require("path");
const altv = require('altv-webpack-plugin');
const obfuscator = require('webpack-obfuscator');
const WebpackMessages = require('webpack-messages');

const obfuscatorSettings = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    shuffleStringArray: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayEncoding: ['base64','rc4'],
    stringArrayIndexShift: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 4,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 1,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
};

module.exports = {
	mode: "production",
    entry: "./src/index.ts",
    performance: {
        hints: false,
    },
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts"]
	},
	output: {
		filename: "index.js",
        path: path.resolve(__dirname, "../../resources/gamemode/client/")
	},
    plugins: [
        new WebpackMessages({
            name: 'Client',
            logger: str => console.log(`>> ${str}`),
            
            onComplete: () => setTimeout(() => console.log(">> Build complected."), 500)
        }),
        new altv(),
        new obfuscator(obfuscatorSettings),
        new webpack.BannerPlugin({
            raw: true,
            banner: `/**
 * @license

 * OPEN SOURCE GANGWAR PROJECT 
 * (C) 2021 Nova
 * By downloading you agree that you never will sell this project/files.
 */
`
        })
    ]
};