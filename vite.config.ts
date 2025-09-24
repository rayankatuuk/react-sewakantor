import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://sewakantor.raystack.io',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
