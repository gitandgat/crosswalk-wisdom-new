import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Scoped to /glute/app: this site serves several unrelated products from
    // one SPA shell, so both the manifest (start_url/scope) and the service
    // worker registration (injectRegister: false — registered manually inside
    // RequireAuth with an explicit scope) are confined to the Glute app.
    // Otherwise Chrome's install heuristics and offline caching would apply
    // sitewide, including to the blog and ImgHub.
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      // Plugin-level scope: this is what gets baked into the generated
      // virtual:pwa-register module's Workbox() call at build time — it is
      // NOT a runtime option of registerSW(), so it must be set here.
      scope: '/glute/app/',
      manifest: {
        id: '/glute/app',
        name: 'Glute Longevity',
        short_name: 'Glute Longevity',
        description: 'Your posture-corrective training program, progress photos, and movement assessments.',
        theme_color: '#00A699',
        background_color: '#0d0d1a',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/glute/app',
        scope: '/glute/app',
        icons: [
          { src: '/glute-icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/glute-icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/glute-icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Only precache/serve the Glute app shell offline — not the whole site.
        navigateFallback: '/glute/app',
        navigateFallbackAllowlist: [/^\/glute\/app/],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
