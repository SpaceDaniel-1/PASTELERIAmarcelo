import { createRoot } from 'react-dom/client';
import App from '@/App.jsx';
import { CarritoProvider } from '@/context/CarritoContext.jsx';

// Bootstrap (import via node_modules so Vite bundles it)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import '@/index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <CarritoProvider>
    <App />
  </CarritoProvider>
);
