import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Todo-final/', // Asegúrate de que esto comience con una barra
});
