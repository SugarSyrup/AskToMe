import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import { RecoilRoot } from 'recoil';

import "./styles/styles.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);