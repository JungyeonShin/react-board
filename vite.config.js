import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    
    return defineConfig({
        plugins: [react()],
        server: {
          proxy: {
            '/api': {
              target: env.VITE_BACKEND_URL,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ''),
              secure: false,
              ws: true,
            },
          },
          // port: 3000,
          historyApiFallback: true,
        }
    });
};

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8080',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//         secure: false,
//         ws: true,
//       },
//     },
//     port: 3000,
//     historyApiFallback: true,
//   }
// });
