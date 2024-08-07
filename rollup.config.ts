import stylexPlugin from "@stylexjs/rollup-plugin";

const config = {
	input: "./index.js",
	output: {
		file: "./dist/bundle.js",
		format: "es",
	},
	plugins: [
		stylexPlugin({
			fileName: "./dist/stylex.css",
			dev: false,
			classNamePrefix: "x",
			unstable_moduleResolution: {
				type: "commonJS",
				rootDir: __dirname,
			},
		}),
	],
};

export default config;
