import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'lib',
    lib: {
      entry: 'src/components/index.ts',
      formats: ['es'],
      fileName: 'vohaul',
      cssFileName: 'styles',
    },
    rolldownOptions: { external: ['react', 'react-dom', 'react/jsx-runtime'] },
  },
});
