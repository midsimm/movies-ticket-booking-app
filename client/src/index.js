import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, App as AntdApp } from 'antd';
import "antd/dist/reset.css"; // Import Ant Design styles
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/store";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider>
      <AntdApp>
        <Provider store={store}>
          <App />
        </Provider>
      </AntdApp>
    </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
