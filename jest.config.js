import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export const testEnvironment = "node";
export const moduleNameMapper = {
	"^@/(.*)$": "<rootDir>/src/$1",
};
export const testPathIgnorePatterns = ["/node_modules/", "/.next/"];
export const transform = {
	...tsJestTransformCfg,
	"^.+\\.(ts|tsx)$": "ts-jest",
};
