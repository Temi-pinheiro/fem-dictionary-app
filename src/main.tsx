import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Main } from './layout';
import { WordPage } from './pages';
import ThemeProvider from './providers/ThemeProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [{ index: true, element: <WordPage /> }],
    errorElement: '',
  },
]);
export const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
