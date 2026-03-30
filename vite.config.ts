/**
 * @file vite.config.ts
 * Vite build and dev-server configuration for the iMIS iPart.
 *
 * Key behaviours:
 * - In all modes, the React plugin is enabled for JSX transform and Fast Refresh.
 * - In non-development modes (UAT, production), the {@link cloudPathRewrite} plugin
 *   is activated. This rewrites asset paths in `index.html` to point inside the
 *   iMIS `~/iPartSource/<name>.zip` archive and then zips the `dist/` output.
 * - In development mode, the Vite dev server proxies `/api` and `/token` requests
 *   to the iMIS instance specified by `VITE_BASE_URL`, bypassing CORS restrictions.
 */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { cloudPathRewrite } from './vite-build-cloud-extension';
import { name } from './package.json';

/**
 * Vite configuration factory. Receives the active `mode` (development, uat, production)
 * and returns the appropriate configuration object.
 *
 * @param mode - The Vite build mode, injected by the Vite CLI (`--mode` flag).
 * @returns The resolved Vite `UserConfig` for the given mode.
 */
export default defineConfig(({ mode }) => {
  /** All environment variables for the current mode, loaded from the corresponding `.env.*` file. */
  const env = loadEnv(mode, process.cwd(), '');

  /** True when running `npm run dev` or `npm run build:dev`; disables cloud path rewriting. */
  const isLocal = mode === 'development';

  return {
    plugins: [react(),
      // cloudPathRewrite is only applied for non-local (UAT / production) builds.
      !isLocal && cloudPathRewrite({ projectName: name }),
    ],
    server: {
      proxy: {
        // Proxy /api to the iMIS REST API base URL to avoid CORS in local dev.
        '/api': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
        // Proxy /token to the iMIS OAuth token endpoint (one level up from the base URL).
        '/token': {
          target: env.VITE_BASE_URL.replace('/token', ''),
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});