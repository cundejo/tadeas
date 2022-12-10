import * as versionFile from './version.json';

export const NEXT_PUBLIC_FIREBASE_CONFIG = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG ?? '{}');
export const NEXT_PUBLIC_FIREBASE_FUNCTIONS_BASE_PATH = process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_BASE_PATH;

// @ts-ignore
export const APP_VERSION = versionFile.default.version;
