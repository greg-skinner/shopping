import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default ({ mode }) => {
  const isDevelopment = mode === 'development';
  return defineConfig({
    base: '/shopping/',
    root: 'src',
    mode,
    plugins: [
      react({
        exclude: /test/,
        include: [/\*\*\/\*\.tsx?/, '**/*.scss'],
      }),
    ],
    build: {
      outDir: '../www',
      minify: !isDevelopment,
    },
    css: {
      modules: {
        localsConvention: 'dashesOnly',
      },
    },
    resolve: {
      alias: [
        {
          find: '@components',
          replacement: path.resolve(__dirname, 'src/components'),
        },
        {
          find: '@pages',
          replacement: path.resolve(__dirname, 'src/pages'),
        },
        {
          find: '@model',
          replacement: path.resolve(__dirname, 'src/model'),
        },
      ],
    },
    server: {
      port: 3099,
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..'],
      },
    },
    define: {
      APP_CONFIG: {},
    },
  });
};
