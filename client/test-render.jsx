import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import React from 'react';
import App from './src/App.jsx';

try {
  console.log(renderToString(<StaticRouter location='/app/builder/res123'><App /></StaticRouter>));
} catch (e) {
  console.error('CRASH:', e);
}
