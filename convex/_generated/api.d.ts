/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as ResendOTP from "../ResendOTP.js";
import type * as adminWhitelist from "../adminWhitelist.js";
import type * as auth from "../auth.js";
import type * as catalogs from "../catalogs.js";
import type * as contactRequests from "../contactRequests.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as media from "../media.js";
import type * as projects from "../projects.js";
import type * as redirects from "../redirects.js";
import type * as seeders from "../seeders.js";
import type * as seoMeta from "../seoMeta.js";
import type * as settings from "../settings.js";
import type * as showrooms from "../showrooms.js";
import type * as sliderPairs from "../sliderPairs.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  ResendOTP: typeof ResendOTP;
  adminWhitelist: typeof adminWhitelist;
  auth: typeof auth;
  catalogs: typeof catalogs;
  contactRequests: typeof contactRequests;
  files: typeof files;
  http: typeof http;
  media: typeof media;
  projects: typeof projects;
  redirects: typeof redirects;
  seeders: typeof seeders;
  seoMeta: typeof seoMeta;
  settings: typeof settings;
  showrooms: typeof showrooms;
  sliderPairs: typeof sliderPairs;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
