import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.tsx';
import { Provider as ToastProvider } from '@radix-ui/react-toast'; // Rename the Toast Provider
import { Provider } from 'react-redux';
import { store } from './redux/store.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* Use ToastProvider directly */}
    <Provider store={store}>
      <ToastProvider>
        <RouterProvider router={routes} />
      </ToastProvider>
    </Provider>
  </React.StrictMode>
);
