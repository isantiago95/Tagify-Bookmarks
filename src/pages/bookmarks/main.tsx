import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../assets/styles.css';
import BookmarksPage from './BookmarksPage';
import { AppProvider } from '../../context/AppContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <BookmarksPage />
    </AppProvider>
  </React.StrictMode>
);
