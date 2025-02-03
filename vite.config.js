import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // React plugin options
      include: "**/*.{jsx,tsx}",
      babel: {
        plugins: [
          "@emotion/babel-plugin"
        ],
        presets: [
          ["@babel/preset-react", { runtime: "automatic" }]
        ]
      }
    })
  ],
  root: '.',
  base: '/',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/nba': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react': path.resolve(__dirname, './node_modules/react')
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@emotion/react',
      '@emotion/styled',
      '@mui/material',
      '@mui/icons-material'
    ],
    exclude: ['@firebase/app', '@firebase/auth', '@firebase/firestore', '@firebase/storage']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          'mui': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
          'vendor': ['react', 'react-dom', 'react-router-dom']
        },
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: ({name}) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/images/[name].[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        }
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/]
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }
})
