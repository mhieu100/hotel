import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import Root from './App.jsx';
import { store }  from './redux/store.js';
import enUS from 'antd/locale/en_US';

import { ConfigProvider } from 'antd';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={enUS}>
        <Root />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);