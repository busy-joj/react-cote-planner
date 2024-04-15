/// <reference types="vitest" />
import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import { visualizer } from "rollup-plugin-visualizer";

export default ({mode}:{mode:string})=>{
  return defineConfig ({
      plugins: [
        svgr({
          svgrOptions: {
            // svgr options
          },
        }),
        react(),
        mode === "analyze" ?
        visualizer({
          template: "treemap", // or sunburst, treemap, network
          open: true,
          gzipSize: true,
          brotliSize: true,
          filename: "analyze.html", // will be saved in project's root
        }) as PluginOption : [],
      ],
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
      },
      resolve: {
        alias: [
          { find:'@', replacement:path.resolve(__dirname, './src')},
          { find:"@components", replacement:path.resolve(__dirname, './src/components')}
        ]
      }
    },
  );

}