import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
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
