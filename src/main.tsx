import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/themes.css';
import { updateThemeFavicon } from './utils/favicon';
import { ThemeId } from './types';

// Pre-hydrate favicon from localStorage before initial paint
const savedTheme = (localStorage.getItem('gamedev_theme') as ThemeId) || 'arcade';
updateThemeFavicon(savedTheme);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
