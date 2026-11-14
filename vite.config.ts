import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['icon.svg', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png', 'pwa-maskable-512x512.png'],
        manifest: {
          id: '/',
          name: 'AXOLYT Organic Energy',
          short_name: 'AXOLYT',
          description: 'Nature. Energy. Elevated. Organic plant-powered energy drinks with live cold-chain order tracking.',
          theme_color: '#051109',
          background_color: '#051109',
          display: 'standalone',
          orientation: 'portrait-primary',
          start_url: '/',
          scope: '/',
          categories: ['shopping', 'food', 'health'],
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          globIgnores: ['**/reports/**', 'download.html', 'report.html', '**/*.zip', '**/*.pdf'],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
      {
        name: 'report-download-middleware',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url || '';
            if (url.startsWith('/download/pdf') || (url.includes('AXOLYT_ORGANIC_ENERGY_Project_Report.pdf') && url.includes('download=1'))) {
              const filePath = path.resolve(__dirname, 'public/reports/AXOLYT_ORGANIC_ENERGY_Project_Report.pdf');
              if (fs.existsSync(filePath)) {
                const stat = fs.statSync(filePath);
                res.writeHead(200, {
                  'Content-Type': 'application/pdf',
                  'Content-Disposition': 'attachment; filename="AXOLYT_ORGANIC_ENERGY_Project_Report.pdf"',
                  'Content-Length': stat.size,
                  'Access-Control-Allow-Origin': '*',
                });
                fs.createReadStream(filePath).pipe(res);
                return;
              }
            }
            if (url.startsWith('/download/docx') || (url.includes('AXOLYT_ORGANIC_ENERGY_Project_Report.docx') && url.includes('download=1'))) {
              const filePath = path.resolve(__dirname, 'public/reports/AXOLYT_ORGANIC_ENERGY_Project_Report.docx');
              if (fs.existsSync(filePath)) {
                const stat = fs.statSync(filePath);
                res.writeHead(200, {
                  'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  'Content-Disposition': 'attachment; filename="AXOLYT_ORGANIC_ENERGY_Project_Report.docx"',
                  'Content-Length': stat.size,
                  'Access-Control-Allow-Origin': '*',
                });
                fs.createReadStream(filePath).pipe(res);
                return;
              }
            }
            if (url.startsWith('/download/app') || url.startsWith('/download/zip') || url.includes('AXOLYT_Source_Code.zip') || url.includes('AXOLYT_ORGANIC_ENERGY_App.zip')) {
              const filePath = path.resolve(__dirname, 'public/AXOLYT_Source_Code.zip');
              if (fs.existsSync(filePath)) {
                const stat = fs.statSync(filePath);
                res.writeHead(200, {
                  'Content-Type': 'application/zip',
                  'Content-Disposition': 'attachment; filename="AXOLYT_ORGANIC_ENERGY_Complete_App.zip"',
                  'Content-Length': stat.size,
                  'Access-Control-Allow-Origin': '*',
                });
                fs.createReadStream(filePath).pipe(res);
                return;
              }
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
