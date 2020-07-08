import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import RecoilLogger from 'recoil-logger'
import { RecoilRoot } from 'recoil'

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilLogger />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
