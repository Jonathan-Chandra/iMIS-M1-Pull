/**
 * @file vite-build-cloud-extension.ts
 * Custom Vite plugin that prepares the build output for deployment as an iMIS iPart.
 *
 * iMIS iParts are uploaded as a `.zip` archive and served from a path like:
 * `~/iPartSource/<projectName>.zip/<asset>`. This plugin handles both steps:
 * 1. **Path rewriting** — rewrites all `src="/"` and `href="/"` asset references
 *    in the built `index.html` to use the iMIS zip-relative path prefix.
 * 2. **Zipping** — after the bundle is written to `dist/`, packages the entire
 *    `dist/` directory into a `<projectName>.zip` file inside `dist/`.
 *
 * The plugin is only active during non-development builds (see `vite.config.ts`).
 */
import type { Plugin } from 'vite';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import archiver from 'archiver';

/**
 * Configuration options for the {@link cloudPathRewrite} plugin.
 *
 * @property projectName - The name of the iPart project, used as the zip filename
 *   and as the path prefix in rewritten asset URLs. Typically sourced from `package.json`.
 */
interface IMISPathOptions {
    projectName: string
}

/**
 * Creates and returns a Vite plugin that rewrites asset paths for iMIS cloud deployment
 * and packages the build output into a zip archive.
 *
 * This plugin runs only during builds (`apply: 'build'`) and is enforced `'post'` so
 * it processes the final HTML after all other transforms have completed.
 *
 * @param projectName - The iPart project name used for the zip filename and URL prefix.
 * @returns A Vite {@link Plugin} object with `transformIndexHtml` and `closeBundle` hooks.
 */
export function cloudPathRewrite({ projectName } : IMISPathOptions): Plugin {
    return {
    name: 'imis-path-rewrite',
    apply: 'build',
    enforce: 'post',

    /**
     * Rewrites all root-relative asset `src` and `href` attributes in `index.html`
     * to use the iMIS iPart zip path prefix (`~/iPartSource/<name>.zip`).
     *
     * For example: `src="/assets/index.js"` → `src="~/iPartSource/myipart.zip/assets/index.js"`
     */
    transformIndexHtml(html) {
      const prefix = `~/iPartSource/${projectName}.zip`;

      html = html.replace(
        /src="(\/[^"]+)"/g,
        `src="${prefix}$1"`
      );

      html = html.replace(
        /href="(\/[^"]+)"/g,
        `href="${prefix}$1"`
      );

      return html;
    },

    /**
     * After all bundle files have been written to `dist/`, packages the entire
     * `dist/` directory (excluding the zip itself) into `dist/<projectName>.zip`
     * using maximum compression (zlib level 9).
     *
     * The resulting zip is what gets uploaded to the iMIS `iPartSource` directory.
     */
    async closeBundle() {
      const outDir = resolve(process.cwd(), 'dist');
      const zipPath = resolve(outDir, `${projectName}.zip`);

      console.log(`\nZipping dist/ → ${projectName}.zip`);

      await new Promise<void>((resolve, reject) => {
        const output = createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
          console.log(`Created ${projectName}.zip (${archive.pointer()} bytes)`);
          resolve();
        });

        archive.on('error', reject);
        archive.pipe(output);

        // Add all files in dist/ except the zip itself
        archive.glob('**/*', {
          cwd: outDir,
          ignore: [`${projectName}.zip`],
        });

        archive.finalize();
      });
    },
  };
}