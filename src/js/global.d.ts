import type { __adobe_cep__, cep, cep_node } from "./lib/cep-types";

declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.svg";

declare global {
	interface Window {
		cep_node: cep_node;
		cep: cep;
		__adobe_cep__: __adobe_cep__;
	}
}
