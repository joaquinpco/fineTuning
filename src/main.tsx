import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { env } from '@xenova/transformers';
env.allowRemoteModels = false;
env.allowLocalModels = true;
env.useFS = false;

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
