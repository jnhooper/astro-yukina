/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro-integration-lottie/env" />

import type { AstroIntegration } from "@swup/astro";

declare global {
  interface Window {
    swup: AstroIntegration;
  }
}
