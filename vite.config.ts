import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import path from "node:path";
import { cep, runAction } from "vite-cep-plugin";
import cepConfig from "./cep.config";
import { extendscriptConfig } from "./vite.es.config";

const extensions = [".js", ".ts", ".tsx"];

const devDist = "dist";
const cepDist = "cep";

const src = path.resolve(__dirname, "src");
const root = path.resolve(src, "js");
const outDir = path.resolve(__dirname, "dist", "cep");

const debugReact = process.env.DEBUG_REACT === "true";
const isProduction = process.env.NODE_ENV === "production";
const isMetaPackage = process.env.ZIP_PACKAGE === "true";
const isPackage = process.env.ZXP_PACKAGE === "true" || isMetaPackage;
const isServe = process.env.SERVE_PANEL === "true";
const action = process.env.ACTION;

const input = {};
cepConfig.panels.map((panel) => {
	input[panel.name] = path.resolve(root, panel.mainPath);
});

const config = {
	cepConfig,
	isProduction,
	isPackage,
	isMetaPackage,
	isServe,
	debugReact,
	dir: `${__dirname}/${devDist}`,
	cepDist: cepDist,
	zxpDir: `${__dirname}/${devDist}/zxp`,
	zipDir: `${__dirname}/${devDist}/zip`,
	packages: cepConfig.installModules || [],
};

if (action) {
	runAction(config, action);
	process.exit();
}

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		"process.env": {},
	},
	plugins: [react(), cep(config)],
	root,
	clearScreen: false,
	server: {
		port: cepConfig.port,
	},
	preview: {
		port: cepConfig.servePort,
	},

	build: {
		sourcemap: isPackage ? cepConfig.zxp.sourceMap : cepConfig.build?.sourceMap,
		watch: {
			include: "src/jsx/**",
		},
		rollupOptions: {
			input,
			output: {
				manualChunks: {},
				preserveModules: false,
				format: "cjs",
			},
		},
		target: "chrome74",
		outDir,
	},
});

// rollup es3 build
const outPathExtendscript = path.join("dist", "cep", "jsx", "index.js");
extendscriptConfig(
	"src/jsx/index.ts",
	outPathExtendscript,
	cepConfig,
	extensions,
	isProduction,
	isPackage,
);
